import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function SceneCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.6, 8.6);

    const clock = new THREE.Clock();
    const mixers = [];
    const pointer = new THREE.Vector2(0, 0);
    let pulse = 0;
    let zoomOffset = 0;
    let sectionOffset = 0;
    let scrollProgress = 0;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let userYaw = 0;
    let userPitch = 0;
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.88);
    scene.add(hemiLight);

    const keyLight = new THREE.SpotLight(0xffffff, 22, 44, Math.PI / 5.5, 0.38, 1.2);
    keyLight.position.set(-0.8, 5.4, 7.8);
    scene.add(keyLight);
    scene.add(keyLight.target);

    const rimLight = new THREE.PointLight(0xffffff, 7.5, 18, 2);
    rimLight.position.set(3.4, 1.5, 2.8);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffffff, 5.8, 16, 2);
    fillLight.position.set(-3.8, 0.9, 4.4);
    scene.add(fillLight);

    const frontLight = new THREE.PointLight(0xffffff, 4.2, 14, 2);
    frontLight.position.set(0.8, 0.2, 6.6);
    scene.add(frontLight);

    const group = new THREE.Group();
    scene.add(group);
    const modelState = {
      activeSection: "top",
    };

    const manager = new THREE.LoadingManager();
    manager.onProgress = () => {};
    manager.onLoad = () => {};
    manager.onError = () => {};

    const loader = new GLTFLoader(manager);

    const setModelMaterial = (root, emissiveColor) => {
      root.traverse((child) => {
        if (!child.isMesh) {
          return;
        }

        child.castShadow = false;
        child.receiveShadow = true;

        if (child.material && "emissive" in child.material) {
          child.material.emissive = new THREE.Color(emissiveColor);
          child.material.emissiveIntensity = 0.28;
          child.material.roughness = Math.max(0.2, child.material.roughness ?? 0.55);
          child.material.metalness = Math.min(0.35, child.material.metalness ?? 0.1);
        }
      });
    };

    const loadModel = async (path, onLoad) => {
      const gltf = await loader.loadAsync(path);
      onLoad(gltf.scene, gltf.animations);
    };

    Promise.all([
      loadModel("/assets/models/miles_from_spider-man_across_the_spider_verse.glb", (model, animations) => {
        model.scale.setScalar(4.2);
        model.position.set(4.25, -4.35, 2.3);
        model.rotation.y = -Math.PI * 2.48;
        setModelMaterial(model, 0x2b060c);
        group.add(model);

        if (animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          mixer.clipAction(animations[0]).play();
          mixers.push(mixer);
        }
      }),
    ]).catch((error) => {
      console.error(error);
    });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);

      if (!isDragging) {
        return;
      }

      const deltaX = event.clientX - lastPointerX;
      const deltaY = event.clientY - lastPointerY;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;

      userYaw += deltaX * 0.006;
      userPitch += deltaY * 0.0045;
      userPitch = THREE.MathUtils.clamp(userPitch, -1.15, 1.15);
    };

    const onPointerDown = (event) => {
      if (event.button !== 0) {
        return;
      }

      const target = event.target;
      if (target instanceof Element && target.closest("a, button, input, textarea, select")) {
        return;
      }

      isDragging = true;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onClick = () => {
      pulse = 1;
    };

    const onWheel = (event) => {
      zoomOffset += event.deltaY * 0.0025;
      zoomOffset = THREE.MathUtils.clamp(zoomOffset, -2.4, 3);
    };

    const onScroll = () => {
      sectionOffset = window.scrollY * 0.002;
      const maxScrollable = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      scrollProgress = THREE.MathUtils.clamp(window.scrollY / maxScrollable, 0, 1);
    };

    const sections = [
      "top",
      "about",
      "education",
      "experience",
      "projects",
      "extracurriculars",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          modelState.activeSection = visibleEntries[0].target.id;
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-10% 0px -20% 0px",
      },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener("resize", onResize);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("click", onClick);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const sectionTargets = {
        top: { x: 3.92, y: -2.22, z: 1.18, rotY: -7.72, rotX: 0.03, scale: 0.76 },
        about: { x: 3.74, y: -2.34, z: 1.08, rotY: -7.6, rotX: 0.02, scale: 0.8 },
        education: { x: 4.02, y: -2.24, z: 1.24, rotY: -7.8, rotX: 0.02, scale: 0.84 },
        experience: { x: 4.12, y: -2.12, z: 1.3, rotY: -7.94, rotX: 0.03, scale: 0.9 },
        projects: { x: 3.64, y: -2.28, z: 1.14, rotY: -7.54, rotX: 0.02, scale: 0.96 },
        extracurriculars: { x: 4.08, y: -2.18, z: 1.26, rotY: -7.88, rotX: 0.02, scale: 1.02 },
        contact: { x: 3.88, y: -2.32, z: 1.18, rotY: -7.74, rotX: 0.02, scale: 1.06 },
      };
      const activeTarget = sectionTargets[modelState.activeSection] ?? sectionTargets.top;

      mixers.forEach((mixer) => mixer.update(delta));

      pulse = THREE.MathUtils.lerp(pulse, 0, 0.04);

      keyLight.intensity = 19 + pulse * 3.5;
      keyLight.position.x = -0.2 + pointer.x * 1.2;
      keyLight.position.y = 5.4 + pointer.y * 1.1;
      keyLight.target.position.set(2.65 + pointer.x * 0.6, -2.2 + pointer.y * 0.35, 0.52);
      rimLight.intensity = 11 + pulse * 4;
      rimLight.position.x = 4.4 + pointer.x * 1.1;
      fillLight.position.y = 0.9 + pointer.y * 0.9;
      frontLight.position.x = 2 + pointer.x * 0.45;
      frontLight.position.y = 0.2 + pointer.y * 0.4;

      group.position.y = THREE.MathUtils.lerp(
        group.position.y,
        activeTarget.y + Math.sin(elapsed * 0.9) * 0.06 - sectionOffset * 0.08,
        0.08,
      );
      group.position.x = THREE.MathUtils.lerp(group.position.x, activeTarget.x + pointer.x * 0.36, 0.08);
      group.position.z = THREE.MathUtils.lerp(group.position.z, activeTarget.z, 0.08);
      group.rotation.y = THREE.MathUtils.lerp(
        group.rotation.y,
        activeTarget.rotY + userYaw + Math.sin(elapsed * 0.22) * 0.08 + pointer.x * 0.18,
        0.08,
      );
      group.rotation.x = THREE.MathUtils.lerp(
        group.rotation.x,
        activeTarget.rotX + userPitch + pointer.y * 0.05,
        0.08,
      );
      const scrollScaleBoost = THREE.MathUtils.lerp(0, 0.26, scrollProgress);
      const targetScale = activeTarget.scale + scrollScaleBoost + pulse * 0.03;
      group.scale.x = THREE.MathUtils.lerp(group.scale.x, targetScale, 0.08);
      group.scale.y = THREE.MathUtils.lerp(group.scale.y, targetScale, 0.08);
      group.scale.z = THREE.MathUtils.lerp(group.scale.z, targetScale, 0.08);

      camera.position.x = Math.sin(elapsed * 0.28) * 0.14 + pointer.x * 0.78;
      camera.position.y = 0.45 + Math.cos(elapsed * 0.24) * 0.08 + pointer.y * 0.34;
      camera.position.z = 8.6 + zoomOffset;
      camera.lookAt(2.72, -2.35, 0.5);

      const projected = new THREE.Vector3(2.72, -2.35, 0.5).project(camera);
      window.dispatchEvent(
        new CustomEvent("spot-layout", {
          detail: {
            x: (projected.x + 1) / 2,
            y: (1 - projected.y) / 2,
            section: modelState.activeSection,
          },
        }),
      );

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("click", onClick);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />
  );
}

export default SceneCanvas;
