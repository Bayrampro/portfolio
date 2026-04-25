import * as THREE from "./assets/vendor/three/build/three.module.js?v=1";
import { OrbitControls } from "./assets/vendor/three/examples/jsm/controls/OrbitControls.js?v=1";
import { GLTFLoader } from "./assets/vendor/three/examples/jsm/loaders/GLTFLoader.js?v=1";

const canvas = document.getElementById("pcModelCanvas");
const loaderEl = document.getElementById("pcModelLoader");
const section = document.getElementById("pc-setup");

if (!canvas || !section) {
  // Section is optional on pages where it may be removed.
} else {
  globalThis.__pcModelBooted = true;
  let started = false;

  const startModel = () => {
    if (started) return;
    started = true;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);
    camera.position.set(20, 4, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement;
      if (!clientWidth || !clientHeight) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x101010, 1.0);
    scene.add(hemisphereLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(8, 10, 6);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-8, 10, 4);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.25;
    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0.25, -2.25, -1.5);

    canvas.addEventListener("pointerdown", () => {
      canvas.style.cursor = "grabbing";
    });
    canvas.addEventListener("pointerup", () => {
      canvas.style.cursor = "grab";
    });
    canvas.addEventListener("pointerleave", () => {
      canvas.style.cursor = "grab";
    });

    const manager = new THREE.LoadingManager();
    manager.onProgress = (_, loaded, total) => {
      if (!loaderEl) return;
      const progress = total ? Math.round((loaded / total) * 100) : 0;
      loaderEl.textContent = `Loading 3D model... ${progress}%`;
    };
    manager.onLoad = () => {};

    const gltfLoader = new GLTFLoader(manager);
    gltfLoader.load(
      "assets/models/gaming_desktop_pc/scene.gltf?v=1",
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0.25, -2.25, -1.5);
        model.rotation.set(0.01, -0.15, -0.1);
        scene.add(model);
        globalThis.__pcModelLoaded = true;
        loaderEl?.classList.add("hidden");
      },
      undefined,
      (error) => {
        if (loaderEl) {
          const status = error?.target?.status;
          loaderEl.textContent = status
            ? `Failed to load 3D model (HTTP ${status})`
            : "Failed to load 3D model";
        }
      }
    );

    // Safety fallback: don't block the whole section forever if one asset stalls.
    setTimeout(() => {
      if (loaderEl && !loaderEl.classList.contains("hidden")) {
        loaderEl.textContent = "Loading takes longer than usual...";
      }
    }, 10000);

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startModel();
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    io.observe(section);
  } else {
    startModel();
  }
}
