import { useEffect, useState } from "react";
import { format } from "date-fns";
import type { Game, ScheduleResponse } from "./types";

export function useFetchGames(gameDate: Date) {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isCurrentRequest = true;

    async function fetchGames() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `/api/v1/schedule/${format(gameDate, "yyyy-MM-dd")}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Unable to load games for the selected date.");
        }

        const data = (await response.json()) as ScheduleResponse;
        const games = data.gameWeek[0]?.games ?? [];

        if (isCurrentRequest) {
          setGames(games);
        }
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (isCurrentRequest) {
          setError(
            error instanceof Error
              ? error.message
              : "Unable to load games for the selected date.",
          );
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    }

    fetchGames();

    return () => {
      isCurrentRequest = false;
      controller.abort();
    };
  }, [gameDate]);

  return { games, isLoading, error };
}
