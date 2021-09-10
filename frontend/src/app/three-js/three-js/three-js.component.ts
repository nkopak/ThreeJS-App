import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { StateService, ThreeJsService } from 'src/app/shared';
import * as THREE from 'three';

import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { generateUUID } from 'three/src/math/MathUtils';
import { data } from './data';

@Component({
  selector: 'app-three-js',
  templateUrl: './three-js.component.html',
  styleUrls: ['./three-js.component.scss'],
  providers: [ThreeJsService]
})
export class ThreeJsComponent implements OnInit {

  constructor(private threeJs: ThreeJsService, private stateService: StateService) { }
  @ViewChild('container', { static: true, read: ElementRef })
  private container!: ElementRef<HTMLDivElement>;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private textureFlare0!: THREE.Texture;
  private textureFlare3!: THREE.Texture;
  private renderer!: THREE.WebGLRenderer;
  private controls!: FlyControls;
  private clock = new THREE.Clock();
  private state: any = {};
  private $toggleSave = new Subject();

  ngOnInit(): void {
    this.$toggleSave.pipe(
      debounceTime(500),
      switchMap(() => this.stateService.saveState(this.state)))
      .subscribe(state => localStorage.setItem('stateId', this.state.id))

    const stateId = localStorage.getItem('stateId');
    if (!stateId) {
      this.start();
      return;
    }

    this.stateService.getState(stateId).subscribe(state => {
      this.state = state;
      this.start(state);
    })
  }

  private start(state?: any) {
    this.init();
    this.threeJs.animate(() => this.render(), () => this.resize());
  }

  private init() {
    this.initCamera();
    this.initScene();
    this.initWorld();
    this.initLights();
    this.initRender();
    this.initControls();
  }


  private initCamera() {
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 20000);
    this.camera.position.z = 15000;

    if (this.state && this.state.position && this.state.rotation) {
      this.camera.position.fromArray(this.state.position);
      this.camera.rotation.fromArray(this.state.rotation);
    }
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.04);
    this.scene.fog = new THREE.Fog(this.scene.background, 3500, 20000);
  }

  private initWorld() {
    const s = 100;

    const geometry = new THREE.SphereGeometry(s);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, shininess: 1000 });
    data.forEach(d => {
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.fromArray(d);
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      this.scene.add(mesh);
    })
  }

  private initLights() {
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.05);
    dirLight.position.set(0, - 1, 0).normalize();
    dirLight.color.setHSL(0.1, 0.7, 0.5);
    this.scene.add(dirLight);

    const textureLoader = new THREE.TextureLoader();

    this.textureFlare0 = textureLoader.load('assets/textures/lensflare0.png');
    this.textureFlare3 = textureLoader.load('assets/textures/lensflare3.png');

    this.addLight(0.55, 0.9, 0.5, 5000, 0, - 1000);
    this.addLight(0.08, 0.8, 0.5, 0, 0, - 1000);
    this.addLight(0.995, 0.5, 0.9, 5000, 5000, - 1000);
    this.addLight(0.335, 0.5, 0.9, 0, 5000, - 1000);
    this.addLight(0.5, 0.5, 0.75, -5618, -2827, -35);
    this.addLight(0, 0.5, 0.75, 6037, -3788, -5226);
    this.addLight(0.7, 0.57, 0.69, 4627, 6101, -4390);
    this.addLight(0.8, 0.73, 0.22, -1262, -4537, 4346);
    this.addLight(0.05, 0.8, 0.6, 6646, -3924, 4148);
    this.addLight(0.2, 1, 0.5, -5659, 1771, -6413);
    this.addLight(0.3, 0.33, 0.81, -6437, 2852., -621);
  }

  private initRender() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.nativeElement.appendChild(this.renderer.domElement);
  }

  private initControls() {
    this.controls = new FlyControls(this.camera, this.renderer.domElement);
    this.controls.movementSpeed = 2500;
    this.controls.domElement = this.container.nativeElement;
    this.controls.rollSpeed = Math.PI / 6;
    this.controls.autoForward = false;
    this.controls.dragToLook = true;
  }
  private addLight(h: number, s: number, l: number, x: number, y: number, z: number) {

    const light = new THREE.PointLight(0xffffff, 1.5, 2000);
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    this.scene.add(light);

    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(this.textureFlare0, 700, 0, light.color));
    lensflare.addElement(new LensflareElement(this.textureFlare3, 60, 0.6));
    lensflare.addElement(new LensflareElement(this.textureFlare3, 70, 0.7));
    lensflare.addElement(new LensflareElement(this.textureFlare3, 120, 0.9));
    lensflare.addElement(new LensflareElement(this.textureFlare3, 70, 1));
    light.add(lensflare);

  }

  private render() {
    const delta = this.clock.getDelta();

    this.controls.update(delta);
    this.renderer.render(this.scene, this.camera);
    Object.assign(this.state, { position: this.camera.position.toArray(), rotation: this.camera.rotation.toArray() });
  }

  private resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  @HostListener('window:keyup', ['$event'])
  @HostListener('mouseup', ['$event'])
  onKeyUp(event: any) {
    if (!this.state.id) {
      this.state.id = generateUUID();
    }

    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
      case 'ArrowLeft':
      case 'KeyA':
      case 'ArrowDown':
      case 'KeyS':
      case 'ArrowRight':
      case 'KeyD':
      case 'KeyQ':
      case 'KeyE':
        this.saveState();
        return;
    }

    switch (event.button) {
      case 0:
      case 2:
        this.saveState();
        break;
    }
  }

  private saveState() {
    this.$toggleSave.next();
  }

}

