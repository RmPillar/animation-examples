import * as PIXI from "pixi.js";
import { GlitchFilter } from "@pixi/filter-glitch";

export class ImageGlitchFilter {
  el: HTMLElement;
  canvas: HTMLCanvasElement;
  pixiApp: PIXI.Application;
  canvasWidth: number;
  canvasHeight: number;
  displacementTimeline: GSAPTimeline;
  observer: IntersectionObserver;
  intersecting: boolean;
  container: PIXI.Container;
  filter: GlitchFilter;
  startTime: number;
  slices: number;
  glitchSpacing: number;
  glitchDuration: number;
  image: PIXI.Sprite;
  constructor(el, canvas) {
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

    this.pixiApp.stage.interactive = true;
    this.container = new PIXI.Container();

    this.pixiApp.stage.addChild(this.container);

    this.getImage();

    this.setupIntersectionObserver();

    this.createGlitchImageFilter();

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

  createGlitchImageFilter() {
    // Create Glitch filter
    this.filter = new GlitchFilter({
      slices: 0, // Start with 0 slices
      fillMode: 2, // Loop glitches
      offset: 50, // Glitch slices offset by 100
      red: [0, 0], // Start with red channel offset at 0
      green: [0, 0], // Start with green channel offset at 0
      blue: [0, 0], // Start with blue channel offset at 0
    });
    // Set image filter to glitch filter
    this.image.filters = [this.filter];
    // Add image element to intersection observer
    this.observer.observe(this.el);
    // Set start time to now
    this.startTime = Date.now();
    // Set time between glitches to 3s
    this.glitchSpacing = 3000;
    // Set glitch duration to 1s
    this.glitchDuration = 1000;
    // Setup pixi glitch ticker
    this.pixiApp.ticker.add(this.pixiAppTicker.bind(this));
  }

  pixiAppTicker() {
    // If image is not on screen, return
    if (!this.intersecting) return;
    // Get current time
    const currentTime = Date.now();
    // Calculate time passed since start time
    const deltaTime = currentTime - this.startTime;
    // If more time has passed than glitch spacing start glitch
    if (deltaTime > this.glitchSpacing) {
      // If less time than glitch duration has passed, set glitch filter properties
      if (deltaTime <= this.glitchSpacing + this.glitchDuration) {
        this.setFilterProperties();
      }
      // If more time than glitch duration has passed, reset glitch filter properties
      if (deltaTime > this.glitchSpacing + this.glitchDuration) {
        this.resetGlitchFilter();
      }
      // apply glitch filter properties
      this.filter.slices = this.slices;
    }
  }

  setFilterProperties() {
    // Set number of glitch slices to random integer between 1 and 7
    this.slices = Math.ceil(Math.random() * 7);
    // set glitch filter color offsets
    this.filter.red = [2.9, 2];
    this.filter.green = [-10, 4];
    this.filter.blue = [10, -4];
  }

  resetGlitchFilter() {
    this.startTime = Date.now(); // Set startTime to now
    this.slices = 0; // Set number of slices to 0
    this.filter.red = [0, 0]; // Set red color offset to 0
    this.filter.green = [0, 0]; // Set green color offset to 0
    this.filter.blue = [0, 0]; // Set blue color offset to 0

    this.glitchSpacing = Math.random() * 5000 + 1000; // Set glitch spacing to random time between 1 and 6 seconds
    this.glitchDuration = Math.random() * 2000; // Set glitch duration to random time between 0 and 2 seconds
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      this.watchIntersection.bind(this),
      {
        threshold: 0.25,
      }
    );
  }

  watchIntersection(entries) {
    // When element is onscreen, set this.intersecting to true
    entries.forEach(({ isIntersecting }) => {
      this.intersecting = isIntersecting;
      if (!this.intersecting) {
        // If element is no longer onscreen, reset glitch filter properties
        this.resetGlitchFilter();
      }
    });
  }

  resize() {
    window.addEventListener("resize", () => {
      this.getCanvasDimensions();
      this.setImageDimensions(this.image, this.image.name);
    });
  }
}
