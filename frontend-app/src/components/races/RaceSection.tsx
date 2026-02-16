import { type Race } from "../../types/race";
import RaceCard from "./RaceCard";

interface Props {
  title: string;
  races: Race[];
  onEditRace?: (race: Race) => void;
  onDeleteRace?: (id: string) => void;
}

const RaceSection = ({ title, races, onEditRace, onDeleteRace }: Props) => {
  if (races.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        {title}
      </h2>

      <div className="space-y-4">
        {races.map((race) => (
          <RaceCard 
            key={race.id} 
            race={race}
            onEdit={onEditRace}
            onDelete={onDeleteRace}
          />
        ))}
      </div>
    </section>
  );
};

export default RaceSection;
