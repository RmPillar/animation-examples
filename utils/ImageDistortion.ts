// @ts-ignore
import * as THREE from "three";

import imageDistortionVertexShader from "~/shaders/imageDistortion/vertex.glsl";
import imageDistortionFragmentShader from "~/shaders/imageDistortion/fragment.glsl";

type ViewportType = {
  width: number;
  height: number;
  aspectRatio: number;
};

type UniformsType = {
  uTexture: {
    value: THREE.texture;
  };
  uOffset: {
    value: THREE.Vector2;
  };
  uAlpha: {
    value: number | null;
  };
};

export class ImageDistortion {
  container: HTMLDivElement;
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  clock: THREE.Clock;
  textureLoader: THREE.TextureLoader;
  texture: THREE.texture;
  position: THREE.Vector3;
  scale: THREE.Vector3;
  geometry: THREE.PlaneGeometry;
  material: THREE.ShaderMaterial;
  plane: THREE.Mesh;
  uniforms: UniformsType;
  viewport: ViewportType;

  constructor(container: HTMLDivElement, canvas: HTMLCanvasElement) {
    this.container = container;
    this.canvas = canvas;

    this.uniforms = {
      uTexture: {
        value: null,
      },
      uOffset: {
        value: null,
      },
      uAlpha: {
        value: null,
      },
    };
    this.viewport = {
      width: 0,
      height: 0,
      aspectRatio: 1,
    };

    if (!canvas || !container) return;
    console.log("hello");

    this.init();
  }

  init() {
    this.getViewportDimensions();

    this.setupScene();

    this.loadTexture();
  }

  setupScene() {
    // renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: this.canvas,
    });
    this.renderer.setPixelRatio = window.devicePixelRatio;

    // scene
    this.scene = new THREE.Scene();

    // clock
    this.clock = new THREE.Clock();

    // camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.viewport.aspectRatio,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 3);

    this.tick();
  }

  async loadTexture() {
    this.textureLoader = new THREE.TextureLoader();
    const image = this.canvas.getAttribute("data-image");

    if (!image) return;

    this.texture = await this.textureLoader.load(
      image,
      this.createMaterial.bind(this)
    );
  }

  createMaterial() {
    this.position = new THREE.Vector3(0, 0, 0);
    this.scale = new THREE.Vector3(1, 1, 1);
    this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

    this.uniforms = {
      uTexture: {
        //texture data
        value: this.texture,
      },
      uOffset: {
        //distortion strength
        value: new THREE.Vector2(0.0, 0.0),
      },
      uAlpha: {
        //opacity
        value: 1,
      },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: imageDistortionVertexShader,
      fragmentShader: imageDistortionFragmentShader,
      transparent: true,
    });

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);

    this.scale = new THREE.Vector3(this.viewport.aspectRatio, 1, 1);
    this.plane.scale.copy(this.scale);
  }

  getViewportDimensions() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientWidth;

    this.viewport = {
      width,
      height,
      aspectRatio: width / height,
    };
  }

  tick() {
    const elapsedTime = this.clock.getElapsedTime();

    // Render
    this.renderer.render(this.scene, this.camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(this.tick.bind(this));
  }
}
