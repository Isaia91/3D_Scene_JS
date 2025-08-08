import React from "react";
        import { Canvas } from "@react-three/fiber";
        import { OrbitControls } from "@react-three/drei";
        import { Model } from "./components/Model";
        import { AnimatedModel } from "./components/AnimatedModel";
        import { EffectComposer, DepthOfField, SelectiveBloom } from "@react-three/postprocessing";
        import { useThree } from "@react-three/fiber";
        import { useEffect } from "react";
        import { Leva, useControls, folder } from "leva";
        import { MeshReflectorMaterial } from "@react-three/drei";

        /**
         * Composant Ground.
         *
         * Ce composant rend un sol noir dans la scène 3D.
         *
         * @returns {JSX.Element} Le sol noir.
         */
        function Ground() {
            return (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                    <planeGeometry args={[200, 200]} />
                    <meshStandardMaterial color="black" />
                </mesh>
            );
        }

        /**
         * Composant BloomEffect.
         *
         * Ce composant applique un effet de bloom sélectif sur les objets de la scène.
         *
         * @returns {JSX.Element} L'effet de bloom sélectif.
         */
        function BloomEffect() {
            const { camera } = useThree();

            useEffect(() => {
                camera.layers.enable(0); // normal
                camera.layers.enable(1); // objets glow
            }, [camera]);

            return (
                <SelectiveBloom
                    selectionLayer={1}
                    intensity={2.5}
                    luminanceThreshold={0}
                    luminanceSmoothing={0.9}
                />
            );
        }

        /**
         * Composant Scene.
         *
         * Ce composant configure et rend la scène 3D avec des lumières, un sol noir,
         * des modèles statiques et animés, et des effets de post-traitement.
         *
         * @returns {JSX.Element} La scène 3D complète.
         */
        function Scene() {
            // Panneau Leva : regroupe les contrôles par “folder”
            const { ambi, dirLight } = useControls({
                Lights: folder({
                    ambi: { value: 0.5, min: 0, max: 2, step: 0.1, label: "Ambient Intensity" },
                    dirLight: { value: 1, min: 0, max: 5, step: 0.1, label: "DirLight Intensity" },
                }, { collapsed: true }),
            });

            const { seraphimPosX, seraphimPosY, seraphimPosZ, seraphimScale, seraphimRotX } = useControls({
                Seraphim: folder({
                    seraphimPosX: { value: -0.5, min: -50, max: 50, step: 0.1 },
                    seraphimPosY: { value: 13,   min: -50, max: 50, step: 0.1 },
                    seraphimPosZ: { value: -2,   min: -50, max: 50, step: 0.1 },
                    seraphimScale: { value: 8,   min: 0.1, max: 50, step: 0.1 },
                    seraphimRotX: { value: -0.2, min: -Math.PI, max: Math.PI, step: 0.01, label: "Rotation X" },
                }, { collapsed: false }),
            });

            const { focusDistance, focalLength, bokehScale } = useControls({
                DepthOfField: folder({
                    focusDistance: { value: 0.02, min: 0, max: 1, step: 0.001 },
                    focalLength:   { value: 0.03, min: 0, max: 1, step: 0.001 },
                    bokehScale:    { value: 2,    min: 0, max: 10, step: 0.1 },
                }, { collapsed: true }),
            });

            return (
                <>
                    {/* Lumières */}
                    <ambientLight intensity={ambi} />
                    <directionalLight position={[5, 10, 5]} intensity={dirLight} castShadow />

                    {/* Sol */}
                    <Ground />

                    {/* Modèles */}
                    <Model path="/models/stylized_spawn_point.glb" />
                    <Model path="/models/statue.glb" />
                    <Model path="/models/stag_and_friends_original.glb" />

                    {/* Modèle animé (piloté par Leva) */}
                    <AnimatedModel
                        path="/models/seraphim.glb"
                        position={[seraphimPosX, seraphimPosY, seraphimPosZ]}
                        scale={[seraphimScale, seraphimScale, seraphimScale]}
                        rotation={[seraphimRotX, 0, 0]}
                    />

                    {/* Post-processing */}
                    <EffectComposer>
                        <DepthOfField
                            focusDistance={focusDistance}
                            focalLength={focalLength}
                            bokehScale={bokehScale}
                        />
                        <BloomEffect />
                    </EffectComposer>

                    {/* Contrôles caméra */}
                    <OrbitControls />
                </>
            );
        }

        /**
         * Composant App.
         *
         * Ce composant principal configure l'application et rend la scène 3D avec un panneau de contrôle Leva.
         *
         * @returns {JSX.Element} L'application complète avec la scène 3D.
         */
        export default function App() {
            return (
                <div style={{ width: "100vw", height: "100vh" }}>
                    {/* Leva affiche le panneau (collapsed pour ne pas gêner au chargement) */}
                    <Leva collapsed />
                    <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
                        <Scene />
                    </Canvas>
                </div>
            );
        }