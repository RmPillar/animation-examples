import * as PIXI from "pixi.js";
import { DisplacementFilter } from "@pixi/filter-displacement";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import throttle from "lodash.throttle";

export class ImageDisplacement {
  el: HTMLElement;
  canvas: HTMLCanvasElement;
  pixiApp: PIXI.Application;
  filter: DisplacementFilter;
  canvasWidth: number;
  canvasHeight: number;
  displacementTimeline: GSAPTimeline;
  observer: IntersectionObserver;
  intersecting: boolean;
  constructor(el, canvas) {
    gsap.registerPlugin(ScrollTrigger);

    if (!el || !canvas) return;

    this.el = el;
    this.canvas = canvas;

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

    this.getImage();

    this.getDisplacementImage();

    setTimeout(() => {
      this.createDisplacementTimeline();
      this.createDisplacementHover();
    }, 500);
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
    const image = PIXI.Sprite.from(imageFile);
    // Set image dimensions
    this.setImageDimensions(image, imageFile);
    // Add image to Pixi app stage
    this.pixiApp.stage.addChild(image);
  }

  getDisplacementImage() {
    const displacementMapFile = this.el.getAttribute("data-displacement-map");
    const displacementMap = PIXI.Sprite.from(displacementMapFile);
    this.filter = new PIXI.filters.DisplacementFilter(displacementMap);

    this.pixiApp.stage.filterArea = this.pixiApp.screen;
    this.pixiApp.stage.filters = [this.filter];
    this.pixiApp.stage.addChild(displacementMap);

    // Set displacement image dimensions
    this.setImageDimensions(displacementMap, displacementMapFile);
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

  createDisplacementTimeline() {
    this.displacementTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.el,
        start: "top center",
        once: true,
      },
    });

    this.displacementTimeline
      .fromTo(
        this.canvas,
        {
          autoAlpha: 0,
        },
        {
          duration: 0.7,
          autoAlpha: 1,
          ease: "power2.out",
        },
        0
      )
      .fromTo(
        this.filter.scale,
        {
          x: 150,
          y: 150,
        },
        {
          duration: 1.5,
          x: 0,
          y: 0,
          ease: "power2.out",
        },
        0
      );
  }

  createDisplacementHover() {
    this.el.addEventListener(
      "mousemove",
      throttle(this.handleDisplacementHover.bind(this), 100)
    );
    this.el.addEventListener("mouseleave", this.resetDisplacement.bind(this));
  }

  destroyDisplacementHover() {
    this.el.removeEventListener(
      "mousemove",
      throttle(this.handleDisplacementHover.bind(this), 100)
    );
    this.el.removeEventListener(
      "mouseleave",
      this.resetDisplacement.bind(this)
    );
  }

  handleDisplacementHover(e) {
    console.log("hello");
    const x = Math.min(e.clientX / 20, 75);
    const y = Math.min(e.clientY / 20, 75);
    gsap.to(this.filter.scale, { x, y });
  }

  resetDisplacement() {
    gsap.to(this.filter.scale, { x: 0, y: 0 });
  }

  setupScrollDisplacement(scroller: any) {
    this.observer = new IntersectionObserver(
      this.watchIntersection.bind(this),
      {
        threshold: 0.5,
      }
    );

    this.observer.observe(this.el);

    scroller.on(
      "scroll",
      throttle(({ velocity }) => {
        if (this.intersecting) {
          gsap.to(this.filter.scale, {
            y: Math.min(velocity * 3, 100),
          });
        }
      }),
      100
    );
  }

  watchIntersection(entries) {
    entries.forEach(({ isIntersecting }) => {
      this.intersecting = isIntersecting;
    });
  }
}
