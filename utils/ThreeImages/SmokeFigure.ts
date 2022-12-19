// @ts-ignore
import * as THREE from "three";
import * as dat from "lil-gui";
import { gsap } from "gsap";

import { Figure } from "./Figure";

import fragmentShader from "~/shaders/ThreeImage/smoke/fragment.glsl";
import vertexShader from "~/shaders/ThreeImage/smoke/vertex.glsl";

export class SmokeFigure extends Figure {
  uniforms?: {
    uTime: { value: number };
    uImage: { value: THREE.Texture };
    uImageHover: { value: THREE.Texture };
    uMouse: { value: THREE.Vector2 };
    uResolution: { value: THREE.Vector2 };
    uSize: { value: number };
    uNoise: { value: number };
    uNoiseSpeed: { value: number };
    uBlur: { value: number };
    uOctaves: { value: number };
    uSmokiness: { value: number };
    uRatio: { value: number };
  };

  mouse: THREE.Vector2 = new THREE.Vector2(0, 0);
  cursorSize: number = 0.05;

  constructor(scene: THREE.Scene, image: HTMLImageElement, gui: dat.GUI) {
    super(scene, image, vertexShader, fragmentShader, gui);

    if (!this.scene || !this.imageEl) return;

    this.setUniforms();

    this.initFigure(this.uniforms);

    this.imageEl.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.imageEl.addEventListener("mouseenter", this.onMouseEnter.bind(this));
    this.imageEl.addEventListener("mouseleave", this.onMouseLeave.bind(this));

    this.addToGui();
  }

  setUniforms() {
    this.uniforms = {
      uImage: { value: null },
      uImageHover: { value: null },
      uMouse: { value: this.mouse },
      uTime: { value: 0 },
      uSize: { value: 0 },
      uNoise: { value: 35.0 },
      uNoiseSpeed: { value: 0.1 },
      uBlur: { value: 0.0 },
      uRatio: { value: this.imageEl.offsetWidth / this.imageEl.offsetHeight },
      uOctaves: { value: 5 },
      uSmokiness: { value: 0.45 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };
  }

  addToGui() {
    if (!this.gui || !this.uniforms) return;

    const folder = this.gui.addFolder("smoke");

    folder.add(this, "cursorSize", 0, 0.1, 0.001).name("Cursor Size");

    folder
      .add(this.uniforms.uNoise, "value", 0, 300, 0.1)
      .name("Noise Strength");

    folder
      .add(this.uniforms.uNoiseSpeed, "value", 0, 1, 0.001)
      .name("Noise Speed");

    folder.add(this.uniforms.uBlur, "value", 0, 0.5, 0.001).name("Blur");
    folder.add(this.uniforms.uOctaves, "value", 1, 10, 1).name("Octaves");
    folder
      .add(this.uniforms.uSmokiness, "value", 0.25, 1, 0.001)
      .name("Smokiness");
  }

  onMouseMove(e: MouseEvent) {
    gsap.to(this.mouse, {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  }

  onMouseEnter() {
    if (!this.uniforms) return;

    gsap.to(this.uniforms?.uSize, {
      value: this.cursorSize,
      duration: 0.3,
    });
  }

  onMouseLeave() {
    if (!this.uniforms) return;

    gsap.to(this.uniforms?.uSize, {
      value: 0,
      duration: 0.3,
    });
  }

  update() {
    if (!this.uniforms) return;

    this.uniforms.uTime.value += 0.01;
  }
}
