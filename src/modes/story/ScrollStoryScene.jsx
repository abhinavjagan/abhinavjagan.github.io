import { useEffect, useRef } from "react";
import * as THREE from "three";
import { publicUrl } from "../../lib/publicUrl.js";
import PALETTE from "../../shared/palette.js";

/** First portion of total scroll (0–1) mapped to the full story step arc — lower = snappier “ALRIGHT” beats. */
const STORY_STEPS_SCROLL_FRAC = 0.42;

const STORY_STEPS = [
  {
    text: "ALRIGHT",
    anchor: { x: -1.08, y: 1 },
    scale: 1.52,
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
    anchor: { x: 1.02, y: 0 },
    scale: 2.38,
    twist: 0,
  },
];

const FONT_FAMILY = '"Bangers", sans-serif';
const FONT_LOAD = '400 72px "Bangers"';
const ILLUSTRATION_URL = publicUrl("assets/media/spiderpunk-black.jpeg");

/** Bangs read as emphasis — coral accent on cyan/crimson. */
const EXCLAMATION_COLOR = "#FF7F50";

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

function createTextTexture(text, minViewportDim, pixelRatio) {
  const dpr = Math.min(Math.max(pixelRatio || 1, 1), 2);
  const compact = minViewportDim < 440;
  const isFinalLine = text.startsWith("LETS DO THIS ONE MORE TIME");
  let fontSize;
  if (isFinalLine) {
    const mult = compact ? 0.09 : 0.082;
    fontSize = Math.round(Math.min(Math.max(minViewportDim * mult, 56), 196));
  } else {
    const longLine = text.length > 18;
    const shortShout = text === "ALRIGHT";
    const longMult = longLine ? (compact ? 0.058 : 0.052) : compact ? 0.078 : 0.074;
    const minPx = longLine ? 40 : shortShout ? 62 : 52;
    fontSize = Math.round(
      Math.min(Math.max(minViewportDim * longMult, minPx), longLine ? 128 : 200),
    );
  }
  const paddingX = Math.round(56 + fontSize * 0.52);
  const paddingY = Math.round(40 + fontSize * 0.42);
  const fillColor = isFinalLine ? PALETTE.crimson : PALETTE.neonCyan;

  const canvas = document.createElement("canvas");
  const measureCtx = canvas.getContext("2d");
  measureCtx.font = `400 ${fontSize}px ${FONT_FAMILY}`;
  let totalW = 0;
  for (let i = 0; i < text.length; i += 1) {
    totalW += measureCtx.measureText(text[i]).width;
  }
  const logicalW = Math.ceil(totalW + paddingX * 2);
  const logicalH = Math.ceil(fontSize + paddingY * 2);

  canvas.width = Math.ceil(logicalW * dpr);
  canvas.height = Math.ceil(logicalH * dpr);

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, logicalW, logicalH);
  ctx.font = `400 ${fontSize}px ${FONT_FAMILY}`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  const cy = logicalH / 2;
  let x = logicalW / 2 - totalW / 2;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    ctx.fillStyle = ch === "!" ? EXCLAMATION_COLOR : fillColor;
    ctx.fillText(ch, x, cy);
    x += ctx.measureText(ch).width;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return {
    texture,
    aspect: logicalW / Math.max(logicalH, 1),
  };
}

function buildAnchorPosition(anchor, viewportWidth, viewportHeight) {
  const ar = viewportWidth / Math.max(viewportHeight, 1);
  const narrowPortrait = ar < 0.56;
  const portrait = ar < 0.72;
  const landscapeWide = ar > 1.55;
  const maxTravelX =
    viewportWidth * (narrowPortrait ? 0.34 : portrait ? 0.31 : landscapeWide ? 0.3 : 0.33);
  const maxTravelY =
    viewportHeight * (landscapeWide ? 0.22 : narrowPortrait ? 0.25 : 0.28);
  const x = anchor.x * maxTravelX;
  const y = anchor.y * maxTravelY;

  return { x, y };
}

