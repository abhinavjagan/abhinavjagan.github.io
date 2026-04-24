import { useEffect, useRef } from "react";
import * as THREE from "three";
import PALETTE from "./palette";

const STORY_STEPS = [
  {
    text: "ALRIGHT",
    anchor: { x: -1.08, y: 1 },
    scale: 1.18,
    twist: -0.08,
  },
  {
    text: "ALRIGHT!",
    anchor: { x: 0, y: 0 },
    scale: 1.46,
    twist: 0,
  },
  {
    text: "ALRIGHT!!",
    anchor: { x: 1, y: -1 },
    scale: 1.86,
    twist: 0.08,
  },
  {
    text: "LETS DO THIS ONE MORE TIME!!!",
    anchor: { x: 0.12, y: 0 },
    scale: 2.02,
    twist: 0,
  },
];

const FONT_FAMILY = '"Bangers", sans-serif';
const FONT_LOAD = '400 72px "Bangers"';
const ILLUSTRATION_URL = "/assets/images/spiderpunk-black.jpeg";

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value) {
  const clamped = clamp01(value);
  return clamped * clamped * (3 - 2 * clamped);
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function createTextTexture(text) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const fontSize = text.length > 18 ? 110 : 160;
  const paddingX = 128;
  const paddingY = 96;
  const isFinalLine = text.startsWith("LETS DO THIS ONE MORE TIME");
  const fillColor = isFinalLine ? PALETTE.crimson : PALETTE.neonCyan;

  context.font = `400 ${fontSize}px ${FONT_FAMILY}`;
  const metrics = context.measureText(text);
  const width = Math.ceil(metrics.width + paddingX * 2);
  const height = Math.ceil(fontSize + paddingY * 2);

  canvas.width = width;
  canvas.height = height;

  const nextContext = canvas.getContext("2d");
  nextContext.clearRect(0, 0, width, height);
  nextContext.font = `400 ${fontSize}px ${FONT_FAMILY}`;
  nextContext.textBaseline = "middle";
  nextContext.textAlign = "center";
  nextContext.fillStyle = fillColor;
  nextContext.fillText(text, width / 2, height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return {
    texture,
    aspect: width / Math.max(height, 1),
  };
}

function buildAnchorPosition(anchor, viewportWidth, viewportHeight) {
  const maxTravelX = viewportWidth * 0.33;
  const maxTravelY = viewportHeight * 0.28;
  const x = anchor.x * maxTravelX;
  const y = anchor.y * maxTravelY;

  return { x, y };
}

function ScrollStoryScene() {
  const mountRef = useRef(null);
  const imageRef = useRef(null);
  const identityRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const image = imageRef.current;
    const identity = identityRef.current;
    if (!mount || !image || !identity) {
      return undefined;
    }

    let disposed = false;
    let animationFrame = 0;
    const textures = new Map();
    const state = {
      progress: 0,
      targetProgress: 0,
      viewportWidth: mount.clientWidth,
      viewportHeight: mount.clientHeight,
    };

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -state.viewportWidth / 2,
      state.viewportWidth / 2,
      state.viewportHeight / 2,
      -state.viewportHeight / 2,
      1,
      1000,
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(state.viewportWidth, state.viewportHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const spriteMaterial = new THREE.SpriteMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      color: new THREE.Color("#ffffff"),
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    group.add(sprite);

    const ensureTexture = (text) => {
      if (!textures.has(text)) {
        textures.set(text, createTextTexture(text));
      }
      return textures.get(text);
    };

    const applyText = (text, scaleMultiplier, maxWidthRatio = 0.86) => {
      const { texture, aspect } = ensureTexture(text);
      spriteMaterial.map = texture;
      spriteMaterial.needsUpdate = true;
      const baseHeight = state.viewportHeight * 0.12 * scaleMultiplier;
      const baseWidth = baseHeight * aspect;
      const maxWidth = state.viewportWidth * maxWidthRatio;
      const widthRatio = baseWidth > maxWidth ? maxWidth / baseWidth : 1;
      const fittedHeight = baseHeight * widthRatio;
      const fittedWidth = baseWidth * widthRatio;
      sprite.scale.set(fittedWidth, fittedHeight, 1);
    };

    const updateProgress = () => {
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      state.targetProgress = clamp01(window.scrollY / scrollRange);
    };

    const resize = () => {
      state.viewportWidth = mount.clientWidth;
      state.viewportHeight = mount.clientHeight;
      camera.left = -state.viewportWidth / 2;
      camera.right = state.viewportWidth / 2;
      camera.top = state.viewportHeight / 2;
      camera.bottom = -state.viewportHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(state.viewportWidth, state.viewportHeight);
    };

    const render = (time) => {
      if (disposed) {
        return;
      }

      state.progress = lerp(state.progress, state.targetProgress, 0.1);
      const stageSpan = 1 / (STORY_STEPS.length - 1);
      const stageIndex = Math.min(
        STORY_STEPS.length - 2,
        Math.floor(state.progress / Math.max(stageSpan, 0.0001)),
      );
      const localStart = stageIndex * stageSpan;
      const localProgress = smoothstep((state.progress - localStart) / Math.max(stageSpan, 0.0001));
      const current = STORY_STEPS[stageIndex];
      const next = STORY_STEPS[stageIndex + 1];

      const currentPos = buildAnchorPosition(current.anchor, state.viewportWidth, state.viewportHeight);
      const nextPos = buildAnchorPosition(next.anchor, state.viewportWidth, state.viewportHeight);
      const finalText = localProgress > 0.5 ? next.text : current.text;
      const scale = lerp(current.scale, next.scale, localProgress);
      const twist = lerp(current.twist, next.twist, localProgress);
      const float = Math.sin(time * 0.0012 + state.progress * Math.PI * 3) * 10;
      const finalReveal = smoothstep((state.progress - 0.62) / 0.14);
      const identityReveal = smoothstep((state.progress - 0.93) / 0.05);
      const storyFade = smoothstep((state.progress - 0.86) / 0.06);
      const storyOpacity = 1 - storyFade;

      applyText(finalText, scale, lerp(0.92, 0.56, finalReveal));

      group.position.x = lerp(currentPos.x, nextPos.x, localProgress);
      group.position.y = lerp(currentPos.y, nextPos.y, localProgress) + float;
      group.position.z = 0;
      group.rotation.z = twist;
      spriteMaterial.opacity = storyOpacity;
      image.style.opacity = `${finalReveal}`;
      image.style.transform = `translate3d(${lerp(-70, 0, finalReveal)}px, 0, 0) scale(${lerp(0.94, 1.02, finalReveal)})`;
      identity.style.opacity = `${identityReveal}`;
      identity.style.transform = `translate3d(${lerp(40, 0, identityReveal)}px, ${lerp(90, 0, identityReveal)}px, 0)`;

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    const setup = async () => {
      try {
        await document.fonts.load(FONT_LOAD);
        await document.fonts.load('400 48px "Jersey 10"');
        await document.fonts.load('400 72px "Nutty Noisses"');
      } catch {
        // Continue with fallback metrics if the custom font takes too long.
      }

      if (disposed) {
        return;
      }

      resize();
      updateProgress();
      animationFrame = window.requestAnimationFrame(render);
    };

    setup();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateProgress);
      window.cancelAnimationFrame(animationFrame);
      textures.forEach(({ texture }) => texture.dispose());
      spriteMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="scroll-scene-wrap" aria-hidden="true">
      <div ref={mountRef} className="scroll-scene" />
      <img
        ref={imageRef}
        className="scroll-scene-illustration"
        src={ILLUSTRATION_URL}
        alt=""
      />
      <div ref={identityRef} className="identity-lockup">
        <div className="identity-prefix">I AM</div>
        <div className="identity-name">
          <span>ABHINAV</span>
          <span>POLIMERA</span>
        </div>
      </div>
    </div>
  );
}

export default ScrollStoryScene;
