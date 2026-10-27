"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

function makeScreenTexture(feature?: ScreenFeature) {
  const canvas = document.createElement("canvas");
  const resolutionScale = feature ? 2 : 3;
  const logicalWidth = feature ? 1200 : 600;
  const logicalHeight = feature ? logicalWidth / screenAspects[feature] : logicalWidth / noriScreens.aspect;
  canvas.width = logicalWidth * resolutionScale;
  canvas.height = logicalHeight * resolutionScale;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.scale(resolutionScale, resolutionScale);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
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

function MainDisplay({ displayRef }: { displayRef: React.RefObject<THREE.Group | null> }) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    const texture = makeScreenTexture();
    if (!texture || !materialRef.current) return;
    materialRef.current.map = texture;
    materialRef.current.needsUpdate = true;
    return () => texture.dispose();
  }, []);

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
}: {
  panelRef: (node: THREE.Group | null) => void;
  materialsRef: React.RefObject<(THREE.MeshBasicMaterial | null)[]>;
  index: number;
  feature: (typeof featurePanels)[number];
}) {
  const screenRef = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    const texture = makeScreenTexture(feature.id);
    if (!texture || !screenRef.current) return;
    screenRef.current.map = texture;
    screenRef.current.needsUpdate = true;
    return () => texture.dispose();
  }, [feature.id]);

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
  const { camera, size } = useThree();
  const perspectiveCamera = camera as THREE.PerspectiveCamera;
  const phoneRef = useRef<THREE.Group>(null);
  const displayRef = useRef<THREE.Group>(null);
  const frameMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const panelRefs = useRef<(THREE.Group | null)[]>([]);
  const panelMaterialRefs = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const isScrubbing = useRef(false);
  const phoneBaseY = size.width < 980 ? -1.4 : 0;

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
    const mobile = size.width <= 640;
    // Frame a portrait phone against the viewport, rather than using desktop distance.
    const assemblyDistance = mobile ? 7.4 : 10.1;
    const cameraStart = new THREE.Vector3(0, 0, assemblyDistance);
    const screenCenter = new THREE.Vector3();
    const screenRotation = new THREE.Quaternion();
    const screenScale = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3();
    const screenNormal = new THREE.Vector3();
    const neutralRotation = new THREE.Quaternion();
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

    const clamp = (value: number) => THREE.MathUtils.clamp(value, 0, 1);
    const ease = gsap.parseEase("power2.inOut");
    const portalElements = ["quantummed", "menoviq", "nori"].map((project) =>
      journey.querySelector<HTMLElement>(`.dashboard-portal-${project}`),
    );
    const initialStyles = portalElements.filter((element): element is HTMLElement => Boolean(element))
      .map((element) => ({ element, cssText: element.style.cssText }));
    const renderPortal = (index: number, time: number, entry: number, morphEntry: number, exit = Infinity) => {
      const overlay = portalElements[index];
      if (!overlay) return;
      const opacity = clamp((time - entry) / 0.1) * (1 - clamp((time - exit - 0.29) / 0.1));
      const arrival = ease(clamp((time - morphEntry) / 0.28));
      const departure = ease(clamp((time - exit) / 0.28));
      const morph = reducedMotion ? 1 : arrival * (1 - departure);
      const reveal = clamp((time - morphEntry - 0.14) / 0.18) * (1 - clamp((time - exit) / 0.12));
      overlay.style.opacity = String(opacity);
      overlay.style.visibility = opacity > 0 ? "visible" : "hidden";
      overlay.style.pointerEvents = opacity === 1 && reveal > 0.95 ? "auto" : "none";
      overlay.style.setProperty("--portal-morph", String(morph));
      overlay.style.setProperty("--project-reveal", String(reveal));
    };

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        // Derive each shot from absolute timeline time so forward, backward,
        // and large scroll jumps always resolve to exactly the same composition.
        onUpdate: () => {
          const time = timeline.time();
          renderPortal(0, time, 1.84, 1.94, 2.75);
          renderPortal(1, time, 4.42, 4.52, 5.35);
          renderPortal(2, time, 7.02, 7.12);
          if (time >= 1.18) {
            const quantumProgress = ease(clamp((time - 1.32) / 0.6)) * (1 - ease(clamp((time - 3.06) / 0.6)));
            const menoviqProgress = ease(clamp((time - 3.9) / 0.6)) * (1 - ease(clamp((time - 5.66) / 0.6)));
            const noriProgress = ease(clamp((time - 6.5) / 0.6));
            updateProjectCamera(quantumProgress, menoviqProgress, noriProgress);
          } else {
            perspectiveCamera.quaternion.identity();
          }
        },
        scrollTrigger: {
          trigger: journey,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Keep the endpoint still; reversing the scroll retraces the same shot.
            isScrubbing.current = self.progress > 0;
          },
        },
      });

      if (mobile) {
        // The first swipe brings the actual phone screen forward and holds it
        // before revealing the surrounding project panels.
        timeline
          .to(".hero-copy", { opacity: 0, y: -24, duration: 0.12 }, 0.03)
          .to(phone.position, { x: 0, y: -0.12, duration: 0.2 }, 0.03)
          .to(phone.rotation, { x: 0, y: 0, z: 0, duration: 0.2 }, 0.03)
          .to(phone.scale, { x: 0.9, y: 0.9, z: 0.9, duration: 0.22 }, 0.03)
          .to(perspectiveCamera.position, { z: 8, duration: 0.22 }, 0.03)
          .to(display.position, { z: 0.55, duration: 0.25 }, 0.57)
          .to(phone.position, { x: 0, y: -0.08, duration: 0.4 }, 0.65)
          .to(phone.rotation, { x: 0.03, y: 0.08, z: -0.025, duration: 0.4 }, 0.65)
          .to(phone.scale, { x: 0.68, y: 0.68, z: 0.68, duration: 0.4 }, 0.65)
          .to(perspectiveCamera.position, { z: assemblyDistance, duration: 0.4 }, 0.65)
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

        const mobilePositions = [[-0.45, 1.85, 1.1], [0.2, 0.05, 1.35], [-0.5, -1.6, 1.2]];
        const position = mobile ? mobilePositions[index] : feature.position;
        const panelScale = mobile ? (index === 0 ? 0.64 : 0.58) : 1;
        timeline
          .to(panel.scale, { x: panelScale, y: panelScale, z: panelScale, duration: 0.18 }, 0.58)
          .to(panel.position, { x: position[0], y: position[1], z: position[2], duration: 0.4 }, 0.62)
          .to(panel.rotation, { y: (index % 2 ? -1 : 1) * 0.18, x: index % 2 ? 0.12 : -0.1, duration: 0.3 }, 0.62)
          .to(material, { opacity: 1, duration: 0.08 }, 0.6);
      });

      // Reserve the remaining scroll for all three projects and their pullbacks.
      timeline.to({}, { duration: journeyDuration - 1.18 }, 1.18);
    }, journey);

    return () => {
      context.revert();
      initialStyles.forEach(({ element, cssText }) => { element.style.cssText = cssText; });
      perspectiveCamera.quaternion.identity();
    };
  }, [perspectiveCamera, size.width, size.height]);

  useFrame((state, delta) => {
    if (!phoneRef.current || isScrubbing.current) return;
    phoneRef.current.rotation.y += delta * 0.035;
    phoneRef.current.position.y = phoneBaseY + Math.sin(state.clock.elapsedTime * 0.55) * 0.035;
    phoneRef.current.rotation.x = THREE.MathUtils.lerp(phoneRef.current.rotation.x, -0.05 + state.pointer.y * 0.025, 0.025);
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
        <PhoneFrame materialRef={frameMaterialRef} />
        <MainDisplay displayRef={displayRef} />
        {featurePanels.map((feature, index) => (
          <FeaturePanel
            key={feature.id}
            feature={feature}
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
        shadows
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
      >
        <PhoneScene />
      </Canvas>
    </div>
  );
}
