import { type Race } from "../../types/race";
import RaceCard from "./RaceCard";

interface Props {
  title: string;
  races: Race[];
}

const RaceSection = ({ title, races }: Props) => {
  if (races.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        {title}
      </h2>

      <div className="space-y-4">
        {races.map((race) => (
          <RaceCard key={race.id} race={race} />
        ))}
      </div>
    </section>
  );
};

export default RaceSection;
