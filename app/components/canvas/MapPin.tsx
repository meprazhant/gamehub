'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface MapPinProps {
    position?: [number, number, number];
    visible?: boolean;
}

export default function MapPin({ position = [0, 0, 0], visible = true }: MapPinProps) {
    const groupRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const pulseRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!groupRef.current || !visible) return;

        const time = state.clock.elapsedTime;

        // Bounce animation
        groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.2;

        // Rotate ring
        if (ringRef.current) {
            ringRef.current.rotation.z = time * 0.5;
        }

        // Pulse effect
        if (pulseRef.current) {
            const scale = 1 + Math.sin(time * 3) * 0.2;
            pulseRef.current.scale.setScalar(scale);
            (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5 - Math.sin(time * 3) * 0.3;
        }
    });

    if (!visible) return null;

    return (
        <group ref={groupRef} position={position}>
            <Float
                speed={2}
                rotationIntensity={0.1}
                floatIntensity={0.2}
            >
                {/* Pin Body */}
                <group position={[0, 2, 0]}>
                    {/* Pin head */}
                    <mesh>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshStandardMaterial
                            color="#ff00ff"
                            emissive="#ff00ff"
                            emissiveIntensity={1.5}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>

                    {/* Pin point */}
                    <mesh position={[0, -1.5, 0]} rotation={[0, 0, Math.PI]}>
                        <coneGeometry args={[0.5, 2, 32]} />
                        <meshStandardMaterial
                            color="#ff00ff"
                            emissive="#ff00ff"
                            emissiveIntensity={1}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>

                    {/* Inner ring */}
                    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[1.3, 0.05, 16, 32]} />
                        <meshStandardMaterial
                            color="#00d4ff"
                            emissive="#00d4ff"
                            emissiveIntensity={2}
                        />
                    </mesh>

                    {/* Pulse ring */}
                    <mesh ref={pulseRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
                        <ringGeometry args={[1.5, 2, 32]} />
                        <meshBasicMaterial
                            color="#ff00ff"
                            transparent
                            opacity={0.5}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                </group>

                {/* Location Text */}
                <Text
                    font="/fonts/Orbitron-Bold.woff"
                    fontSize={1.2}
                    position={[0, -1, 0]}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    Sagarmatha Chowk, Jhapa
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#ffffff"
                        emissiveIntensity={0.5}
                    />
                </Text>

                {/* Subtitle */}
                <Text
                    font="/fonts/Orbitron-Regular.woff"
                    fontSize={0.5}
                    position={[0, -2, 0]}
                    color="#00d4ff"
                    anchorX="center"
                    anchorY="middle"
                >
                    console Gaming Station
                    <meshStandardMaterial
                        color="#00d4ff"
                        emissive="#00d4ff"
                        emissiveIntensity={1}
                    />
                </Text>

                {/* Decorative grid below */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
                    <planeGeometry args={[15, 15, 15, 15]} />
                    <meshStandardMaterial
                        color="#ff00ff"
                        wireframe
                        transparent
                        opacity={0.15}
                        emissive="#ff00ff"
                        emissiveIntensity={0.2}
                    />
                </mesh>
            </Float>
        </group>
    );
}
