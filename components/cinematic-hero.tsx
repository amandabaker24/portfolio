"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoddardRobot } from "@/components/goddard-robot";
import { journeyDuration, noriScreens } from "@/components/project-journey";

type ScreenFeature = "menoviq" | "dashboard" | "calendar";

const screenAspects: Record<ScreenFeature, number> = {
  menoviq: 3022 / 1606,
  dashboard: 2936 / 1588,
  calendar: 2940 / 1596,
};

const featurePanels: { id: ScreenFeature; label: string; position: [number, number, number] }[] = [
  { id: "menoviq", label: "Menoviq website studio", position: [-2.8, 1.8, 0.5] },
  { id: "dashboard", label: "Care dashboard", position: [2.75, 0.55, 0.95] },
  { id: "calendar", label: "Health calendar", position: [-2.55, -1.9, 1.5] },
];

function makeScreenTexture(feature?: ScreenFeature, compact = false) {
  const canvas = document.createElement("canvas");
  const resolutionScale = feature ? (compact ? 1 : 2) : (compact ? 2 : 3);
  const logicalWidth = feature ? 1200 : 600;
  const logicalHeight = feature ? logicalWidth / screenAspects[feature] : logicalWidth / noriScreens.aspect;
  canvas.width = logicalWidth * resolutionScale;
  canvas.height = logicalHeight * resolutionScale;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.scale(resolutionScale, resolutionScale);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = compact ? 4 : 8;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  if (!feature) {
    context.fillStyle = "#183f34";
    context.fillRect(0, 0, logicalWidth, logicalHeight);
    const image = new Image();
    image.onload = () => {
      const scale = Math.max(logicalWidth / image.width, logicalHeight / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      context.drawImage(image, (logicalWidth - width) / 2, (logicalHeight - height) / 2, width, height);
      texture.needsUpdate = true;
    };
    image.src = noriScreens.profile;
    return texture;
  }

  context.fillStyle = "#f4f7ff";
  context.fillRect(0, 0, logicalWidth, logicalHeight);
  const imageSources = feature
    ? [feature === "menoviq" ? "/menoviq/website-builder.png" : feature === "calendar" ? "/quantummed/health-calendar-hq.png" : "/quantummed/dashboard-hq.png"]
    : [];

  imageSources.forEach((source, index) => {
    const currentFeature = feature;
    if (!currentFeature) return;
    const image = new Image();
    image.onload = () => {
      const fitScale = Math.min(logicalWidth / image.width, logicalHeight / image.height);
      const fittedWidth = image.width * fitScale;
      const fittedHeight = image.height * fitScale;
      const offsetX = (logicalWidth - fittedWidth) / 2;
      const offsetY = (logicalHeight - fittedHeight) / 2;

      context.fillStyle = "#ffffff";
      context.beginPath();
      context.roundRect(0, 0, logicalWidth, logicalHeight, 14);
      context.fill();
      context.save();
      context.beginPath();
      context.roundRect(0, 0, logicalWidth, logicalHeight, 14);
      context.clip();
      context.drawImage(image, offsetX, offsetY, fittedWidth, fittedHeight);
      context.restore();
      texture.needsUpdate = true;
    };
    image.src = source;
  });

  return texture;
}

function CameraDetails() {
  return (
    <group position={[-0.67, 1.63, -0.18]}>
      <RoundedBox args={[0.78, 0.84, 0.14]} radius={0.14} smoothness={5}>
        <meshPhysicalMaterial color="#343735" metalness={0.7} roughness={0.24} />
      </RoundedBox>
      {[-0.2, 0.2].map((x) =>
        [-0.2, 0.2].map((y) => (
          <mesh key={`${x}-${y}`} position={[x, y, -0.095]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.105, 0.105, 0.045, 32]} />
            <meshPhysicalMaterial color="#101311" metalness={0.8} roughness={0.12} clearcoat={1} />
          </mesh>
        )),
      )}
    </group>
  );
}

