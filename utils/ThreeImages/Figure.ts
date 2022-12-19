// @ts-ignore
import * as THREE from "three";

import vertexShader from "~/shaders/ThreeImage/smoke/vertex.glsl";

import * as dat from "lil-gui";

export class Figure {
  scene: THREE.Scene;
  imageEl: HTMLImageElement;
  vertexShader: string;
  fragmentShader: string;

  loader: THREE.TextureLoader;

  texture: THREE.Texture;
  hoverTexture: THREE.Texture;
  shapeTexture: THREE.Texture;

  geometry: THREE.PlaneGeometry;
  material: THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;

  sizes: THREE.Vector2;
  offset: THREE.Vector2;

  gui: dat.GUI;

  constructor(
    scene: THREE.Scene,
    image: HTMLImageElement,
    vertexShader: string,
    fragmentShader: string,
    gui: dat.GUI
  ) {
    this.scene = scene;
    this.imageEl = image;
    this.fragmentShader = fragmentShader;
    this.vertexShader = vertexShader;
    this.gui = gui;
  }

  initFigure(uniforms) {
    this.loader = new THREE.TextureLoader();

    this.texture = this.loader.load(this.imageEl.src);
    this.hoverTexture = this.loader.load(
      this.imageEl.getAttribute("data-hover")
    );

    if (this.imageEl.getAttribute("data-shape") !== "") {
      this.shapeTexture = this.loader.load(
        this.imageEl.getAttribute("data-shape")
      );
    }

    this.sizes = new THREE.Vector2(0, 0);
    this.offset = new THREE.Vector2(0, 0);

    this.getSizes();

    this.createMesh(uniforms);
  }

  getSizes() {
    const { width, height, top, left } = this.imageEl.getBoundingClientRect();

    this.sizes.set(width, height);
    this.offset.set(
      left - window.innerWidth / 2 + width / 2,
      -top + window.innerHeight / 2 - height / 2
    );
  }

  createMesh(uniforms) {
    if (!uniforms) return;

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    const newUniforms = {
      ...uniforms,
      uImage: { value: this.texture },
      uImageHover: { value: this.hoverTexture },
      uImageShape: { value: this.shapeTexture },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: newUniforms,
      vertexShader: vertexShader,
      fragmentShader: this.fragmentShader,
      defines: {
        PR: window.devicePixelRatio.toFixed(1),
      },
    });

    // this.material = new THREE.MeshBasicMaterial({
    //   map: this.texture,
    // });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

    this.scene.add(this.mesh);
  }
}
