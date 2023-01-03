// @ts-ignore
import * as THREE from "three";
import { SmokeFigure } from "./SmokeFigure";
import { RevealFigure } from "./RevealFigure";
import { ShapeFigure } from "./ShapeFigure";
import { GlitchFigure } from "./GlitchFigure";
import { SnapFigure } from "./SnapFigure";

import * as dat from "lil-gui";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";

let resizeTicking: NodeJS.Timeout;

export class Scene {
  canvas: HTMLCanvasElement;
  scroller: ScrollSmoother;

  scrollTrigger?: ScrollTrigger;

  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;

  images: NodeListOf<HTMLImageElement>;
  figures: (
    | SmokeFigure
    | RevealFigure
    | ShapeFigure
    | SnapFigure
    | GlitchFigure
  )[];

  sizes: {
    width: number;
    height: number;
  };
  windowAspectRatio: number;
  maxScroll: number;

  scrollY: number;
  gui: dat.GUI;

  constructor(el: HTMLCanvasElement) {
    this.canvas = el;
    this.scroller = ScrollSmoother.get();

    this.images = document.querySelectorAll(".three-image");
    this.figures = [];

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.windowAspectRatio = this.sizes.width / this.sizes.height;
    this.maxScroll = ScrollTrigger.maxScroll(window);

    this.scrollY = 0;

    this.gui = new dat.GUI();
    this.gui.close();

    if (!this.canvas) return;

    this.initScene();
    this.initCamera();

    this.initFigures();

    this.initScroller();

    gsap.ticker.add(this.update.bind(this));

    window.addEventListener("resize", this.requestResizeTick.bind(this), {
      passive: true,
    });
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
          : effect === "snap"
          ? SnapFigure
          : ShapeFigure;

      return new FigureClass(this.scene, image, this.gui);
    });
  }

  initScroller() {
    if (!this.scroller) return;

    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
    }

    const tween = gsap.to(this.camera.position, {
      y: -ScrollTrigger.maxScroll(window),
      ease: "none",
    });

    this.scrollTrigger = ScrollTrigger.create({
      trigger: ".three-images-wrapper",
      start: "top top",
      end: "bottom bottom",
      markers: true,
      animation: tween,
      scrub: true,
    });
  }

  updateCameraPosition() {
    this.camera.position.y = this.scroller.scrollTop;
  }

  requestResizeTick() {
    // @ts-ignore
    clearTimeout(resizeTicking);
    resizeTicking = setTimeout(() => {
      this.resize();
    }, 100);
  }

  update() {
    this.renderer.render(this.scene, this.camera);

    // console.log(this.camera.position.y, "><<<<");

    this.figures.forEach((figure) => {
      figure.update();
    });
  }

  resize() {
    console.log(this.camera.position.y, "resize");
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.figures.forEach((figure) => {
      figure.resize();
    });

    // gsap.set(this.camera.position, { y: -this.scroller.scrollTop() });
    this.initScroller();

    console.log(this.camera.position.y, "resize 2");
  }
}
