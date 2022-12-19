// @ts-ignore
import * as THREE from "three";
import * as dat from "lil-gui";
import { gsap } from "gsap";

import { Figure } from "./Figure";

import fragmentShader from "~/shaders/ThreeImage/shape/fragment.glsl";
import vertexShader from "~/shaders/ThreeImage/shape/vertex.glsl";

export class ShapeFigure extends Figure {
  uniforms?: {
    uTime: { value: number };
    uImage: { value: THREE.Texture };
    uImageHover: { value: THREE.Texture };
    uImageShape: { value: THREE.Texture };
    uMouse: { value: THREE.Vector2 };
    uSize: { value: number };
    uResolution: { value: THREE.Vector2 };
    uRatio: { value: number };
  };

  mouse: THREE.Vector2 = new THREE.Vector2(0, 0);
  cursorSize: number = 1.0;

  constructor(scene: THREE.Scene, image: HTMLImageElement, gui: dat.GUI) {
    super(scene, image, vertexShader, fragmentShader, gui);

    if (!this.scene || !this.imageEl) return;

    this.setUniforms();

    this.initFigure(this.uniforms);

    this.imageEl.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.imageEl.addEventListener("mouseenter", this.onMouseEnter.bind(this));
    this.imageEl.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }

  setUniforms() {
    this.uniforms = {
      uImage: { value: null },
      uImageHover: { value: null },
      uImageShape: { value: null },
      uMouse: { value: this.mouse },
      uSize: { value: 0.01 },
      uTime: { value: 0 },
      uRatio: { value: this.imageEl.offsetWidth / this.imageEl.offsetHeight },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };
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
      duration: 0.5,
    });
  }

  onMouseLeave() {
    if (!this.uniforms) return;

    gsap.to(this.uniforms?.uSize, {
      value: 0.01,
      duration: 0.5,
    });
  }

  update() {
    if (!this.uniforms) return;

    this.uniforms.uTime.value += 0.01;
  }
}
