// @ts-ignore
import * as THREE from "three";
import { SmokeFigure } from "./SmokeFigure";
import { RevealFigure } from "./RevealFigure";
import { ShapeFigure } from "./ShapeFigure";
import { GlitchFigure } from "./GlitchFigure";

import * as dat from "lil-gui";
import Lenis from "@studio-freight/lenis";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
// import LocomotiveScroll from "locomotive-scroll";
// import ASScroll from "@ashthornton/asscroll";

export class Scene {
  canvas: HTMLCanvasElement;
  scroller: Lenis;
  // scroller: LocomotiveScroll;
  // scroller: ASScroll;

  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;

  images: NodeListOf<HTMLImageElement>;
  figures: (SmokeFigure | RevealFigure | ShapeFigure)[];

  sizes: {
    width: number;
    height: number;
  };
  scrollY: number;
  gui: dat.GUI;

  // constructor(el: HTMLCanvasElement, scroller: LocomotiveScroll) {
  constructor(el: HTMLCanvasElement, scroller: Lenis) {
    this.canvas = el;
    this.scroller = scroller;

    this.images = document.querySelectorAll(".three-image");
    this.figures = [];

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.scrollY = 0;

    this.gui = new dat.GUI();

    if (!this.canvas) return;

    this.initScene();
    this.initCamera();

    this.initFigures();

    this.initScroller();

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

  initFigures() {
    this.figures = Array.from(this.images).map((image: HTMLImageElement) => {
      const effect = image.dataset.effect;
      const FigureClass =
        effect === "smoke"
          ? SmokeFigure
          : effect === "reveal"
          ? RevealFigure
          : effect === "glitch"
          ? GlitchFigure
          : ShapeFigure;

      return new FigureClass(this.scene, image, this.gui);
    });
  }

  initScroller() {
    if (!this.scroller) return;

    // @ts-ignore
    this.scroller.on("scroll", ({ scroll }) => {
      this.scrollY = scroll;
    });
  }

  update() {
    this.renderer.render(this.scene, this.camera);

    this.figures.forEach((figure) => {
      figure.update();
    });

    // Animate Camera
    this.camera.position.y = -this.scrollY;

    requestAnimationFrame(this.update.bind(this));
  }
}
