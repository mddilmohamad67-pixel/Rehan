import { create } from 'zustand';

interface ToolState {
  selectedTool: string | null;
  recentProjects: any[];
  favorites: string[];
  setSelectedTool: (tool: string) => void;
  addRecentProject: (project: any) => void;
  toggleFavorite: (toolId: string) => void;
}

export const useToolStore = create<ToolState>((set) => ({
  selectedTool: null,
  recentProjects: [],
  favorites: [],
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  addRecentProject: (project) =>
    set((state) => ({
      recentProjects: [project, ...state.recentProjects].slice(0, 10),
    })),
  toggleFavorite: (toolId) =>
    set((state) => ({
      favorites: state.favorites.includes(toolId)
        ? state.favorites.filter((id) => id !== toolId)
        : [...state.favorites, toolId],
    })),
}));
