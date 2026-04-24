// src/pages/ThreeDEditor.jsx
import React, { useState, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { create } from "zustand";
import { GLTFExporter } from "three-stdlib";
import EditorLayout from "../layouts/EditorLayout";

// ---------------------------
//  STORE
// ---------------------------
export const usePlanStore = create((set) => ({
  walls: [],
  doors: [],
  windows: [],
  selected: null,

  addWall: (w) => set((s) => ({ walls: [...s.walls, w] })),
  addDoor: (d) => set((s) => ({ doors: [...s.doors, d] })),
  addWindow: (w) => set((s) => ({ windows: [...s.windows, w] })),

  select: (obj) => set({ selected: obj }),

  deleteSelected: () =>
    set((s) => {
      if (!s.selected) return {};
      const { type, index } = s.selected;

      if (type === "wall") {
        const arr = [...s.walls];
        arr.splice(index, 1);
        return { walls: arr, selected: null };
      }
      if (type === "door") {
        const arr = [...s.doors];
        arr.splice(index, 1);
        return { doors: arr, selected: null };
      }
      if (type === "window") {
        const arr = [...s.windows];
        arr.splice(index, 1);
        return { windows: arr, selected: null };
      }
    }),

  updateWall: (i, data) =>
    set((s) => {
      const arr = [...s.walls];
      arr[i] = { ...arr[i], ...data };
      return { walls: arr };
    }),

  updateDoor: (i, data) =>
    set((s) => {
      const arr = [...s.doors];
      arr[i] = { ...arr[i], ...data };
      return { doors: arr };
    }),

  updateWindow: (i, data) =>
    set((s) => {
      const arr = [...s.windows];
      arr[i] = { ...arr[i], ...data };
      return { windows: arr };
    }),
}));

// ---------------------------
//  WALL
// ---------------------------
function Wall({ start, end, index }) {
  const select = usePlanStore((s) => s.select);

  const height = 1.5;
  const thickness = 0.05;

  const dx = end[0] - start[0];
  const dz = end[2] - start[2];
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dz, dx);

  const cx = (start[0] + end[0]) / 2;
  const cz = (start[2] + end[2]) / 2;

  return (
    <mesh
      position={[cx, height / 2, cz]}
      rotation={[0, -angle, 0]}
      onClick={(e) => {
        e.stopPropagation();
        select({ type: "wall", index });
      }}
    >
      <boxGeometry args={[length, height, thickness]} />
      <meshStandardMaterial color="#dadada" />
    </mesh>
  );
}

// ---------------------------
//  DOOR
// ---------------------------
function Door({ pos, index }) {
  const select = usePlanStore((s) => s.select);

  return (
    <mesh
      position={pos}
      onClick={(e) => {
        e.stopPropagation();
        select({ type: "door", index });
      }}
    >
      <boxGeometry args={[0.7, 1.2, 0.1]} />
      <meshStandardMaterial color="#7c3aed" />
    </mesh>
  );
}

// ---------------------------
//  WINDOW FIX (RENAMED)
// ---------------------------
function WindowItem({ pos, index }) {
  const select = usePlanStore((s) => s.select);

  return (
    <mesh
      position={pos}
      onClick={(e) => {
        e.stopPropagation();
        select({ type: "window", index });
      }}
    >
      <boxGeometry args={[1, 0.7, 0.1]} />
      <meshStandardMaterial color="#06b6d4" transparent opacity={0.7} />
    </mesh>
  );
}

// ---------------------------
//  FLOOR CLICK HANDLER
// ---------------------------
function EditorFloor({ mode }) {
  const addWall = usePlanStore((s) => s.addWall);
  const addDoor = usePlanStore((s) => s.addDoor);
  const addWindow = usePlanStore((s) => s.addWindow);

  const [startPoint, setStartPoint] = useState(null);
  const [previewPoint, setPreviewPoint] = useState(null);

  const { camera, mouse, raycaster, scene } = useThree();

  function getPoint() {
    raycaster.setFromCamera(mouse, camera);
    const floor = scene.getObjectByName("FLOOR");
    const hits = raycaster.intersectObject(floor);
    if (!hits.length) return null;

    const p = hits[0].point;
    const grid = 0.25;
    return [
      Math.round(p.x / grid) * grid,
      0,
      Math.round(p.z / grid) * grid,
    ];
  }

  function onClick() {
    const p = getPoint();
    if (!p) return;

    if (mode === "door") return addDoor({ pos: [p[0], 0.6, p[2]] });
    if (mode === "window") return addWindow({ pos: [p[0], 1, p[2]] });

    if (!startPoint) {
      setStartPoint(p);
    } else {
      addWall({ start: startPoint, end: p });
      setStartPoint(null);
      setPreviewPoint(null);
    }
  }

  useFrame(() => {
    if (startPoint) {
      const p = getPoint();
      if (p) setPreviewPoint(p);
    }
  });

  return (
    <>
      <mesh
        name="FLOOR"
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={onClick}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f3f3f3" />
      </mesh>

      {startPoint && previewPoint && (
        <Wall start={startPoint} end={previewPoint} index={9999} />
      )}
    </>
  );
}

