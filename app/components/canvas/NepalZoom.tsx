'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface NepalZoomProps {
    position?: [number, number, number];
    scrollProgress: number;
    visible: boolean;
}

export default function NepalZoom({ position = [0, 0, 0], scrollProgress, visible }: NepalZoomProps) {
    const groupRef = useRef<THREE.Group>(null);
    const terrainRef = useRef<THREE.Mesh>(null);
    const markerRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current || !visible) return;

        const time = state.clock.elapsedTime;

        // Pulse the location marker
        if (markerRef.current) {
            markerRef.current.position.y = Math.sin(time * 2) * 0.2 + 1.5;
        }

        // Scale based on scroll (appears during 0.5-0.7)
        const nepalPhase = (scrollProgress - 0.5) / 0.2;
        const scale = Math.min(Math.max(nepalPhase, 0), 1) * 1.5;
        groupRef.current.scale.setScalar(scale);
    });

    if (!visible) return null;

    return (
        <group ref={groupRef} position={position}>
            <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
                {/* Stylized terrain - Mountain representation */}
                <group ref={terrainRef}>
                    {/* Base terrain */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                        <planeGeometry args={[20, 20, 50, 50]} />
                        <meshStandardMaterial
                            color="#1a472a"
                            wireframe={false}
                            metalness={0.2}
                            roughness={0.9}
                        />
                    </mesh>

                    {/* Mountain peaks - Himalayas */}
                    {[
                        { x: -3, z: -2, height: 4, color: '#ffffff' },
                        { x: -1, z: -3, height: 5, color: '#f0f0f0' },
                        { x: 1, z: -2.5, height: 4.5, color: '#ffffff' },
                        { x: 3, z: -2, height: 3.5, color: '#e8e8e8' },
                        { x: 0, z: -1, height: 3, color: '#f5f5f5' },
                    ].map((mountain, i) => (
                        <mesh key={i} position={[mountain.x, mountain.height / 2 - 1, mountain.z]}>
                            <coneGeometry args={[1.5, mountain.height, 8]} />
                            <meshStandardMaterial
                                color={mountain.color}
                                metalness={0.1}
                                roughness={0.9}
                            />
                        </mesh>
                    ))}

                    {/* Jhapa area - Eastern Nepal lowlands */}
                    <mesh position={[4, -0.9, 2]} rotation={[-Math.PI / 2, 0, 0]}>
                        <circleGeometry args={[2, 32]} />
                        <meshStandardMaterial
                            color="#2d5a27"
                            metalness={0.1}
                            roughness={0.9}
                        />
                    </mesh>
                </group>

                {/* Location Marker for Sagarmatha Chowk, Jhapa */}
                <group ref={markerRef} position={[4, 1.5, 2]}>
                    {/* Pin */}
                    <mesh>
                        <sphereGeometry args={[0.3, 32, 32]} />
                        <meshStandardMaterial
                            color="#ff00ff"
                            emissive="#ff00ff"
                            emissiveIntensity={2}
                        />
                    </mesh>

                    {/* Pin stem */}
                    <mesh position={[0, -0.7, 0]}>
                        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
                        <meshStandardMaterial
                            color="#ff00ff"
                            emissive="#ff00ff"
                            emissiveIntensity={1}
                        />
                    </mesh>

                    {/* Pulse rings */}
                    {[0, 1, 2].map((i) => (
                        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
                            <ringGeometry args={[0.5 + i * 0.4, 0.6 + i * 0.4, 32]} />
                            <meshStandardMaterial
                                color="#ff00ff"
                                emissive="#ff00ff"
                                emissiveIntensity={1}
                                transparent
                                opacity={0.5 - i * 0.15}
                                side={THREE.DoubleSide}
                            />
                        </mesh>
                    ))}
                </group>

                {/* Location Label */}
                <Text
                    font="/fonts/Orbitron-Bold.woff"
                    fontSize={0.5}
                    position={[4, 3, 2]}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    Sagarmatha Chowk, JHAPA
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#ffffff"
                        emissiveIntensity={0.5}
                    />
                </Text>

                {/* Nepal label */}
                <Text
                    font="/fonts/Orbitron-Regular.woff"
                    fontSize={0.3}
                    position={[4, 2.5, 2]}
                    color="#00d4ff"
                    anchorX="center"
                    anchorY="middle"
                >
                    EASTERN NEPAL
                    <meshStandardMaterial
                        color="#00d4ff"
                        emissive="#00d4ff"
                        emissiveIntensity={1}
                    />
                </Text>

                {/* Grid overlay */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
                    <planeGeometry args={[20, 20, 20, 20]} />
                    <meshStandardMaterial
                        color="#00d4ff"
                        wireframe
                        transparent
                        opacity={0.1}
                    />
                </mesh>
            </Float>

            {/* Ambient lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 10, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[4, 3, 2]} intensity={2} color="#ff00ff" distance={5} />
        </group>
    );
}
