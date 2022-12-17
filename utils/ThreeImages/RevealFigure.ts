// @ts-ignore
import * as THREE from "three";
import * as dat from "lil-gui";
import { gsap } from "gsap";

import { Figure } from "./Figure";

export class RevealFigure extends Figure {
  uniforms?: {
    uImage: { value: THREE.Texture };
    uImageHover: { value: THREE.Texture };
    uResolution: { value: THREE.Vector2 };
    uBlur: { value: number };
    uTime: { value: number };
    uHoverProgress: { value: number };
    uRatio: { value: number };
  };

  constructor(
    scene: THREE.Scene,
    image: HTMLImageElement,
    vertexShader: string,
    fragmentShader: string,
    gui: dat.GUI
  ) {
    super(scene, image, vertexShader, fragmentShader, gui);

    if (!this.scene || !this.imageEl) return;

    this.setUniforms();

    this.initFigure(this.uniforms);

    this.imageEl.addEventListener("mouseenter", this.onMouseEnter.bind(this));
    this.imageEl.addEventListener("mouseleave", this.onMouseLeave.bind(this));

    this.addToGui();
  }

  setUniforms() {
    this.uniforms = {
      uImage: { value: null },
      uImageHover: { value: null },
      uBlur: { value: 0.1 },
      uTime: { value: 0 },
      uHoverProgress: { value: -0.1 },
      uRatio: { value: this.imageEl.offsetWidth / this.imageEl.offsetHeight },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };
  }

  addToGui() {
    if (!this.gui || !this.uniforms) return;

    const folder = this.gui.addFolder("Reveal");

    folder.add(this.uniforms.uBlur, "value", 0, 0.5, 0.001).name("Blur");
  }

  onMouseEnter() {
    if (!this.uniforms) return;

    gsap.to(this.uniforms?.uHoverProgress, {
      value: 1.1,
      duration: 0.7,
      ease: "power1.inOut",
    });
  }

  onMouseLeave() {
    if (!this.uniforms) return;

    gsap.to(this.uniforms?.uHoverProgress, {
      value: -0.1,
      duration: 0.7,
      ease: "power1.inOut",
    });
  }

  update() {
    if (!this.uniforms) return;
    this.uniforms.uTime.value += 0.01;
  }
}
