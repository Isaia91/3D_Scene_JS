import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { LoopRepeat } from 'three'

/**
 * Composant AnimatedModel.
 *
 * Ce composant rend un modèle 3D animé dans une scène React Three Fiber.
 * Il charge un fichier GLTF, applique une animation en boucle infinie, et permet
 * de positionner, redimensionner et faire pivoter le modèle.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.path - Le chemin vers le fichier GLTF du modèle.
 * @param {Array<number>} [props.position=[-0.5, 13, -2]] - La position du modèle dans la scène 3D.
 * @param {Array<number>} [props.scale=[8, 8, 8]] - L'échelle du modèle dans la scène 3D.
 * @param {Array<number>} [props.rotation=[-0.2, 0, 0]] - La rotation du modèle dans la scène 3D.
 *
 * @returns {JSX.Element} Le modèle 3D animé.
 */
export function AnimatedModel({
                                  path,
                                  position = [-0.5, 13, -2],
                                  scale = [8, 8, 8],
                                  rotation = [-0.2, 0, 0],
                              }) {
    // Référence au groupe contenant le modèle 3D
    const group = useRef()
    // Chargement du modèle GLTF et de ses animations
    const { scene, animations } = useGLTF(path)
    // Extraction des actions d'animation
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        if (!actions) return
        // Démarre la première animation en boucle infinie si disponible
        const first = Object.values(actions)[0]
        if (!first) return
        first.reset()
        first.setLoop(LoopRepeat, Infinity)
        first.play()
    }, [actions])

    // Rendu du modèle 3D avec ses propriétés
    return (
        <group ref={group} position={position} scale={scale} rotation={rotation}>
            <primitive object={scene} dispose={null} />
        </group>
    )
}