/** World X for orthographic scene: horizontal center of the strip between the illustration and the mount's right edge. */
function gutterCenterWorldX(mountEl, imgEl, viewportWidth, viewportHeight) {
  const m = mountEl.getBoundingClientRect();
  const ir = imgEl.getBoundingClientRect();
  if (ir.width >= 2 && m.width >= 2) {
    const gutterMidViewport = (ir.right + m.right) / 2;
    const gutterMidLocal = gutterMidViewport - m.left;
    return gutterMidLocal - viewportWidth / 2;
  }
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const vmin = Math.min(viewportWidth, viewportHeight) / 100;
  const imgW = Math.min(viewportWidth * 0.48, 36 * rem, 92 * vmin);
  return imgW / 2 - viewportWidth / 2;
}

function ScrollStoryScene() {
  const mountRef = useRef(null);
  const imageRef = useRef(null);
  const identityMotionRef = useRef(null);
  const andIMotionRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const image = imageRef.current;
    const identityMotion = identityMotionRef.current;
    const andIMotion = andIMotionRef.current;
    if (!mount || !image || !identityMotion || !andIMotion) {
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

    const disposeAllTextures = () => {
      textures.forEach(({ texture }) => texture.dispose());
      textures.clear();
    };

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
        const minDim = Math.min(state.viewportWidth, state.viewportHeight);
        textures.set(text, createTextTexture(text, minDim, renderer.getPixelRatio()));
      }
      return textures.get(text);
    };

    const applyText = (text, scaleMultiplier, maxWidthRatio = 0.86, heightBoost = 1) => {
      const { texture, aspect } = ensureTexture(text);
      spriteMaterial.map = texture;
      spriteMaterial.needsUpdate = true;
      const minDim = Math.min(state.viewportWidth, state.viewportHeight);
      const baseHeight = minDim * 0.115 * heightBoost * scaleMultiplier;
      const baseWidth = baseHeight * aspect;
      const maxWidth = state.viewportWidth * maxWidthRatio;
      const widthRatio = baseWidth > maxWidth ? maxWidth / baseWidth : 1;
      const fittedHeight = baseHeight * widthRatio;
      const fittedWidth = baseWidth * widthRatio;
      sprite.scale.set(fittedWidth, fittedHeight, 1);
    };

    // Progress is measured against `.story-intro` (not the whole page), so adding
    // more scrollable content below (e.g. manifesto) does not stretch story timings.
    const introEl = mount.closest(".story-intro");
    const updateProgress = () => {
      if (introEl) {
        const rect = introEl.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        const scrollable = Math.max(1, introEl.offsetHeight - window.innerHeight);
        state.targetProgress = clamp01(scrolled / scrollable);
        return;
      }
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(state.viewportWidth, state.viewportHeight);
      disposeAllTextures();
    };

    const render = (time) => {
      if (disposed) {
        return;
      }

      state.progress = lerp(state.progress, state.targetProgress, 0.14);
      const storyP = clamp01(state.progress / Math.max(STORY_STEPS_SCROLL_FRAC, 0.0001));
      const stageSpan = 1 / (STORY_STEPS.length - 1);
      const stageIndex = Math.min(
        STORY_STEPS.length - 2,
        Math.floor(storyP / Math.max(stageSpan, 0.0001)),
      );
      const localStart = stageIndex * stageSpan;
      const localProgress = smoothstep((storyP - localStart) / Math.max(stageSpan, 0.0001));
      const current = STORY_STEPS[stageIndex];
      const next = STORY_STEPS[stageIndex + 1];

      const currentPos = buildAnchorPosition(current.anchor, state.viewportWidth, state.viewportHeight);
      const nextPos = buildAnchorPosition(next.anchor, state.viewportWidth, state.viewportHeight);
      const finalText = localProgress > 0.5 ? next.text : current.text;
      const scale = lerp(current.scale, next.scale, localProgress);
      const twist = lerp(current.twist, next.twist, localProgress);
      const minDim = Math.min(state.viewportWidth, state.viewportHeight);
      const aspect = state.viewportWidth / Math.max(state.viewportHeight, 1);
      const floatAmp = aspect < 0.72 ? minDim * 0.008 : minDim * 0.012;
      const float = Math.sin(time * 0.0012 + state.progress * Math.PI * 3) * floatAmp;
      // Spider image ramps in with “LETS DO THIS ONE MORE TIME” (late storyP), then stays through scroll dwell.
      const finalReveal = smoothstep((storyP - 0.72) / 0.13);
      const scrollP = state.progress;
      // Tight tail: fade WebGL story text, then name — spiderpunk img stays at full opacity once revealed.
      const storyFade = smoothstep((scrollP - 0.692) / 0.034);
      const identityReveal = smoothstep((scrollP - 0.724) / 0.036);
      // "AND I" appears under POLIMERA on further scroll.
      const andIReveal = smoothstep((scrollP - 0.84) / 0.06);
      // Whole intro layer (rain + spider + text) fades out at the very end so the
      // keywords section below can take over cleanly.
      const introExit = smoothstep((scrollP - 0.94) / 0.06);
      const introAlive = 1 - introExit;
      const storyOpacity = 1 - storyFade;

      const portrait = aspect < 0.82;
      const wideText = portrait
        ? Math.max(lerp(0.96, 0.64, finalReveal), 0.94)
        : lerp(0.92, 0.56, finalReveal);
      const isFinalStory = finalText.startsWith("LETS DO THIS ONE MORE TIME");
      const spriteHeightBoost = (portrait ? 1.12 : 1) * (isFinalStory ? 1.2 : 1);
      applyText(finalText, scale, wideText, spriteHeightBoost);

      const portraitYLift = portrait ? state.viewportHeight * 0.09 : 0;
      group.position.x = lerp(currentPos.x, nextPos.x, localProgress);
      group.position.y = lerp(currentPos.y, nextPos.y, localProgress) + float + portraitYLift;
      if (finalText.startsWith("LETS DO THIS ONE MORE TIME")) {
        group.position.x = gutterCenterWorldX(mount, image, state.viewportWidth, state.viewportHeight);
      }
      group.position.z = 0;
      group.rotation.z = twist;
      spriteMaterial.opacity = storyOpacity;
      const imgSlide = minDim * 0.055;
      const idSlideX = minDim * 0.05;
      const idSlideY = minDim * 0.012;
      // Fade the spider + identity lockup at the end of the intro,
      // but leave the binary rain alive so it scrolls off continuously
      // into the keywords section's rain layer below (no black gap).
      image.style.opacity = `${finalReveal * introAlive}`;
      image.style.transform = `translate3d(${lerp(-imgSlide, 0, finalReveal)}px, 0, 0) scale(${lerp(0.94, 1.02, finalReveal)})`;
      identityMotion.style.opacity = `${identityReveal * introAlive}`;
      identityMotion.style.transform = `translate3d(${lerp(idSlideX, 0, identityReveal)}px, ${lerp(idSlideY, 0, identityReveal)}px, 0)`;
      // andIMotion already cascades through identityMotion's opacity.
      andIMotion.style.opacity = `${andIReveal}`;
      andIMotion.style.transform = `translate3d(0, ${lerp(14, 0, andIReveal)}px, 0)`;

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

    const resizeObserver = new ResizeObserver(() => {
      resize();
      updateProgress();
    });
    resizeObserver.observe(mount);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateProgress, { passive: true });

    const vv = window.visualViewport;
    const onVisualViewportResize = () => {
      resize();
      updateProgress();
    };
    if (vv) {
      vv.addEventListener("resize", onVisualViewportResize);
      vv.addEventListener("scroll", onVisualViewportResize);
    }

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateProgress);
      if (vv) {
        vv.removeEventListener("resize", onVisualViewportResize);
        vv.removeEventListener("scroll", onVisualViewportResize);
      }
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
      <div className="identity-lockup">
        <div ref={identityMotionRef} className="identity-lockup-motion">
          <div className="identity-prefix">I AM</div>
          <div className="identity-name">
            <span>ABHINAV</span>
            <span>POLIMERA</span>
          </div>
          <div ref={andIMotionRef} className="identity-tail">AND I</div>
        </div>
      </div>
    </div>
  );
}

export default ScrollStoryScene;
