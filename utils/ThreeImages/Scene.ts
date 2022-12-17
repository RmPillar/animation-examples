// @ts-ignore
import * as THREE from "three";
import { GloopFigure } from "./GloopFigure";
import { RevealFigure } from "./RevealFigure";

import gloopFragmentShader from "~/shaders/ThreeImage/gloop/fragment.glsl";
import gloopVertexShader from "~/shaders/ThreeImage/gloop/vertex.glsl";

import revealFragmentShader from "~/shaders/ThreeImage/reveal/fragment.glsl";
import revealVertexShader from "~/shaders/ThreeImage/reveal/vertex.glsl";

import * as dat from "lil-gui";

export class Scene {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
  imageTwo: HTMLImageElement;

  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;

  gloopFigure?: GloopFigure;
  revealFigure?: RevealFigure;

  gui: dat.GUI;

  constructor(
    el: HTMLCanvasElement,
    image: HTMLImageElement,
    imageTwo: HTMLImageElement
  ) {
    this.canvas = el;
    this.image = image;
    this.imageTwo = imageTwo;

    this.gui = new dat.GUI();

    if (!this.canvas) return;

    this.initScene();
    this.initCamera();

    this.gloopFigure = new GloopFigure(
      this.scene,
      this.image,
      gloopVertexShader,
      gloopFragmentShader,
      this.gui
    );

    this.revealFigure = new RevealFigure(
      this.scene,
      this.imageTwo,
      revealVertexShader,
      revealFragmentShader,
      this.gui
    );

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

    if (this.gloopFigure) this.gloopFigure.update();
    if (this.revealFigure) this.revealFigure.update();

    requestAnimationFrame(this.update.bind(this));
  }
}
