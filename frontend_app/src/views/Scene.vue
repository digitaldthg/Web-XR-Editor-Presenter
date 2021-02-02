<template>
  <div id="scene">
    <h1>3D Test Scene</h1>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  name: "Scene",
  props: {},
  methods: {
    initScene: function () {
      //Basic Scene Setup
      this.container = document.getElementById("scene");

      this.camera = new THREE.PerspectiveCamera(
        50,
        this.container.clientWidth / this.container.clientHeight,
        0.01,
        20
      );
      this.camera.position.set(0, 1, 3);
      this.scene = new THREE.Scene();

      const controls = new OrbitControls(this.camera, this.container);
      controls.target.set(0, 1, 0);
      controls.update();

      //FloorPlane
      const planeGeometry = new THREE.PlaneGeometry(20, 20, 32);
      const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        //side: THREE.DoubleSide,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.set(0, 0, 0);
      plane.rotation.x = -Math.PI / 2;
      plane.castShadow = true;
      plane.receiveShadow = true;
      this.scene.add(plane);

      //lights
      const pointLight = new THREE.PointLight(0xffffff, 5, 7);
      pointLight.position.set(0, 3, 0);
      pointLight.castShadow = true;
      pointLight.shadow.mapSize.width = 1024; // default
      pointLight.shadow.mapSize.height = 1024; // default
      pointLight.shadow.camera.near = 1; // default
      pointLight.shadow.camera.far = 1000; // default
      this.scene.add(pointLight);

      //Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
      this.container.appendChild(this.renderer.domElement);
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.initScene();
    this.animate();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#scene {
  height: 500px;
}
</style>
