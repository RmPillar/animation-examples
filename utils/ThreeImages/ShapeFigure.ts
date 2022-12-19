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
    uResolution: { value: THREE.Vector2 };
    uRatio: { value: number };
  };

  mouse: THREE.Vector2 = new THREE.Vector2(0, 0);

  constructor(scene: THREE.Scene, image: HTMLImageElement, gui: dat.GUI) {
    super(scene, image, vertexShader, fragmentShader, gui);

    if (!this.scene || !this.imageEl) return;

    this.setUniforms();

    this.initFigure(this.uniforms);

    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  setUniforms() {
    this.uniforms = {
      uImage: { value: null },
      uImageHover: { value: null },
      uImageShape: { value: null },
      uMouse: { value: this.mouse },
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

  update() {}
}
