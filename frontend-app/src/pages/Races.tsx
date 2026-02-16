import { useState } from "react";
import { Plus } from "lucide-react";
import RaceSection from "../components/races/RaceSection";
import RaceCreateModal from "../components/races/RaceModal";
import { useRaces } from "../hooks/useRaces";
import { RaceService } from "../services/raceService";
import type { Race } from "../types/race";

const Races = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editingRace, setEditingRace] = useState<Race | null>(null);
  const { races, loading, refetch } = useRaces();

  const handleRaceCreated = () => {
    setOpenModal(false);
    setEditingRace(null);
    refetch();
  };

  const handleEditRace = (race: Race) => {
    setEditingRace(race);
    setOpenModal(true);
  };

  const handleDeleteRace = async (id: string) => {
    try {
      await RaceService.delete(id);
      refetch();
    } catch (error) {
      console.error('Error deleting race:', error);
      alert('Failed to delete race');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingRace(null);
  };

  // Filtrar por data: races futuras vs passadas
  const now = new Date();
  const upcoming = races.filter((r) => new Date(r.date) >= now);
  const completed = races.filter((r) => new Date(r.date) < now);

  return (
    <main className="flex-1 bg-slate-100 min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Races & Goals
          </h1>
          <p className="text-slate-500 mt-1">2026 Season</p>
        </div>

        <button 
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <Plus size={18} />
          Add New Race
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-500">Loading races...</div>
      ) : (
        <>
          <RaceSection 
            title="Upcoming Races" 
            races={upcoming}
            onEditRace={handleEditRace}
            onDeleteRace={handleDeleteRace}
          />
          <RaceSection 
            title="Completed Results" 
            races={completed}
            onEditRace={handleEditRace}
            onDeleteRace={handleDeleteRace}
          />
        </>
      )}

      {openModal && (
        <RaceCreateModal 
          race={editingRace}
          onClose={handleCloseModal}
          onSuccess={handleRaceCreated}
        />
      )}
    </main>
  );
};

export default Races;