function PhoneFrame({ materialRef }: { materialRef: React.RefObject<THREE.MeshPhysicalMaterial | null> }) {
  return (
    <group>
      <RoundedBox args={[2.3, 4.8, 0.3]} radius={0.27} smoothness={8} castShadow receiveShadow>
        <meshPhysicalMaterial
          ref={materialRef}
          color="#aaa69e"
          metalness={0.94}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.14}
        />
      </RoundedBox>
      <RoundedBox position={[0, 0, 0.153]} args={[2.2, 4.69, 0.035]} radius={0.245} smoothness={8}>
        <meshStandardMaterial color="#111312" metalness={0.25} roughness={0.2} />
      </RoundedBox>
      <RoundedBox position={[-1.16, 0.82, 0]} args={[0.075, 0.55, 0.11]} radius={0.035} smoothness={4}>
        <meshStandardMaterial color="#8d8a84" metalness={0.88} roughness={0.22} />
      </RoundedBox>
      <RoundedBox position={[-1.16, 0.08, 0]} args={[0.075, 0.32, 0.11]} radius={0.035} smoothness={4}>
        <meshStandardMaterial color="#8d8a84" metalness={0.88} roughness={0.22} />
      </RoundedBox>
      <RoundedBox position={[1.16, 0.55, 0]} args={[0.075, 0.75, 0.11]} radius={0.035} smoothness={4}>
        <meshStandardMaterial color="#8d8a84" metalness={0.88} roughness={0.22} />
      </RoundedBox>
      <group position={[0, 0, -0.16]}>
        <RoundedBox args={[0.82, 0.88, 0.1]} radius={0.16} smoothness={6}>
          <meshStandardMaterial color="#242724" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        <CameraDetails />
      </group>
    </group>
  );
}

function MainDisplay({ displayRef, compact }: { displayRef: React.RefObject<THREE.Group | null>; compact: boolean }) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    const texture = makeScreenTexture(undefined, compact);
    if (!texture || !materialRef.current) return;
    materialRef.current.map = texture;
    materialRef.current.needsUpdate = true;
    return () => texture.dispose();
  }, [compact]);

  return (
    <group ref={displayRef} position={[0, 0, 0.178]}>
      <RoundedBox args={[2.08, 4.55, 0.025]} radius={0.21} smoothness={8}>
        <meshPhysicalMaterial color="#101211" metalness={0.12} roughness={0.08} clearcoat={1} clearcoatRoughness={0.06} />
      </RoundedBox>
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[2.02, 2.02 / noriScreens.aspect]} />
        <meshBasicMaterial ref={materialRef} toneMapped={false} />
      </mesh>

    </group>
  );
}

