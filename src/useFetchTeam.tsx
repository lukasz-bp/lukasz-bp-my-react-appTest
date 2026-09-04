import { useEffect, useState } from "react";
import type { TeamRoster } from "./types";

export function useFetchTeam(teamAbbrev?: string) {
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);
  const [gameTeamPlayers, setGameTeamPlayers] = useState<TeamRoster>();

  useEffect(() => {
    if (!teamAbbrev) {
      setGameTeamPlayers(undefined);
      setIsLoadingTeam(false);
      return;
    }

    const controller = new AbortController();
    let isCurrentRequest = true;

    async function fetchTeam() {
      try {
        setIsLoadingTeam(true);
        const response = await fetch(`/api/v1/roster/${teamAbbrev}/20242025`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load the team roster.");
        }

        const roster = (await response.json()) as TeamRoster;
        if (isCurrentRequest) {
          setGameTeamPlayers(roster);
        }
      } catch (error: unknown) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error(error);
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoadingTeam(false);
        }
      }
    }

    fetchTeam();

    return () => {
      isCurrentRequest = false;
      controller.abort();
    };
  }, [teamAbbrev]);

  return { isLoadingTeam, gameTeamPlayers };
}
