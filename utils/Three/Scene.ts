// @ts-ignore
import * as THREE from "three";
import { Figure } from "./Figure";

import * as dat from "lil-gui";

export class Scene {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;

  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;

  figure?: Figure;

  gui: dat.GUI;

  constructor(el: HTMLCanvasElement, image: HTMLImageElement) {
    this.canvas = el;
    this.image = image;

    this.gui = new dat.GUI();

    if (!this.canvas) return;

    this.initScene();
    this.initCamera();

    this.figure = new Figure(this.scene, this.image, this.gui);

    this.update();
  }

  initScene() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.initLights();
  }

  initLights() {
    const ambientlight = new THREE.AmbientLight(0xffffff, 2);
    this.scene.add(ambientlight);
  }

  initCamera() {
    const fov = (180 * (2 * Math.atan(window.innerHeight / 2 / 800))) / Math.PI;

    this.camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(0, 0, 800);
  }

  update() {
    this.renderer.render(this.scene, this.camera);

    if (this.figure) this.figure.update();

    requestAnimationFrame(this.update.bind(this));
  }
}
