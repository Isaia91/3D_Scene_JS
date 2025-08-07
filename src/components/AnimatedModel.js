import React, { useEffect, useRef } from 'react'
            import { useGLTF, useAnimations } from '@react-three/drei'
            import { LoopRepeat } from 'three'

            /**
             * Composant AnimatedModel
             *
             * Ce composant rend un modèle 3D animé dans une scène React Three Fiber.
             * Il charge un fichier GLTF, applique une animation en boucle infinie, et permet
             * de positionner, redimensionner et faire pivoter le modèle.
             *
             * @param {Object} props - Les propriétés du composant.
             * @param {string} props.path - Le chemin vers le fichier GLTF du modèle.
             * @param {Array<number>} [props.position=[0, 0, 0]] - La position du modèle dans la scène 3D.
             * @param {Array<number>} [props.scale=[1, 1, 1]] - L'échelle du modèle dans la scène 3D.
             * @param {Array<number>} [props.rotation=[0, 0, 0]] - La rotation du modèle dans la scène 3D.
             *
             * @returns {JSX.Element} Le modèle 3D animé.
             */
            export function AnimatedModel({ path }) {
                const group = useRef()
                const { scene, animations } = useGLTF(path)
                const { actions } = useAnimations(animations, group)

                useEffect(() => {
                    if (actions && Object.values(actions).length > 0) {
                        const firstAction = Object.values(actions)[0]
                        firstAction.reset().play()
                    }
                }, [actions])

                return (
                    <group
                        ref={group}
                        position={[-0.5, 13, -2]}   // valeurs fixes
                        scale={[8, 8, 8]}           // valeurs fixes
                        rotation={[-0.2, 0, 0]}     // valeurs fixes
                    >
                        <primitive object={scene} dispose={null} />
                    </group>
                )
            }
