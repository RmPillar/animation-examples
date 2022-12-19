// @ts-ignore
import * as THREE from "three";
import * as dat from "lil-gui";
import { gsap } from "gsap";

import { Figure } from "./Figure";

import fragmentShader from "~/shaders/ThreeImage/glitch/fragment.glsl";
import vertexShader from "~/shaders/ThreeImage/glitch/vertex.glsl";

export class GlitchFigure extends Figure {
  uniforms?: {
    uTime: { value: number };
    uImage: { value: THREE.Texture };
    uImageHover: { value: THREE.Texture };
    uResolution: { value: THREE.Vector2 };
    uGlitchColorOffset: { value: number };
    uGlitchPower: { value: number };
    uGlitchBlockSize: { value: number };
    uGlitchXOffset: { value: number };
    uGlitchYOffset: { value: number };
    uEnableGlitch: { value: number };
    uRatio: { value: number };
  };

  glitchSpacing: number = 3000;
  glitchDuration: number = 1000;
  glitchSpacingMax: number = 2000;
  glitchDurationMax: number = 1000;
  glitchStartTime: number = Date.now();

  isIntersecting: boolean = false;

  constructor(scene: THREE.Scene, image: HTMLImageElement, gui: dat.GUI) {
    super(scene, image, vertexShader, fragmentShader, gui);

    if (!this.scene || !this.imageEl) return;

    this.setUniforms();

    this.initFigure(this.uniforms);

    this.setupObserver();

    this.addToGui();
  }

  setUniforms() {
    this.uniforms = {
      uImage: { value: null },
      uImageHover: { value: null },
      uTime: { value: 0 },
      uRatio: { value: this.imageEl.offsetWidth / this.imageEl.offsetHeight },
      uGlitchColorOffset: { value: 0.03 },
      uGlitchPower: { value: 0.03 },
      uGlitchBlockSize: { value: 30.5 },
      uGlitchXOffset: { value: 1.0 },
      uGlitchYOffset: { value: 1.0 },
      uEnableGlitch: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };
  }

  addToGui() {
    if (!this.gui || !this.uniforms) return;

    const folder = this.gui.addFolder("Glitch");

    folder
      .add(this.uniforms.uGlitchXOffset, "value", 0, 5, 0.01)
      .name("X Offset");
    folder
      .add(this.uniforms.uGlitchYOffset, "value", 0, 5, 0.01)
      .name("Y Offset");
    folder.add(this.uniforms.uGlitchPower, "value", 0, 1, 0.01).name("Power");
    folder
      .add(this.uniforms.uGlitchBlockSize, "value", 0, 50, 0.1)
      .name("Block Size");
    folder
      .add(this.uniforms.uGlitchColorOffset, "value", 0, 0.1, 0.01)
      .name("Color Offset");
    folder.add(this, "glitchDurationMax", 0, 10000, 100).name("Max Duration");
    folder.add(this, "glitchSpacingMax", 0, 10000, 100).name("Max Spacing");
  }

  setGlitch() {
    if (!this.uniforms) return;

    if (!this.isIntersecting) {
      this.uniforms.uEnableGlitch.value = 0.0;
      return;
    }

    const currentTime = Date.now();

    const deltaTime = currentTime - this.glitchStartTime;

    if (deltaTime > this.glitchSpacing) {
      // If less time than glitch duration has passed, set glitch filter properties
      if (deltaTime <= this.glitchSpacing + this.glitchDuration) {
        this.uniforms.uEnableGlitch.value = 1.0;
      }
      // If more time than glitch duration has passed, reset glitch filter properties
      if (deltaTime > this.glitchSpacing + this.glitchDuration) {
        this.uniforms.uEnableGlitch.value = 0.0;

        this.glitchSpacing = Math.random() * this.glitchSpacingMax + 1000; // Set glitch spacing to random time between 1 and glitchSpacingMax seconds
        this.glitchDuration = Math.random() * this.glitchDurationMax + 500; // Set glitch duration to random time between 0.5s and glitchDurationMax seconds
        this.glitchStartTime = Date.now(); // Reset glitch start time
      }
    }
  }

  setupObserver() {
    if (!this.scene || !this.imageEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isIntersecting = entry.isIntersecting;
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(this.imageEl);
  }

  update() {
    if (!this.uniforms) return;

    this.uniforms.uTime.value += 0.01;

    this.setGlitch();
  }
}
