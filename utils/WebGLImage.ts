import {
  createProgramInfo,
  ProgramInfo,
  resizeCanvasToDisplaySize,
  setUniforms,
} from "twgl.js";

export class WebgLImage {
  canvas: HTMLCanvasElement;
  imageUrl: string;
  vShaderSource: string;
  fShaderSource: string;
  gl: WebGL2RenderingContext | null;
  vertexShader?: WebGLShader;
  fragmentShader?: WebGLShader;
  programInfo?: ProgramInfo | null;
  image?: HTMLImageElement;
  texture: WebGLTexture | undefined | null;
  uniforms: {
    uResolution: null | WebGLUniformLocation;
    uImage: null | WebGLUniformLocation;
    uTime: number;
  };
  attributes: {
    positionAttributeLocation: null | number;
    texCoordAttributeLocation: null | number;
  };

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

    this.attributes = {
      positionAttributeLocation: null,
      texCoordAttributeLocation: null,
    };

    this.uniforms = {
      uResolution: null,
      uImage: null,
      uTime: 0,
    };

    if (
      !this.canvas ||
      !this.imageUrl ||
      !this.vShaderSource ||
      !this.fShaderSource
    )
      return;

    this.initWebGLProgram();

    this.loadImage();
  }

  initWebGLProgram() {
    this.gl = this.canvas.getContext("webgl2");

    if (!this.gl) return;

    this.programInfo = createProgramInfo(this.gl, [
      this.vShaderSource,
      this.fShaderSource,
    ]);

    // Set canvas size
    resizeCanvasToDisplaySize(this.gl.canvas);
  }

  loadImage() {
    this.image = new Image();
    this.image.src = this.imageUrl;
    this.image.width = this.canvas.width;
    this.image.height = this.canvas.height;
    this.image.onload = () => {
      this.createImageRectangle();
    };
  }

  createImageRectangle() {
    if (!this.gl || !this.programInfo?.program || !this.image) return;

    this.getAttributeLocations();
    // this.getUniformLocations();

    if (
      typeof this.attributes.positionAttributeLocation !== "number" ||
      typeof this.attributes.texCoordAttributeLocation !== "number"
      // ||
      // !this.uniforms.imageLocation ||
      // !this.uniforms.resolutionLocation
    )
      return;

    // Create a vertex array object (attribute state)
    const vao = this.gl.createVertexArray();

    // and make it the one we're currently working with
    this.gl.bindVertexArray(vao);

    // Create a buffer and put a single pixel space rectangle in
    // it (2 triangles)
    const positionBuffer = this.gl.createBuffer();

    // Turn on the attribute
    this.gl.enableVertexAttribArray(this.attributes.positionAttributeLocation);

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    this.vertexAttribPointer(this.attributes.positionAttributeLocation);

    // provide texture coordinates for the rectangle.
    const texCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
      ]),
      this.gl.STATIC_DRAW
    );

    // // Turn on the attribute
    this.gl.enableVertexAttribArray(this.attributes.texCoordAttributeLocation);

    this.vertexAttribPointer(this.attributes.texCoordAttributeLocation);

    this.createTextureFromImage();

    // Tell WebGL how to convert from clip space to pixels
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    // Clear the canvas
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    this.gl.useProgram(this.programInfo.program);

    // Bind the attribute/buffer set we want.
    this.gl.bindVertexArray(vao);

    // // Pass in the canvas resolution so we can convert from
    // // pixels to clipspace in the shader
    // this.gl.uniform2f(
    //   this.uniforms.resolutionLocation,
    //   this.gl.canvas.width,
    //   this.gl.canvas.height
    // );

    // Tell the shader to get the texture from texture unit 0
    // this.gl.uniform1i(this.uniforms.imageLocation, 0);

    // Bind the position buffer so this.gl.bufferData that will be called
    // in setRectangle puts data in the position buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    // Set a rectangle the same size as the image.
    this.setRectangle(0, 0, this.image.width, this.image.height);

    // Draw the rectangle.
    const primitiveType = this.gl.TRIANGLES;
    const offset = 0;
    const count = 6;

    this.gl.drawArrays(primitiveType, offset, count);

    requestAnimationFrame(this.tick.bind(this));
  }

  createShader(type: number, source: string) {
    // Check if webGL Context exists
    if (!this.gl) return;
    // Create shader
    const shader = this.gl.createShader(type);
    // If shader does not exist, return
    if (!shader) return;
    // Add shader source to shader
    this.gl.shaderSource(shader, source);
    // Compile shader
    this.gl.compileShader(shader);
    // Check if shader was successfully created
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    // If success, return shader
    if (success) {
      return shader;
    }

    // else console warn error and delete shader
    console.warn(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
  }

  createProgram(
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): WebGLProgram | undefined {
    // Check if webGL Context exists
    if (!this.gl) return;
    //  Create webgl program
    const program = this.gl.createProgram();
    // If program does not exist, return
    if (!program) return;
    // Attach shaders to program
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    // Link program to webgl context
    this.gl.linkProgram(program);
    // Check if program creation was successfull
    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    // If successful, return program
    if (success) {
      return program;
    }
    // else console warn error and delete program
    console.warn(this.gl.getProgramInfoLog(program));
    this.gl.deleteProgram(program);
  }

  resizeCanvasToDisplaySize() {
    if (!this.canvas) return;
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth = this.canvas.clientWidth;
    const displayHeight = this.canvas.clientHeight;

    // Check if the canvas is not the same size.
    const needResize =
      this.canvas.width !== displayWidth ||
      this.canvas.height !== displayHeight;

    if (needResize) {
      // Make the canvas the same size
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
    }

    return needResize;
  }

  setRectangle(x: number, y: number, width: number, height: number) {
    if (!this.gl) return;

    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
      this.gl.STATIC_DRAW
    );
  }

  getAttributeLocations() {
    if (!this.gl || !this.programInfo?.program) return;

    this.attributes = {
      // look up where the vertex data needs to go.
      positionAttributeLocation: this.gl.getAttribLocation(
        this.programInfo.program,
        "aPosition"
      ),
      texCoordAttributeLocation: this.gl.getAttribLocation(
        this.programInfo.program,
        "aUv"
      ),
    };
  }

  getUniformLocations() {
    if (!this.gl || !this.programInfo?.program) return;

    this.uniforms = {
      resolutionLocation: this.gl.getUniformLocation(
        this.programInfo.program,
        "uResolution"
      ),
      imageLocation: this.gl.getUniformLocation(
        this.programInfo.program,
        "uImage"
      ),
    };
  }

  vertexAttribPointer(location: number) {
    if (!this.gl || typeof location !== "number") return;

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    const size = 2; // 2 components per iteration
    const type = this.gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0; // start at the beginning of the buffer

    this.gl.vertexAttribPointer(
      location,
      size,
      type,
      normalize,
      stride,
      offset
    );
  }

  createTextureFromImage() {
    if (!this.gl || !this.image) return;

    // Create a texture.
    this.texture = this.gl.createTexture();

    // make unit 0 the active texture uint
    // (ie, the unit all other texture commands will affect
    this.gl.activeTexture(this.gl.TEXTURE0 + 0);

    // Bind it to texture unit 0' 2D bind point
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

    this.setTextureParams();

    // Upload the image into the texture.
    const mipLevel = 0; // the largest mip
    const internalFormat = this.gl.RGBA; // format we want in the texture
    const srcFormat = this.gl.RGBA; // format of data we are supplying
    const srcType = this.gl.UNSIGNED_BYTE; // type of data we are supplying
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      mipLevel,
      internalFormat,
      srcFormat,
      srcType,
      this.image
    );
  }

  setTextureParams() {
    if (!this.gl) return;

    // Set the parameters so we don't need mips and so we're not filtering
    // and we don't repeat at the edges
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.NEAREST
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.NEAREST
    );
  }

  tick(time: number) {
    if (!this.gl || !this.programInfo || !this.texture) return;

    resizeCanvasToDisplaySize(this.gl.canvas);

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    this.uniforms = {
      uTime: time * 0.001,
      uImage: this.texture,
      uResolution: [this.gl.canvas.width, this.gl.canvas.height],
    };

    setUniforms(this.programInfo, this.uniforms);

    requestAnimationFrame(this.tick.bind(this));
  }
}
