"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export default function BrandScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0xffffff, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 11);
    const environment = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(renderer);
    const environmentMap = generator.fromScene(environment, 0.04);
    scene.environment = environmentMap.texture;
    environment.dispose();
    generator.dispose();

    const material = new THREE.MeshPhysicalMaterial({
      color: "#ef4626", metalness: 0.42, roughness: 0.22,
      clearcoat: 1, clearcoatRoughness: 0.12,
    });
    const mark = new THREE.Group();
    const geometries: THREE.BufferGeometry[] = [];

    const addTube = (points: number[][]) => {
      const curve = new THREE.CatmullRomCurve3(points.map(([horizontal, vertical]) => new THREE.Vector3(horizontal, vertical, 0)), false, "centripetal");
      const geometry = new THREE.TubeGeometry(curve, 96, 0.17, 20, false);
      geometries.push(geometry);
      mark.add(new THREE.Mesh(geometry, material));
    };
    const addTerminal = (horizontal: number, vertical: number) => {
      const geometry = new THREE.TorusGeometry(0.3, 0.16, 24, 64);
      geometries.push(geometry);
      const terminal = new THREE.Mesh(geometry, material);
      terminal.position.set(horizontal, vertical, 0);
      mark.add(terminal);
    };

    addTube([[-0.3, 1.2], [-1.45, 1.2], [-1.7, 1.1], [-1.72, 0.6], [-1.55, 0.4], [-0.65, 0.4], [-0.48, 0.25], [-0.48, -1.35]]);
    addTube([[0.2, -1.25], [0.2, 0.2], [0.35, 0.4], [1.4, 0.53]]);
    addTerminal(0, 1.2);
    addTerminal(1.7, 0.55);
    addTerminal(0.2, -1.55);
    scene.add(mark);
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const light = new THREE.DirectionalLight(0xffffff, 4);
    light.position.set(-3, 5, 5);
    scene.add(light);

    const pointer = new THREE.Vector2();
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let frame = 0;
    let baseHeight = 0;
    let lastTime = 0;
    let elapsed = 0;

    const render = () => {
      renderer.render(scene, camera);
      host.dataset.ready = "true";
    };
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      const mobile = width < 768;
      const basePosition = mobile ? 0 : Math.min(camera.aspect * 1.72, 4.5);
      baseHeight = mobile ? -0.05 : -0.2;
      mark.scale.setScalar(mobile ? 1.55 : 1.23);
      mark.position.set(basePosition, baseHeight, 0);
      mark.rotation.set(-0.16, -0.3, -0.16);
      render();
    };
    const animate = (time: number) => {
      if (!visible || document.hidden || motionPreference.matches) { frame = 0; return; }
      if (time - lastTime > 30) {
        elapsed += Math.min((time - lastTime) / 1000, 0.05);
        lastTime = time;
        mark.rotation.x += (-0.15 + pointer.y * 0.16 - mark.rotation.x) * 0.055;
        mark.rotation.y += (-0.3 + Math.sin(elapsed * 0.45) * 0.18 + pointer.x * 0.3 - mark.rotation.y) * 0.055;
        mark.rotation.z = -0.16 + Math.sin(elapsed * 0.6) * 0.035;
        mark.position.y = baseHeight + Math.sin(elapsed * 0.8) * 0.1;
        render();
      }
      frame = requestAnimationFrame(animate);
    };
    const updateMotion = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (visible && !document.hidden && !motionPreference.matches) frame = requestAnimationFrame(animate);
      else render();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = host.getBoundingClientRect();
      pointer.set(
        THREE.MathUtils.clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 2, -1, 1),
        THREE.MathUtils.clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 2, -1, 1),
      );
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updateMotion(); });
    const resizeObserver = new ResizeObserver(resize);
    const onContextLost = (event: Event) => {
      event.preventDefault();
      visible = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      delete host.dataset.ready;
    };

    resize();
    resizeObserver.observe(host);
    observer.observe(host);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", updateMotion);
    motionPreference.addEventListener("change", updateMotion);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", updateMotion);
      motionPreference.removeEventListener("change", updateMotion);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      geometries.forEach((geometry) => geometry.dispose());
      material.dispose();
      environmentMap.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete host.dataset.ready;
    };
  }, []);

  return <div ref={hostRef} className="brand-scene" aria-hidden="true" />;
}