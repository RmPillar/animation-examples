import * as PIXI from "pixi.js";
import { gsap } from "gsap";

import fragmentShader from "~/shaders/PixiShaders/glitch/fragment.glsl";
import vertexShader from "~/shaders/PixiShaders/glitch/vertex.glsl";

export class PixiShader {
  el: HTMLElement;
  canvas: HTMLCanvasElement;

  pixiApp?: PIXI.Application;
  container?: PIXI.Container;
  image?: PIXI.AssetsClass | Record<string, PIXI.AssetsClass>;
  program?: PIXI.Program;
  shader?: PIXI.Shader;

  uniforms?: {
    uTime: { value: number };
    uImage: { value: PIXI.Texture | null };
    uGlitchColorOffset: { value: number };
    uGlitchPower: { value: number };
    uGlitchBlockSize: { value: number };
    uGlitchXOffset: { value: number };
    uGlitchYOffset: { value: number };
    uEnableGlitch: { value: number };
    uRatio: { value: number };
  };

  canvasWidth: number = 0;
  canvasHeight: number = 0;

  constructor(el: HTMLElement, canvas: HTMLCanvasElement) {
    this.el = el;
    this.canvas = canvas;

    if (!this.el || !this.canvas) return;

    this.initPixiApp();
  }

  initPixiApp() {
    this.getCanvasDimensions();

    this.uniforms = {
      uImage: { value: null },
      uTime: { value: 0 },
      uRatio: { value: this.canvasWidth / this.canvasHeight },
      uGlitchColorOffset: { value: 0.03 },
      uGlitchPower: { value: 0.03 },
      uGlitchBlockSize: { value: 30.5 },
      uGlitchXOffset: { value: 1.0 },
      uGlitchYOffset: { value: 1.0 },
      uEnableGlitch: { value: 0 },
    };

    // Create a Pixi Application
    this.pixiApp = new PIXI.Application({
      view: this.canvas,
      width: this.canvasWidth,
      height: this.canvasHeight,
      resolution: window.devicePixelRatio,
      resizeTo: this.el,
      backgroundAlpha: 0,
    });

    this.pixiApp.stage.interactive = true;
    this.container = new PIXI.Container();

    this.pixiApp.stage.addChild(this.container);

    this.initShader();
  }

  async initShader() {
    if (!this.canvasWidth || !this.canvasHeight || !this.container) return;

    const imageSrc = this.el.dataset.src;

    if (!imageSrc) return;

    const geometry = new PIXI.Geometry()
      .addAttribute(
        "aVertexPosition", // the attribute name
        [
          -100,
          -100, // x, y
          100,
          -100, // x, y
          100,
          100,
          -100,
          100,
        ], // x, y
        2
      ) // the size of the attribute
      .addAttribute(
        "aUvs", // the attribute name
        [
          0,
          0, // u, v
          1,
          0, // u, v
          1,
          1,
          0,
          1,
        ], // u, v,
        2
      ); // the size of the attribute

    this.image = await PIXI.Assets.load(imageSrc);

    this.shader = PIXI.Shader.from(vertexShader, fragmentShader, this.uniforms);
    const quad = new PIXI.Mesh(geometry, this.shader);

    console.log(this.shader);

    this.container.addChild(quad);

    gsap.ticker.add(this.update.bind(this));
  }

  // get and set canvas dimensions
  getCanvasDimensions() {
    this.canvasWidth = this.el.clientWidth;
    this.canvasHeight = this.el.clientHeight;
  }

  update() {
    if (!this.uniforms) return;

    this.uniforms.uTime.value += 0.01;
  }
}
