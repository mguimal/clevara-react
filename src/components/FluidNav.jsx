/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, useFBO, MeshTransmissionMaterial } from '@react-three/drei';
import { useI18n } from '../i18n/I18nContext';
import { scrollToSection } from '../lib/smoothScroll';

const NAV = [
    { id: 'inicio', key: 'nav.home' },
    { id: 'clebots', key: 'nav.clebots' },
    { id: 'strategy', key: 'nav.enterprise' },
    { id: 'contacto', key: 'nav.contact' },
];

function makeGradientTexture() {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 256;
    const g = c.getContext('2d');
    const grd = g.createLinearGradient(0, 0, 1024, 0);
    grd.addColorStop(0, '#1e3a8a');
    grd.addColorStop(0.35, '#2563eb');
    grd.addColorStop(0.68, '#0ea5e9');
    grd.addColorStop(1, '#06b6d4');
    g.fillStyle = grd;
    g.fillRect(0, 0, 1024, 256);
    for (let i = 0; i < 6; i++) {
        const x = Math.random() * 1024;
        const rg = g.createRadialGradient(x, 128, 0, x, 128, 170);
        rg.addColorStop(0, 'rgba(255,255,255,0.30)');
        rg.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = rg;
        g.fillRect(0, 0, 1024, 256);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

function GlassBar() {
    const barRef = useRef();
    const { gl, size, viewport } = useThree();
    const dpr = gl.getPixelRatio();
    const buffer = useFBO(size.width * dpr, size.height * dpr);
    const [scene] = useState(() => new THREE.Scene());
    const tex = useMemo(() => makeGradientTexture(), []);

    useEffect(
        () => () => {
            buffer.dispose();
            tex.dispose();
        },
        [buffer, tex]
    );

    useFrame((state, delta) => {
        const v = viewport.getCurrentViewport(state.camera, [0, 0, 15]);
        const bob = Math.sin(state.clock.elapsedTime * 1.3) * 0.02;
        const targetY = -v.height / 2 + 0.26 + bob;
        const k = Math.min(1, delta * 6);
        barRef.current.position.y += (targetY - barRef.current.position.y) * k;
        barRef.current.position.x = 0;
        barRef.current.scale.x = (v.width * 0.9) / 9.4;

        gl.setRenderTarget(buffer);
        gl.render(scene, state.camera);
        gl.setRenderTarget(null);
    });

    return (
        <>
            {createPortal(
                <mesh scale={[80, 40, 1]}>
                    <planeGeometry />
                    <meshBasicMaterial map={tex} />
                </mesh>,
                scene
            )}
            <group ref={barRef} position={[0, -0.45, 15]}>
                <RoundedBox args={[9.4, 1, 1]} radius={0.48} smoothness={8}>
                    <MeshTransmissionMaterial
                        buffer={buffer.texture}
                        transmission={1}
                        roughness={0.07}
                        thickness={2.6}
                        ior={1.18}
                        chromaticAberration={0.28}
                        anisotropy={0.12}
                        samples={8}
                        resolution={512}
                        color="#ffffff"
                        attenuationColor="#cfe4ff"
                        attenuationDistance={1.1}
                        background={new THREE.Color('#0a1128')}
                    />
                </RoundedBox>
            </group>
        </>
    );
}

export default function FluidNav() {
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const check = () =>
            setDisabled(
                document.documentElement.classList.contains('low-power') ||
                    window.matchMedia('(max-width: 767px)').matches ||
                    window.matchMedia('(prefers-reduced-motion: reduce)').matches
            );
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const labels = NAV.map((n) => ({ ...n }));
    const LabelRow = ({ className }) => {
        const { t } = useI18n();
        return (
            <div className={`fn-labels ${className || ''}`}>
                {labels.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(`#${item.id}`);
                        }}
                    >
                        {t(item.key)}
                    </button>
                ))}
            </div>
        );
    };

    if (disabled) {
        return (
            <div className="fluid-nav-wrap">
                <div className="fn-fallback">
                    <LabelRow className="fn-fallback-labels" />
                </div>
            </div>
        );
    }

    return (
        <div className="fluid-nav-wrap">
            <div className="fn-canvas">
                <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }} dpr={[1, 2]}>
                    <GlassBar />
                </Canvas>
            </div>
            <LabelRow />
        </div>
    );
}
