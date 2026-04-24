// src/store/sceneStore.js
import { create } from "zustand";

export const usePlanStore = create((set) => ({
  walls: [],
  doors: [],
  windows: [],
  selected: null, // {type: "wall"/"door"/"window", index}

  addWall: (wall) => set((s) => ({ walls: [...s.walls, wall] })),
  addDoor: (d) => set((s) => ({ doors: [...s.doors, d] })),
  addWindow: (w) => set((s) => ({ windows: [...s.windows, w] })),

  select: (obj) => set({ selected: obj }),
  updateWall: (index, newData) =>
    set((s) => {
      const walls = [...s.walls];
      walls[index] = { ...walls[index], ...newData };
      return { walls };
    }),

  updateDoor: (i, d) =>
    set((s) => {
      const arr = [...s.doors];
      arr[i] = { ...arr[i], ...d };
      return { doors: arr };
    }),

  updateWindow: (i, w) =>
    set((s) => {
      const arr = [...s.windows];
      arr[i] = { ...arr[i], ...w };
      return { windows: arr };
    }),
}));
