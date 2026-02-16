import { useCallback } from "react";
import { RaceService } from "../services/raceService";
import { useFetch } from "./useFetch";

export const useRaces = () => {

  const fetcher = useCallback(() => RaceService.getAll(), []);
  
  const { data: races, loading, error, refetch } = useFetch(fetcher);

  return { 
    races: races || [], 
    loading, 
    error, 
    refetch 
  };
};