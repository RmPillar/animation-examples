// @ts-ignore
import * as THREE from "three";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { GlitchPass } from "three/addons/postprocessing/GlitchPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

import vertextShader from "~/shaders/imageDistortion/vertex.glsl";
import fragmentShader from "~/shaders/imageDistortion/fragment.glsl";

export class ImageDistortion {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
  imageTwo: HTMLImageElement;

  sizes: {
    width: number;
    height: number;
  } = {
    width: 0,
    height: 0,
  };

  scene: THREE.Scene;

  texture: THREE.Texture;
  textureTwo: THREE.Texture;
  textureLoader: THREE.TextureLoader;

  geometry: THREE.PlaneGeometry;
  material: THREE.ShaderMaterial;
  mesh: THREE.Mesh;

  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  composer: THREE.EffectComposer;

  mouse: THREE.Vector2 = new THREE.Vector2(0, 0);

  clock: THREE.Clock;

  constructor(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    imageTwo: HTMLImageElement
  ) {
    this.canvas = canvas;
    this.image = image;
    this.imageTwo = imageTwo;

    if (!this.canvas || !this.image) return;

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.loadTexture(this.init);

    this.init();
    this.resize();
  }

  async init() {
    this.getSizes();

    this.scene = new THREE.Scene();

    this.createMaterial();

    this.createCamera();

    this.createRenderer();

    // this.createEffects();
    this.addMouseMove();

    this.clock = new THREE.Clock();

    this.tick();
  }

  loadTexture(func: () => void) {
    if (!this.textureLoader) this.textureLoader = new THREE.TextureLoader();

    const textPromises = [
      this.textureLoader.load(this.image.src),
      this.textureLoader.load(this.imageTwo.src),
    ];

    Promise.all(textPromises).then((textures) => {
      this.texture = textures[0];
      this.textureTwo = textures[1];

      func();
    });
  }

  createMaterial() {
    if (!this.texture || !this.scene || !this.sizes) return;

    // Geometry
    this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

    // Material
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertextShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uFrequency: { value: new THREE.Vector2(10, 5) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("orange") },
        uTexture: { value: this.texture },
        uTextureHover: { value: this.textureTwo },
        uMouse: { value: this.mouse },
        uResolution: {
          value: new THREE.Vector2(this.sizes.width, this.sizes.height),
        },
      },
    });

    // Mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(this.image.width / this.image.height, 1, 1);
    this.scene.add(this.mesh);
  }

  createCamera() {
    if (!this.scene || !this.sizes) return;

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );

    this.camera.position.set(0, 0, 0.65);

    this.scene.add(this.camera);
  }

  createRenderer() {
    if (!this.canvas || !this.sizes) return;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  createEffects() {
    if (!this.renderer || !this.camera || !this.scene) return;

    this.composer = new EffectComposer(this.renderer);

    this.composer.addPass(new RenderPass(this.scene, this.camera));

    const glitchPass = new GlitchPass();

    this.composer.addPass(glitchPass);
  }

  addMouseMove() {
    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.sizes) return;

      this.mouse = {
        x: e.clientX,
        y: e.clientY,
      };
    });
  }

  tick() {
    if (!this.clock || !this.material || !this.scene || !this.camera) return;

    const elapsedTime = this.clock.getElapsedTime();

    // Update materials
    this.material.uniforms.uTime.value = elapsedTime;

    this.material.uniforms.uMouse.value = this.mouse;

    // Render
    this.renderer.render(this.scene, this.camera);
    // this.composer.render(elapsedTime);

    // Call tick again on the next frame
    window.requestAnimationFrame(this.tick.bind(this));
  }

  resize() {
    window.addEventListener("resize", () => {
      if (!this.renderer || !this.camera || !this.mesh || !this.sizes) return;
      // Update sizes
      this.getSizes();

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();

      // Update mesh
      this.mesh.scale.set(this.image.width / this.image.height, 1, 1);

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // // Update composer
      // this.composer.setSize(this.sizes.width, this.sizes.height);
      // this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  getSizes() {
    this.sizes = {
      width: this.canvas.offsetWidth,
      height: this.canvas.offsetHeight,
    };
  }
}
