import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

/**
 * AnimatedModel Component
 *
 * This component renders a 3D model with animations using the `@react-three/drei` library.
 * It supports playing the first animation on a click event.
 *
 * @param {Object} props - The component props.
 * @param {string} props.path - The path to the GLTF model file.
 * @param {Array<number>} [props.position=[0, 0, 0]] - The position of the model in the 3D scene.
 * @param {Array<number>} [props.scale=[1, 1, 1]] - The scale of the model in the 3D scene.
 *
 * @returns {JSX.Element} The rendered 3D model with animations.
 */
export function AnimatedModel({ path, position = [0, 0, 0], scale = [1, 1, 1] }) {
    // Reference to the group containing the 3D model
    const group = useRef()

    // Load the GLTF model and its animations
    const { scene, animations } = useGLTF(path)

    // Extract animation actions from the loaded animations
    const { actions } = useAnimations(animations, group)

    // State to track if the animation has been played
    const [played, setPlayed] = useState(false)

    /**
     * Handles the click event on the model.
     * Plays the first animation if it hasn't been played yet.
     */
    const handleClick = () => {
        console.log('Clicked!')
        if (!played && actions) {
            const firstAction = Object.values(actions)[0]
            if (firstAction) {
                firstAction.reset().fadeIn(0.3).play()
                setPlayed(true)
            }
        }
    }

    /**
     * Logs the available animation actions to the console whenever they change.
     */
    useEffect(() => {
        console.log('Available actions:', Object.keys(actions || {}))
    }, [actions])

    // Render the 3D model and attach the click handler
    return (
        <group ref={group} onClick={handleClick}>
            <primitive object={scene} position={position} scale={scale} dispose={null} />
        </group>
    )
}