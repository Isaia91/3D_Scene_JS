import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Model } from "./components/Model";
import { AnimatedModel } from "./components/AnimatedModel";

// --- Ground noir ---
function Ground() {
  return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="black" />
      </mesh>
  );
}

function App() {
  return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
          {/* Lumières */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

          {/* Sol noir */}
          <Ground />

          {/* Modèles statiques */}
          <Model
              path="/models/stylized_spawn_point.glb"
              position={[-4, 0, 0]}
              scale={[10, 10, 10]}
          />
          <Model
              path="/models/statue.glb"
              position={[0, 6, 0]}
              scale={[1, 1, 1]}
          />
          <Model
              path="/models/stag_and_friends_original.glb"
              position={[10, 8, 30]}
              scale={[5, 5, 5]}
          />

          {/* Modèle animé */}
            <AnimatedModel path="/models/seraphim.glb" />


            {/* Contrôle caméra */}
          <OrbitControls />
        </Canvas>
      </div>
  );
}

export default App;
