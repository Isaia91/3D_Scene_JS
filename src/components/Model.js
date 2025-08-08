import React, { useEffect } from 'react'
    import { useGLTF } from '@react-three/drei'

    /**
     * Composant Model.
     *
     * Ce composant rend un modèle 3D statique dans une scène React Three Fiber.
     * Il ajuste automatiquement la position, l'échelle et la rotation du modèle
     * en fonction du chemin fourni, et applique un effet de glow pour certains modèles.
     *
     * @param {Object} props - Les propriétés du composant.
     * @param {string} props.path - Le chemin vers le fichier GLTF du modèle.
     *
     * @returns {JSX.Element} Le modèle 3D statique.
     */
    export function Model({ path }) {
        // Chargement du modèle GLTF
        const { scene } = useGLTF(path)

        // Valeurs par défaut pour la position, l'échelle et la rotation
        let position = [0, 0, 0]
        let scale = [1, 1, 1]
        let rotation = [0, 0, 0]

        // Ajuste les propriétés en fonction du chemin du modèle
        if (path.includes('stylized_spawn_point')) {
            position = [-4, 0, 0]
            scale = [10, 10, 10]
        } else if (path.includes('statue')) {
            position = [0, 6, 0]
            scale = [1, 1, 1]
        } else if (path.includes('stag_and_friends_original')) {
            position = [10, 8, 30]
            scale = [5, 5, 5]

            // Applique un effet de glow : active une couche et définit une couleur émissive
            scene.traverse((child) => {
                if (child.isMesh) {
                    child.layers.enable(1) // Active la couche de glow
                    child.material.emissive.set('#2df169') // Définit la couleur émissive
                    child.material.emissiveIntensity = 2 // Intensité de l'émission
                }
            })
        }

        // Rendu du modèle 3D avec ses propriétés
        return (
            <primitive
                object={scene}
                position={position}
                scale={scale}
                rotation={rotation}
                dispose={null}
            />
        )
    }