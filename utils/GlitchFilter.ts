import * as PIXI from "pixi.js";
import { GlitchFilter as PixiGlitchFilter } from "@pixi/filter-glitch";
import { PixiFilter } from "./PixiFilter";

export class GlitchFilter extends PixiFilter {
  filter: PixiGlitchFilter;
  startTime: number;
  slices: number;
  glitchSpacing: number;
  glitchDuration: number;
  constructor(el, canvas) {
    super(el, canvas);

    this.createGlitchImageFilter();

    this.createIntersectionObserver(0.25, this.intersectionCallback.bind(this));
  }

  createGlitchImageFilter() {
    // Create Glitch filter
    this.filter = new PixiGlitchFilter({
      slices: 0, // Start with 0 slices
      fillMode: 2, // Loop glitches
      offset: 50, // Glitch slices offset by 100
      red: [0, 0], // Start with red channel offset at 0
      green: [0, 0], // Start with green channel offset at 0
      blue: [0, 0], // Start with blue channel offset at 0
    });
    // Set image filter to glitch filter
    this.image.filters = [this.filter];
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

  intersectionCallback() {
    if (!this.intersecting) {
      // If element is no longer onscreen, reset glitch filter properties
      this.resetGlitchFilter();
    }
  }

  resize() {
    window.addEventListener("resize", () => {
      this.getCanvasDimensions();
      this.setImageDimensions(this.image, this.image.name);
    });
  }
}
