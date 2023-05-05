// @ts-ignore
import * as THREE from "three";
import * as dat from "lil-gui";

import { Figure } from "./Figure";

import { gsap } from "gsap";

import imageFragmentShader from "~/shaders/ThreeShaders/snap/image/fragment.glsl";
import imageVertexShader from "~/shaders/ThreeShaders/snap/image/vertex.glsl";

import particlesFragmentShader from "~/shaders/ThreeShaders/snap/particles/fragment.glsl";
import particlesVertexShader from "~/shaders/ThreeShaders/snap/particles/vertex.glsl";

export class SnapFigure extends Figure {
  uniforms?: {
    uTime: { value: number };
    uImage: { value: THREE.Texture };
    uHoverProgress: { value: number };
    uResolution: { value: THREE.Vector2 };
    uRatio: { value: number };
  };

  numOfParticles: number = 0;

  constructor(scene: THREE.Scene, image: HTMLImageElement, gui: dat.GUI) {
    super(scene, image, imageVertexShader, imageFragmentShader, gui);

    if (!this.scene || !this.imageEl) return;

    this.setUniforms();

    this.initFigure(this.uniforms);

    this.initParticles();

    this.imageEl.addEventListener("mouseenter", this.onMouseEnter.bind(this));
    this.imageEl.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }

  setUniforms() {
    this.uniforms = {
      uImage: { value: null },
      uTime: { value: 0 },
      uHoverProgress: { value: 0.0 },
      uRatio: { value: this.imageEl.offsetWidth / this.imageEl.offsetHeight },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };
  }

  initParticles() {
    const geometry = new THREE.BufferGeometry();
    this.numOfParticles = Math.floor(
      this.imageEl.offsetWidth / 4 * this.imageEl.offsetHeight / 4
    );


    const positions = new Float32Array(this.numOfParticles * 4);

    const rowLength = this.imageEl.offsetHeight / 4;
    const colLength = this.imageEl.offsetWidth / 4;

    for (let colIndex = 0; colIndex < colLength; colIndex++) {
      for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
        const index = colIndex * rowLength + rowIndex;

        positions[index * 3] =
          this.offset.x - this.imageEl.offsetWidth / 2 + colIndex * 4;
        positions[index * 3 + 1] =
          this.offset.y - this.imageEl.offsetHeight / 2 + rowIndex * 4;
        positions[index * 3 + 2] = 0;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    /**
     * Material
     */
    const material = new THREE.ShaderMaterial({
      vertexShader: particlesVertexShader,
      fragmentShader: particlesFragmentShader,
      uniforms: {
        uSize: { value: 2.0 },
        uHoverProgress: this.uniforms?.uHoverProgress,
      },
    });

    const object = new THREE.Points(geometry, material);
    console.log(object);

// consol
    this.scene.add(object);
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