function FeaturePanel({
  panelRef,
  materialsRef,
  index,
  feature,
  compact,
}: {
  compact: boolean;
  panelRef: (node: THREE.Group | null) => void;
  materialsRef: React.RefObject<(THREE.MeshBasicMaterial | null)[]>;
  index: number;
  feature: (typeof featurePanels)[number];
}) {
  const screenRef = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    const texture = makeScreenTexture(feature.id, compact);
    if (!texture || !screenRef.current) return;
    screenRef.current.map = texture;
    screenRef.current.needsUpdate = true;
    return () => texture.dispose();
  }, [feature.id, compact]);

  return (
    <group ref={panelRef} position={[0, 0, 0.22]} scale={0.01}>
      <RoundedBox args={[3, 2.91 / screenAspects[feature.id] + 0.09, 0.055]} radius={0.18} smoothness={6}>
        <meshPhysicalMaterial color="#b4b1a9" metalness={0.7} roughness={0.24} />
      </RoundedBox>
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[2.91, 2.91 / screenAspects[feature.id]]} />
        <meshBasicMaterial
          ref={(material) => {
            screenRef.current = material;
            materialsRef.current[index] = material;
          }}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function PhoneScene() {
  const { camera, size, gl, scene, setDpr, invalidate } = useThree();
  const compact = size.width <= 640;
  const perspectiveCamera = camera as THREE.PerspectiveCamera;
  const phoneRef = useRef<THREE.Group>(null);
  const displayRef = useRef<THREE.Group>(null);
  const dogRef = useRef<THREE.Group>(null);
  const hardwareRef = useRef<THREE.Group>(null);
  const frameMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const panelRefs = useRef<(THREE.Group | null)[]>([]);
  const panelMaterialRefs = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const isScrubbing = useRef(false);
  const renderJourneyRef = useRef<(() => void) | null>(null);
  const phoneBaseY = size.width < 980 ? -1.4 : 0;

  useEffect(() => {
    // Keep the phone sharp without rendering a desktop-sized shadow pass and
    // high-DPI framebuffer on a small touch screen.
    setDpr(Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.75));
    gl.shadowMap.enabled = !compact;
    gl.shadowMap.needsUpdate = true;
    let cancelled = false;
    const warmShaders = () => {
      if (!cancelled) void gl.compileAsync(scene, camera).catch(() => undefined);
    };
    const idle = typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback(warmShaders, { timeout: 1200 }) : undefined;
    const timer = idle === undefined ? window.setTimeout(warmShaders, 250) : undefined;
    return () => {
      cancelled = true;
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [camera, compact, gl, scene, setDpr]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const journey = document.querySelector<HTMLElement>(".hero-journey");
    if (!journey || !phoneRef.current || !displayRef.current || !frameMaterialRef.current) return;
    const phone = phoneRef.current;
    const display = displayRef.current;
    const frameMaterial = frameMaterialRef.current;
    const dashboard = panelRefs.current[1];
    const menoviq = panelRefs.current[0];
    if (!dashboard || !menoviq) return;
    const mobile = compact;
    ScrollTrigger.config({ ignoreMobileResize: true });
    const deviceParts = [hardwareRef.current, ...panelRefs.current].filter((part): part is THREE.Group => Boolean(part));
    const deviceMaterials = new Map<THREE.Material, { opacity: number; transparent: boolean }>();
    deviceParts.forEach((part) => part.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material: THREE.Material) => {
        if (!deviceMaterials.has(material)) {
          deviceMaterials.set(material, { opacity: material.opacity, transparent: material.transparent });
          // Compile one mobile material variant up front, rather than switching
          // shader programs midway through the final fade.
          if (mobile && !material.transparent) {
            material.transparent = true;
            material.needsUpdate = true;
          }
        }
      });
    }));
    let previousDeviceFade = 0;
    // Frame a portrait phone against the viewport, rather than using desktop distance.
    const assemblyDistance = mobile ? 7.4 : 10.1;
    const cameraStart = new THREE.Vector3(0, 0, assemblyDistance);
    const screenCenter = new THREE.Vector3();
    const screenRotation = new THREE.Quaternion();
    const screenScale = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3();
    const screenNormal = new THREE.Vector3();
    const neutralRotation = new THREE.Quaternion();
    const dogLocalBounds = new THREE.Box3(new THREE.Vector3(-1.85, -1.06, -0.55), new THREE.Vector3(1.4, 2.05, 1.1));
    const dogBounds = new THREE.Box3();
    const dogCenter = new THREE.Vector3();
    const dogSize = new THREE.Vector3();
    const dogCameraTarget = new THREE.Vector3();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Follow the selected panel, including its parent phone's transform.
    // The final distance crops the screen to fill the viewport on any aspect ratio.
    const updateProjectCamera = (quantumProgress: number, menoviqProgress: number, noriProgress: number) => {
      const panel = noriProgress > 0 ? display : menoviqProgress > 0 ? menoviq : dashboard;
      const screenWidth = noriProgress > 0 ? 2.02 : 2.91;
      const screenHeight = noriProgress > 0 ? 2.02 / noriScreens.aspect
        : 2.91 / screenAspects[menoviqProgress > 0 ? "menoviq" : "dashboard"];
      panel.updateWorldMatrix(true, false);
      panel.getWorldQuaternion(screenRotation);
      panel.getWorldScale(screenScale);
      screenCenter.set(0, 0, noriProgress > 0 ? 0.015 : 0.032);
      panel.localToWorld(screenCenter);
      const halfFov = THREE.MathUtils.degToRad(perspectiveCamera.fov / 2);
      const distance = Math.min(
        (screenWidth * screenScale.x) / (2 * Math.tan(halfFov) * perspectiveCamera.aspect),
        (screenHeight * screenScale.y) / (2 * Math.tan(halfFov)),
      );
      screenNormal.set(0, 0, 1).applyQuaternion(screenRotation);
      cameraTarget.copy(screenCenter).addScaledVector(screenNormal, distance);
      const progress = reducedMotion ? 0 : Math.max(quantumProgress, menoviqProgress, noriProgress);
      perspectiveCamera.position.lerpVectors(cameraStart, cameraTarget, progress);
      perspectiveCamera.quaternion.slerpQuaternions(neutralRotation, screenRotation, progress);
    };

    const updateDogCamera = (progress: number) => {
      const dog = dogRef.current;
      if (!dog || progress <= 0) return;
      dog.updateWorldMatrix(true, false);
      dogBounds.copy(dogLocalBounds).applyMatrix4(dog.matrixWorld);
      dogBounds.getCenter(dogCenter);
      dogBounds.getSize(dogSize);
      const tangent = Math.tan(THREE.MathUtils.degToRad(perspectiveCamera.fov / 2));
      // Reserve space beside the model on desktop and beneath it on mobile.
      const distance = Math.max(
        dogSize.x / (2 * tangent * perspectiveCamera.aspect * (mobile ? 0.65 : 0.42)),
        dogSize.y / (2 * tangent * (mobile ? 0.38 : 0.65)),
      ) + dogSize.z * 0.15;
      const viewHeight = distance * 2 * tangent;
      dogCameraTarget.copy(dogCenter);
      dogCameraTarget.x -= mobile ? 0 : viewHeight * perspectiveCamera.aspect * 0.18;
      dogCameraTarget.y -= mobile ? viewHeight * 0.23 : 0;
      dogCameraTarget.z += distance;
      const amount = reducedMotion ? Number(progress > 0.5) : progress;
      perspectiveCamera.position.lerpVectors(cameraStart, dogCameraTarget, amount);
      perspectiveCamera.quaternion.identity();
    };

    const clamp = (value: number) => THREE.MathUtils.clamp(value, 0, 1);
    const ease = gsap.parseEase(mobile ? "sine.inOut" : "power2.inOut");
    const portalElements = ["quantummed", "menoviq", "nori", "goddard"].map((project) =>
      journey.querySelector<HTMLElement>(`.dashboard-portal-${project}`),
    );
    const mobileShortcuts = journey.querySelector<HTMLElement>(".mobile-project-screens");
    const initialStyles = [...portalElements, mobileShortcuts].filter((element): element is HTMLElement => Boolean(element))
      .map((element) => ({ element, cssText: element.style.cssText }));
    const portalOpacities = portalElements.map(() => -1);
    const renderPortal = (index: number, time: number, entry: number, morphEntry: number, exit = Infinity) => {
      const overlay = portalElements[index];
      if (!overlay) return;
      const opacity = ease(clamp((time - entry) / (mobile ? 0.16 : 0.1))) * (1 - ease(clamp((time - exit - 0.29) / (mobile ? 0.16 : 0.1))));
      // Hidden projects do not need layout variables rewritten on every frame.
      if (opacity === 0 && portalOpacities[index] === 0) return;
      portalOpacities[index] = opacity;
      const arrival = ease(clamp((time - morphEntry) / (mobile ? 0.36 : 0.28)));
      const departure = ease(clamp((time - exit) / 0.28));
      const morph = reducedMotion ? 1 : arrival * (1 - departure);
      const reveal = ease(clamp((time - morphEntry - 0.14) / (mobile ? 0.22 : 0.18))) * (1 - ease(clamp((time - exit) / 0.12)));
      overlay.style.opacity = String(opacity);
      overlay.style.visibility = opacity > 0 ? "visible" : "hidden";
      overlay.style.pointerEvents = opacity === 1 && reveal > 0.95 ? "auto" : "none";
      overlay.style.setProperty("--portal-morph", String(morph));
      overlay.style.setProperty("--project-reveal", String(reveal));
    };

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: mobile ? "sine.inOut" : "power1.out" },
        // Demand rendering sleeps while visitors read; scrolling requests frames.
        onUpdate: () => invalidate(),
        scrollTrigger: {
          trigger: journey,
          start: "top top",
          end: "bottom bottom",
          scrub: mobile ? 0.6 : 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Keep the endpoint still; reversing the scroll retraces the same shot.
            isScrubbing.current = self.progress > 0;
          },
        },
      });

      let previousTime = -1;
      renderJourneyRef.current = () => {
        const time = timeline.time();
        if (time === previousTime) return;
        previousTime = time;
        renderPortal(0, time, 1.84, 1.94, 2.75);
        renderPortal(1, time, 4.42, 4.52, 5.35);
        renderPortal(2, time, 7.02, 7.12, 7.95);
        renderPortal(3, time, mobile ? 9.47 : 9.35, mobile ? 9.54 : 9.42);
        const quantumProgress = ease(clamp((time - 1.32) / 0.6)) * (1 - ease(clamp((time - 3.06) / 0.6)));
        const menoviqProgress = ease(clamp((time - 3.9) / 0.6)) * (1 - ease(clamp((time - 5.66) / 0.6)));
        const noriProgress = ease(clamp((time - 6.5) / 0.6)) * (1 - ease(clamp((time - 8.26) / 0.6)));
        const goddardProgress = ease(clamp((time - (mobile ? 9.22 : 9.1)) / 0.65));
        // As the camera leaves the phone, let the surrounding interfaces fade
        // into the studio so the fourth reveal belongs to the dog.
        const deviceFade = ease(clamp((goddardProgress - 0.15) / 0.7));
        if (deviceFade > 0 || previousDeviceFade > 0) {
          deviceParts.forEach((part) => { part.visible = deviceFade < 0.999; });
          deviceMaterials.forEach((original, material) => {
            material.opacity = 1 - deviceFade;
            const transparent = mobile || deviceFade > 0 || original.transparent;
            if (material.transparent !== transparent) {
              material.transparent = transparent;
              material.needsUpdate = true;
            }
          });
        }
        previousDeviceFade = deviceFade;
        if (mobileShortcuts && mobile) mobileShortcuts.style.visibility = time > 0.76 && goddardProgress < 0.15 ? "visible" : "hidden";
        // On mobile, save Goddard's entrance for the final return from Nori.
        // Let the phone settle before the dog emerges and the camera follows.
        const entranceStart = mobile ? 8.86 : 0.8;
        const entranceDuration = mobile ? 0.28 : 0.36;
        const entrance = reducedMotion
          ? Number(time >= (mobile ? 9.14 : 1.02))
          : ease(clamp((time - entranceStart) / entranceDuration));
        const focus = Math.max(quantumProgress, menoviqProgress, noriProgress);
        const emergence = entrance * (1 - ease(clamp(focus / 0.35)));
        const dog = dogRef.current;
        if (dog) {
          dog.visible = emergence > 0.005;
          dog.scale.setScalar((mobile ? 0.8 : 0.78) * emergence);
          // Clear the device silhouette: beside it on desktop, below on mobile.
          dog.position.set(
            THREE.MathUtils.lerp(0.45, mobile ? 0.15 : 3.5, emergence),
            THREE.MathUtils.lerp(-0.72, mobile ? -4.25 : -1.95, emergence),
            THREE.MathUtils.lerp(-0.3, 0.85, emergence),
          );
          dog.rotation.set(THREE.MathUtils.lerp(-0.35, 0.08, emergence), -0.35, -0.05);
        }
        if (time >= 1.18) {
          updateProjectCamera(quantumProgress, menoviqProgress, noriProgress);
          updateDogCamera(goddardProgress);
        } else {
          perspectiveCamera.quaternion.identity();
        }
      };

      if (mobile) {
        // Keep the phone and its screens large through the first three projects.
        // Only make room below the device when Goddard's final entrance begins.
        timeline
          .to(".hero-copy", { opacity: 0, y: -24, duration: 0.12 }, 0.03)
          .to(phone.position, { x: 0, y: -0.12, duration: 0.2 }, 0.03)
          .to(phone.rotation, { x: 0, y: 0, z: 0, duration: 0.2 }, 0.03)
          .to(phone.scale, { x: 0.9, y: 0.9, z: 0.9, duration: 0.22 }, 0.03)
          .to(perspectiveCamera.position, { z: 8, duration: 0.22 }, 0.03)
          .to(phone.rotation, { y: reducedMotion ? 0 : Math.PI * 2, duration: 0.34, ease: "sine.inOut" }, 0.24)
          .to(display.position, { z: 0.55, duration: 0.25 }, 0.57)
          .to(phone.position, { x: 0, y: -0.05, duration: 0.4 }, 0.65)
          .to(phone.rotation, { x: 0.03, y: (reducedMotion ? 0 : Math.PI * 2) + 0.08, z: -0.025, duration: 0.4 }, 0.65)
          .to(phone.scale, { x: 0.65, y: 0.65, z: 0.65, duration: 0.4 }, 0.65)
          .to(perspectiveCamera.position, { z: assemblyDistance, duration: 0.4 }, 0.65)
          .to(phone.position, { y: 0.65, duration: 0.28 }, 8.86)
          .to(phone.scale, { x: 0.42, y: 0.42, z: 0.42, duration: 0.28 }, 8.86)
          .to(".hero-scroll-cue", { autoAlpha: 0, duration: 0.1 }, 0.03)
          .fromTo(".mobile-project-screens", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.18 }, 0.76);
      } else {
        timeline
          .to(perspectiveCamera.position, { z: 7.7, duration: 0.2 }, 0.06)
          .to(perspectiveCamera.position, { z: 8.5, duration: 0.2 }, 0.22)
          .to(phone.position, { x: 0, duration: 0.2 }, 0.2)
          .to(phone.rotation, { y: -0.04, x: -0.02, z: 0, duration: 0.2 }, 0.12)
          .to(".hero-copy", { opacity: 0, x: -70, duration: 0.18 }, 0.17)
          .to(phone.rotation, { y: Math.PI * 2, x: 0.04, z: 0, duration: 0.34, ease: "none" }, 0.24)
          .to(display.position, { z: 1.05, duration: 0.18 }, 0.55)
          .to(phone.scale, { x: 0.86, y: 0.86, z: 0.86, duration: 0.25 }, 0.58)
          .to(perspectiveCamera.position, { z: 9.5, duration: 0.35 }, 0.55)
          .to(phone.rotation, { y: Math.PI * 2 + 0.12, x: 0.08, z: -0.04, duration: 0.08 }, 0.58)
          .to(frameMaterial, { roughness: 0.27, duration: 0.2 }, 0.75)
          .to(phone.position, { x: -0.25, y: 0, duration: 0.4 }, 0.6)
          .to(perspectiveCamera.position, { z: 10.1, duration: 0.4 }, 0.78)
          .to(phone.rotation, { y: Math.PI * 2 + 0.38, x: 0.16, z: -0.06, duration: 0.4 }, 0.78)
          .to(phone.scale, { x: 0.68, y: 0.68, z: 0.68, duration: 0.4 }, 0.78)
          .to(".hero-scroll-cue", { autoAlpha: 0, duration: 0.12 }, 0.65);
      }

      featurePanels.forEach((feature, index) => {
        const panel = panelRefs.current[index];
        const material = panelMaterialRefs.current[index];
        if (!panel || !material) return;

        const mobilePositions = [[-0.55, 1.85, 0.85], [0.55, 0.1, 0.85], [-0.6, -1.8, 0.85]];
        const position = mobile ? mobilePositions[index] : feature.position;
        const panelScale = mobile ? 0.5 : 1;
        timeline
          .to(panel.scale, { x: panelScale, y: panelScale, z: panelScale, duration: 0.18 }, 0.58)
          .to(panel.position, { x: position[0], y: position[1], z: position[2], duration: 0.4 }, 0.62)
          .to(panel.rotation, { y: (index % 2 ? -1 : 1) * 0.18, x: index % 2 ? 0.12 : -0.1, duration: 0.3 }, 0.62)
          .to(material, { opacity: 1, duration: 0.08 }, 0.6);

        if (mobile) {
          const finalPositions = [[-1.15, 1.55, 0.85], [1, 0.1, 0.85], [-1.15, -1.45, 0.85]];
          const finalPosition = finalPositions[index];
          timeline
            .to(panel.position, { x: finalPosition[0], y: finalPosition[1], z: finalPosition[2], duration: 0.28 }, 8.86)
            .to(panel.scale, { x: 0.56, y: 0.56, z: 0.56, duration: 0.28 }, 8.86);
        }
      });

      // Reserve scroll for all four projects, including the final phone-to-dog shot.
      timeline.to({}, { duration: journeyDuration - 1.18 }, 1.18);
    }, journey);

    return () => {
      renderJourneyRef.current = null;
      context.revert();
      deviceParts.forEach((part) => { part.visible = true; });
      deviceMaterials.forEach((original, material) => {
        material.opacity = original.opacity;
        if (material.transparent !== original.transparent) {
          material.transparent = original.transparent;
          material.needsUpdate = true;
        }
      });
      initialStyles.forEach(({ element, cssText }) => { element.style.cssText = cssText; });
      perspectiveCamera.quaternion.identity();
    };
  }, [compact, invalidate, perspectiveCamera, size.width, size.height]);

  useFrame((state, delta) => {
    renderJourneyRef.current?.();
    if (!phoneRef.current || isScrubbing.current) return;
    phoneRef.current.rotation.y += delta * 0.035;
    phoneRef.current.position.y = phoneBaseY + Math.sin(state.clock.elapsedTime * 0.55) * 0.035;
    phoneRef.current.rotation.x = THREE.MathUtils.lerp(phoneRef.current.rotation.x, -0.05 + state.pointer.y * 0.025, 0.025);
    invalidate();
  });

  return (
    <>
      <color attach="background" args={["#0d0e0d"]} />
      <Environment preset="studio" resolution={256} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 5, 6]} intensity={3.5} color="#fff5e8" castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[5, 1, 4]} intensity={2.2} color="#c7d7e8" />
      <spotLight position={[0, 6, 2]} intensity={35} angle={0.55} penumbra={0.8} color="#ead8c2" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.55, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial transparent opacity={0.36} />
      </mesh>

      <group
        ref={phoneRef}
        position={size.width < 980 ? [0.05, -1.4, 0] : [1.7, 0, 0]}
        scale={size.width < 640 ? 0.56 : size.width < 980 ? 0.64 : 1}
        rotation={[-0.06, -0.3, 0.035]}
      >
        <group ref={hardwareRef}>
          <PhoneFrame materialRef={frameMaterialRef} />
          <MainDisplay displayRef={displayRef} compact={compact} />
        </group>
        <group ref={dogRef} visible={false} scale={0.001}>
          <GoddardRobot />
        </group>
        {featurePanels.map((feature, index) => (
          <FeaturePanel
            key={feature.id}
            feature={feature}
            compact={compact}
            index={index}
            materialsRef={panelMaterialRefs}
            panelRef={(node) => {
              panelRefs.current[index] = node;
            }}
          />
        ))}
      </group>
    </>
  );
}

export function CinematicHero() {
  return (
    <div className="cinematic-hero-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10.8], fov: 34 }}
        dpr={[1, 1.75]}
        frameloop="demand"
        resize={{ scroll: false, debounce: { resize: 150, scroll: 0 } }}
        shadows
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
      >
        <PhoneScene />
      </Canvas>
    </div>
  );
}
