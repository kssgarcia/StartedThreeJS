import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

let isAndroid = false;
if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isAndroid = true;
}

let canvas, scene, camera;
let clock;
let renderer, effectcomposer;

let size_sphere = 0.8;
if (isAndroid === true) {
  size_sphere = 0.6;
}
let current = 0;

class HeroThree {
  constructor() {
    canvas = document.querySelector("canvas.webgl");
    scene = new THREE.Scene();

    //Objects
    this.Plane();
    this.Resize();
    this.Settings();
    this.PostProcessing();
    clock = new THREE.Clock();
    this.Tick();
  }

  rand(a, b) {
    return a + (b - a) * Math.random();
  }

  Plane() {
    const materialPlane = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms:
        {
            uFrequency: { value: new THREE.Vector2(10, 5) },
            uTime: { value: 0 },
            uColor: { value: new THREE.Color('orange') },
        }
    })
    const geometraPlane = new THREE.PlaneGeometry(1, 1, 64, 64)
    const mesh = new THREE.Mesh(geometraPlane, materialPlane)
    mesh.position.set(0, 0, 0);
    scene.add(mesh)
  }

  Resize() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    window.addEventListener('resize', () => {
      // Update sizes
      this.sizes.width = window.innerWidth
      this.sizes.height = window.innerHeight

      // Update camera
      camera.aspect = this.sizes.width / this.sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(this.sizes.width, this.sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Update Composer
      effectcomposer.setSize(this.sizes.width, this.sizes.height);
      effectcomposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    })
  }

  Settings() {
    camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);     
    camera.position.set(0, 0, 2);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    })
    renderer.setSize(this.sizes.width, this.sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.controls = new OrbitControls( camera, renderer.domElement );
    this.controls.update();

  }

  Tick() {
    const elapsedTime = clock.getElapsedTime();

    // Update Post-processing
    effectcomposer.render();

    // Call Tick again on the next frame
    window.requestAnimationFrame(this.Tick.bind(this));
    this.controls.update();
  }

  PostProcessing() {
    const renderTarget = new THREE.WebGLRenderTarget(
      this.sizes.width,
      this.sizes.height,
      {
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
        stencilBuffer: false,
        type: THREE.FloatType,
      }
    );

    const renderScene = new RenderPass(scene, camera);
    // EffectComposer
    effectcomposer = new EffectComposer(renderer, renderTarget);
    effectcomposer.setSize(this.sizes.width, this.sizes.height);
    effectcomposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    effectcomposer.addPass(renderScene);
  }
}

new HeroThree();