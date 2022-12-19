// @ts-ignore
import * as THREE from "three";
import * as dat from "lil-gui";
import { gsap } from "gsap";

import { Figure } from "./Figure";

import fragmentShader from "~/shaders/ThreeImage/gloop/fragment.glsl";
import vertexShader from "~/shaders/ThreeImage/gloop/vertex.glsl";

export class GloopFigure extends Figure {
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
    uRatio: { value: number };
  };

  mouse: THREE.Vector2 = new THREE.Vector2(0, 0);

  constructor(scene: THREE.Scene, image: HTMLImageElement, gui: dat.GUI) {
    super(scene, image, vertexShader, fragmentShader, gui);

    if (!this.scene || !this.imageEl) return;

    this.setUniforms();

    this.initFigure(this.uniforms);

    window.addEventListener("mousemove", this.onMouseMove.bind(this));

    this.addToGui();
  }

  setUniforms() {
    this.uniforms = {
      uImage: { value: null },
      uImageHover: { value: null },
      uMouse: { value: this.mouse },
      uTime: { value: 0 },
      uSize: { value: 0.04 },
      uNoise: { value: 10.0 },
      uNoiseSpeed: { value: 0.2 },
      uBlur: { value: 0.1 },
      uRatio: { value: this.imageEl.offsetWidth / this.imageEl.offsetHeight },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };
  }

  addToGui() {
    if (!this.gui || !this.uniforms) return;

    const folder = this.gui.addFolder("Gloop");

    folder.add(this.uniforms.uSize, "value", 0, 0.1, 0.001).name("Cursor Size");

    folder
      .add(this.uniforms.uNoise, "value", 0, 30, 0.1)
      .name("Noise Strength");

    folder
      .add(this.uniforms.uNoiseSpeed, "value", 0, 1, 0.001)
      .name("Noise Speed");

    folder.add(this.uniforms.uBlur, "value", 0, 0.5, 0.001).name("Blur");
  }

  onMouseMove(e: MouseEvent) {
    gsap.to(this.mouse, {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  }

  update() {
    if (!this.uniforms) return;

    this.uniforms.uTime.value += 0.01;
  }
}
