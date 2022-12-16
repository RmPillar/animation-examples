// @ts-ignore
import * as THREE from "three";
import { gsap } from "gsap";

import vertexShader from "~/shaders/ThreeImage/vertex.glsl";
import fragmentShader from "~/shaders/ThreeImage/fragment.glsl";

import * as dat from "lil-gui";

export class Figure {
  scene: THREE.Scene;
  imageEl: HTMLImageElement;

  loader: THREE.TextureLoader;

  texture: THREE.Texture;
  hoverTexture: THREE.Texture;

  geometry: THREE.PlaneGeometry;
  material: THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;

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
  };

  sizes: THREE.Vector2;
  offset: THREE.Vector2;
  mouse: THREE.Vector2 = new THREE.Vector2(0, 0);

  gui: dat.GUI;

  constructor(scene: THREE.Scene, image: HTMLImageElement, gui: dat.GUI) {
    this.scene = scene;
    this.imageEl = image;
    this.gui = gui;

    if (!this.scene || !this.imageEl) return;

    this.initFigure();

    this.addToGui();
  }

  initFigure() {
    this.loader = new THREE.TextureLoader();

    this.texture = this.loader.load(this.imageEl.src);
    this.hoverTexture = this.loader.load(
      this.imageEl.getAttribute("data-hover")
    );

    this.sizes = new THREE.Vector2(0, 0);
    this.offset = new THREE.Vector2(0, 0);

    this.getSizes();

    this.createMesh();

    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  getSizes() {
    const { width, height, top, left } = this.imageEl.getBoundingClientRect();

    this.sizes.set(width, height);
    this.offset.set(
      left - window.innerWidth / 2 + width / 2,
      -top + window.innerHeight / 2 - height / 2
    );
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    this.uniforms = {
      uImage: { value: this.texture },
      uImageHover: { value: this.hoverTexture },
      uMouse: { value: this.mouse },
      uTime: { value: 0 },
      uSize: { value: 0.05 },
      uNoise: { value: 5.0 },
      uNoiseSpeed: { value: 0.1 },
      uBlur: { value: 0.1 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      defines: {
        PR: window.devicePixelRatio.toFixed(1),
      },
    });

    // this.material = new THREE.MeshBasicMaterial({
    //   map: this.texture,
    // });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

    this.scene.add(this.mesh);
  }

  onMouseMove(e: MouseEvent) {
    gsap.to(this.mouse, {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });

    // gsap.to(this.mesh.rotation, {
    //   x: this.mouse.y * 0.3,
    //   y: this.mouse.y * (Math.PI / 6),
    // });
  }

  addToGui() {
    if (!this.gui || !this.uniforms) return;

    this.gui
      .add(this.uniforms.uSize, "value", 0, 0.1, 0.001)
      .name("Cursor Size");

    this.gui
      .add(this.uniforms.uNoise, "value", 0, 30, 0.1)
      .name("Noise Strength");

    this.gui
      .add(this.uniforms.uNoiseSpeed, "value", 0, 1, 0.001)
      .name("Noise Speed");

    this.gui.add(this.uniforms.uBlur, "value", 0, 0.5, 0.001).name("Blur");
  }

  update() {
    if (!this.uniforms) return;

    this.uniforms.uTime.value += 0.01;
  }
}
