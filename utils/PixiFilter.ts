import * as PIXI from "pixi.js";
import { DisplacementFilter } from "@pixi/filter-displacement";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export class PixiFilter {
  el: HTMLElement;
  canvas: HTMLCanvasElement;
  pixiApp?: PIXI.Application;
  image?: PIXI.Sprite;
  canvasWidth?: number;
  canvasHeight?: number;
  observer?: IntersectionObserver;
  intersecting?: boolean;
  scroller: Lenis | undefined;
  container?: PIXI.Container;
  constructor(el: HTMLElement, canvas: HTMLCanvasElement, scroller?: Lenis) {
    this.el = el;
    this.canvas = canvas;
    this.scroller = scroller;

    if (!el || !canvas) return;
    this.createPixiApp();
  }

  createPixiApp() {
    this.getCanvasDimensions();
    // Create a Pixi Application
    this.pixiApp = new PIXI.Application({
      view: this.canvas,
      width: this.canvasWidth,
      height: this.canvasHeight,
      resolution: window.devicePixelRatio,
      resizeTo: this.el,
    });

    this.pixiApp.stage.interactive = true;
    this.container = new PIXI.Container();

    this.pixiApp.stage.addChild(this.container);

    this.getImage();

    this.resize();
  }

  // get and set canvas dimensions
  getCanvasDimensions() {
    this.canvasWidth = this.el.clientWidth;
    this.canvasHeight = this.el.clientHeight;
  }

  getImage() {
    // Get image url from data-image attribute on element
    const imageFile = this.el.getAttribute("data-image");
    // If no image exists, then return
    if (!imageFile) return;
    // Create a Pixi sprite from image
    this.image = PIXI.Sprite.from(imageFile);
    // Set image dimensions
    this.setImageDimensions(this.image, imageFile);
    // Add image to Pixi app stage
    this.container.addChild(this.image);
  }

  setImageDimensions(image, name) {
    // Set image name
    image.name = name;
    // Set image dimensions to match canvas dimensions
    image.width = this.canvasWidth;
    image.height = this.canvasHeight;
    // Set image anchor point to center
    image.anchor.set(0.5);
    // set image position to center of canvas
    image.position.y = this.canvasHeight / 2;
    image.position.x = this.canvasWidth / 2;
  }

  watchIntersection(entries, callback) {
    entries.forEach(({ isIntersecting }) => {
      this.intersecting = isIntersecting;
      if (callback) {
        callback();
      }
    });
  }

  createIntersectionObserver(threshold, callback?) {
    this.observer = new IntersectionObserver(
      (entries) => this.watchIntersection(entries, callback),
      {
        threshold: threshold,
      }
    );

    this.observer.observe(this.el);
  }

  resize() {
    window.addEventListener("resize", () => {
      this.getCanvasDimensions();
      this.setImageDimensions(this.image, this.image.name);
    });
  }
}
