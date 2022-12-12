import {
  resizeCanvasToDisplaySize,
  createProgramInfo,
  setBuffersAndAttributes,
  setUniforms,
  drawBufferInfo,
  createBufferInfoFromArrays,
  createTexture,
  createFramebufferInfo,
  ProgramInfo,
  BufferInfo,
} from "twgl.js";

export class WebgLImage {
  canvas: HTMLCanvasElement;
  imageUrl: string;
  vShaderSource: string;
  fShaderSource: string;

  gl: WebGL2RenderingContext | null;

  programInfo: ProgramInfo | null;

  constructor(
    canvas: HTMLCanvasElement,
    imageUrl: string,
    vShaderSource: string,
    fShaderSource: string
  ) {
    this.canvas = canvas;
    this.imageUrl = imageUrl;
    this.vShaderSource = vShaderSource;
    this.fShaderSource = fShaderSource;

    this.gl = null;
    this.programInfo = null;

    if (
      !this.canvas ||
      !this.imageUrl ||
      !this.vShaderSource ||
      !this.fShaderSource
    )
      return;

    this.initWebGLProgram();
  }

  initWebGLProgram() {
    this.gl = this.canvas.getContext("webgl2");

    if (!this.gl) return;

    this.programInfo = createProgramInfo(this.gl, [
      this.vShaderSource,
      this.fShaderSource,
    ]);
  }
}
