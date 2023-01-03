// @ts-ignore
import * as THREE from "three";
import * as dat from "lil-gui";

import { Figure } from "./Figure";

import { gsap } from "gsap";

import fragmentShader from "~/shaders/ThreeShaders/snap/fragment.glsl";
import vertexShader from "~/shaders/ThreeShaders/snap/vertex.glsl";

export class SnapFigure extends Figure {
  uniforms?: {
    uTime: { value: number };
    uImage: { value: THREE.Texture };
    uHoverProgress: { value: number };
    uResolution: { value: THREE.Vector2 };
    uRatio: { value: number };
  };

  constructor(scene: THREE.Scene, image: HTMLImageElement, gui: dat.GUI) {
    super(scene, image, vertexShader, fragmentShader, gui);

    if (!this.scene || !this.imageEl) return;

    this.setUniforms();

    this.initFigure(this.uniforms);

    this.imageEl.addEventListener("mouseenter", this.onMouseEnter.bind(this));
    this.imageEl.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }

  setUniforms() {
    this.uniforms = {
      uImage: { value: null },
      uTime: { value: 0 },
      uHoverProgress: { value: -0.1 },
      uRatio: { value: this.imageEl.offsetWidth / this.imageEl.offsetHeight },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };
  }

  onMouseEnter() {
    if (!this.uniforms) return;

    gsap.to(this.uniforms?.uHoverProgress, {
      value: 1.0,
      duration: 2.0,
      ease: "power2.inOut",
    });
  }

  onMouseLeave() {
    if (!this.uniforms) return;

    gsap.to(this.uniforms?.uHoverProgress, {
      value: 0.0,
      duration: 2.0,
      ease: "power2.inOut",
    });
  }

  update() {}
}
