// @ts-ignore
import * as THREE from "three";
import { GloopFigure } from "./GloopFigure";
import { RevealFigure } from "./RevealFigure";
import { ShapeFigure } from "./ShapeFigure";

import gloopFragmentShader from "~/shaders/ThreeImage/gloop/fragment.glsl";
import gloopVertexShader from "~/shaders/ThreeImage/gloop/vertex.glsl";

import revealFragmentShader from "~/shaders/ThreeImage/reveal/fragment.glsl";
import revealVertexShader from "~/shaders/ThreeImage/reveal/vertex.glsl";

import shapeFragmentShader from "~/shaders/ThreeImage/shape/fragment.glsl";
import shapeVertexShader from "~/shaders/ThreeImage/shape/vertex.glsl";

import * as dat from "lil-gui";

export class Scene {
  canvas: HTMLCanvasElement;
  images: HTMLImageElement[];

  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;

  figures: (GloopFigure | RevealFigure | ShapeFigure)[] = [];

  gui: dat.GUI;

  figureClasses: (
    | typeof GloopFigure
    | typeof RevealFigure
    | typeof ShapeFigure
  )[];
  shaders: {
    vertex: string;
    fragment: string;
  }[];

  constructor(el: HTMLCanvasElement, images: HTMLImageElement[]) {
    this.canvas = el;
    this.images = images;

    this.gui = new dat.GUI();

    this.figureClasses = [GloopFigure, ShapeFigure, RevealFigure];

    this.shaders = [
      {
        vertex: gloopVertexShader,
        fragment: gloopFragmentShader,
      },

      {
        vertex: shapeVertexShader,
        fragment: shapeFragmentShader,
      },
      {
        vertex: revealVertexShader,
        fragment: revealFragmentShader,
      },
    ];

    if (!this.canvas) return;

    this.initScene();
    this.initCamera();

    this.figures = this.images.map((image, index) => {
      return new this.figureClasses[index](
        this.scene,
        image,
        this.shaders[index].vertex,
        this.shaders[index].fragment,
        this.gui
      );
    });

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

    this.figures.forEach((figure) => {
      figure.update();
    });

    requestAnimationFrame(this.update.bind(this));
  }
}
