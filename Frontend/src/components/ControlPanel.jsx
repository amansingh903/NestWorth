import { useSceneStore } from "../store/sceneStore";

export default function ControlPanel() {
  const addItem = useSceneStore((s) => s.addItem);

  function addBox() {
    const pos = [
      Math.random() * 4 - 2,
      0.5,
      Math.random() * 4 - 2,
    ];
    addItem({ type: "box", pos });
  }

  return (
    <div style={{
      padding: "10px",
      border: "1px solid #ddd",
      width: "250px",
      borderRadius: "8px",
      background: "white"
    }}>
      <h3>Interior Controls</h3>
      <button
        onClick={addBox}
        style={{ padding: "8px 12px", marginTop: "10px", cursor: "pointer" }}
      >
        Add Furniture Box
      </button>
    </div>
  );
}
