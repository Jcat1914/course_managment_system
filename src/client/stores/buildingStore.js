import { create } from 'zustand'

export const useBuildingsStore = create((set) => ({
  buildings: [],
  setBuildings: (buildings) => set({ buildings }),
  addBuilding: (newBuilding) =>
    set((state) => ({ buildings: [...state.buildings, newBuilding] })),
  updateRoom: (roomId, updatedRoom) =>
    set((state) => ({
      buildings: state.buildings.map((building) => {
        if (building.Rooms) {
          const updatedRooms = building.Rooms.map((room) =>
            room.id === roomId ? updatedRoom : room
          )
          return { ...building, Rooms: updatedRooms }
        }
        return building
      }),
    })),
  updateBuildings: (updatedBuilding) =>
    set((state) => ({
      buildings: state.buildings.map((building) =>
        building.id === updatedBuilding.id ? updatedBuilding : building
      ),
    })),

  addBuildingRooms: (buildingId, newRoom) =>
    set((state) => ({
      buildings: state.buildings.map((building) =>
        building.id === buildingId
          ? { ...building, rooms: [...building.rooms, newRoom] }
          : building
      ),
    })),

  updateBuildingRooms: (buildingId, updatedRoom) =>
    set((state) => ({
      buildings: state.buildings.map((building) =>
        building.id === buildingId
          ? {
            ...building,
            rooms: building.rooms.map((room) =>
              room.id === updatedRoom.id ? updatedRoom : room
            ),
          }
          : building
      ),
    })),

  deleteBuilding: (id) =>
    set((state) => ({
      buildings: state.buildings.filter((building) => building.id !== id),
    })),
}))