// ---------------------------
//  SELECTION + TRANSFORM
// ---------------------------
function SelectionController() {
  const selected = usePlanStore((s) => s.selected);
  const walls = usePlanStore((s) => s.walls);
  const doors = usePlanStore((s) => s.doors);
  const windows = usePlanStore((s) => s.windows);

  const updateWall = usePlanStore((s) => s.updateWall);
  const updateDoor = usePlanStore((s) => s.updateDoor);
  const updateWindow = usePlanStore((s) => s.updateWindow);

  const ref = useRef();

  if (!selected) return null;

  if (selected.type === "wall" && !walls[selected.index]) return null;
  if (selected.type === "door" && !doors[selected.index]) return null;
  if (selected.type === "window" && !windows[selected.index]) return null;

  let pos = [0, 0, 0];

  if (selected.type === "wall") {
    const w = walls[selected.index];
    pos = [
      (w.start[0] + w.end[0]) / 2,
      1,
      (w.start[2] + w.end[2]) / 2,
    ];
  }

  if (selected.type === "door") {
    pos = doors[selected.index].pos;
  }

  if (selected.type === "window") {
    pos = windows[selected.index].pos;
  }

  return (
    <TransformControls
      mode="translate"
      object={ref.current}
      onObjectChange={() => {
        const p = ref.current.position;

        if (selected.type === "door") {
          updateDoor(selected.index, { pos: [p.x, p.y, p.z] });
        }

        if (selected.type === "window") {
          updateWindow(selected.index, { pos: [p.x, p.y, p.z] });
        }

        if (selected.type === "wall") {
          const w = walls[selected.index];
          const cx = p.x;
          const cz = p.z;

          const dx = (w.end[0] - w.start[0]) / 2;
          const dz = (w.end[2] - w.start[2]) / 2;

          updateWall(selected.index, {
            start: [cx - dx, 0, cz - dz],
            end: [cx + dx, 0, cz + dz],
          });
        }
      }}
    >
      <mesh ref={ref} position={pos} />
    </TransformControls>
  );
}

// ---------------------------
//  EXPORT FUNCTIONS
// ---------------------------
function exportGLTF(scene) {
  const exporter = new GLTFExporter();
  exporter.parse(scene, (gltf) => {
    const blob = new Blob([JSON.stringify(gltf)], {
      type: "model/gltf+json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "model.gltf";
    a.click();
  });
}

function exportJSON() {
  const data = JSON.stringify(usePlanStore.getState(), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "floorplan.json";
  a.click();
}

function importJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const data = JSON.parse(reader.result);
    usePlanStore.setState(data); // directly loads it into the editor
  };
  reader.readAsText(file);
}


// ---------------------------
//  MAIN COMPONENT
// ---------------------------
export default function ThreeDEditor() {
  const walls = usePlanStore((s) => s.walls);
  const doors = usePlanStore((s) => s.doors);
  const windows = usePlanStore((s) => s.windows);
  const deleteSelected = usePlanStore((s) => s.deleteSelected);

  const sceneRef = useRef();
  const [mode, setMode] = useState("wall");

  return (
  <EditorLayout
    title="3D Home Layout Editor"
    sidebar={
      <>
        <button type="button" onClick={() => setMode("wall")}>Draw Wall</button>
        <button type="button" onClick={() => setMode("door")}>Add Door</button>
        <button type="button" onClick={() => setMode("window")}>Add Window</button>

        <button type="button" onClick={() => exportGLTF(sceneRef.current)}>
          Export GLTF
        </button>
        <button type="button" onClick={exportJSON}>
          Export JSON
        </button>
        <label style={{ cursor: "pointer" }}>
  <span style={{ padding: "6px 10px", border: "1px solid #ddd", display: "inline-block" }}>
    Import JSON
  </span>
  <input type="file" accept=".json" onChange={importJSON} style={{ display: "none" }} />
</label>

        <button type="button" onClick={deleteSelected} style={{ background: "#ef4444", color: "white" }}>
          Delete Selected
        </button>
      </>
    }
  >
    <div style={{ height: "100%", width: "100%" }}>
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        onCreated={({ scene }) => (sceneRef.current = scene)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} />

        <OrbitControls />

        <EditorFloor mode={mode} />

        {walls.map((w, i) => (
          <Wall key={i} {...w} index={i} />
        ))}
        {doors.map((d, i) => (
          <Door key={i} pos={d.pos} index={i} />
        ))}
        {windows.map((w, i) => (
          <WindowItem key={i} pos={w.pos} index={i} />
        ))}

        <SelectionController />
      </Canvas>
    </div>
  </EditorLayout>
);


//   return (
//     <div>
//       {/* Toolbar */}
//       <div style={{ padding: 10, display: "flex", gap: 10 }}>
//         <button type="button" onClick={() => setMode("wall")}>Draw Wall</button>
//         <button type="button" onClick={() => setMode("door")}>Add Door</button>
//         <button type="button" onClick={() => setMode("window")}>Add Window</button>

//         <button onClick={() => exportGLTF(sceneRef.current)} style={{ marginLeft: "auto" }}>
//           Export GLTF
//         </button>
//         <button onClick={exportJSON}>Export JSON</button>

//         <button
//           onClick={deleteSelected}
//           style={{ background: "#ef4444", color: "white" }}>
//           Delete
//         </button>
//       </div>

//       {/* 3D Canvas */}
//       <div style={{ height: "450px", width: "85%" }}>
//         <Canvas
//           camera={{ position: [5, 5, 5], fov: 50 }}
//           onCreated={({ scene }) => (sceneRef.current = scene)}
//         >
//           <ambientLight intensity={0.6} />
//           <directionalLight position={[10, 10, 10]} />

//           <OrbitControls />

//           <EditorFloor mode={mode} />

//           {walls.map((w, i) => (
//             <Wall key={i} {...w} index={i} />
//           ))}
//           {doors.map((d, i) => (
//             <Door key={i} pos={d.pos} index={i} />
//           ))}
//           {windows.map((w, i) => (
//             <WindowItem key={i} pos={w.pos} index={i} />
//           ))}

//           <SelectionController />
//         </Canvas>
//       </div>
//     </div>
//   );
}
