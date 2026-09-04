import type { Dispatch, SetStateAction } from "react";

export type SetSelectedPlayer = Dispatch<SetStateAction<SelectedPlayer | null>>;
export type SetSelectedGame = Dispatch<SetStateAction<Game | undefined>>;

export type SelectedPlayer = {
  id: string;
  headshot: string;
  sweaterNumber: number;
  birthCountry: string;
  birthDate: string;
  firstName: {
    default: string;
  };
  lastName: {
    default: string;
  };
  birthCity: {
    default: string;
  };
  birthStateProvince: {
    default: string;
  };
};

export type Game = {
  startTimeUTC: string;
  id: number;
  awayTeam: {
    abbrev: string;
    logo: string;
  };
  homeTeam: {
    abbrev: string;
    logo: string;
  };
};

export type ScheduledGame = {
  id: number;
  awayTeamLogo: string;
  homeTeamLogo: string;
  startDate: string;
  userPriority: number;
};

export type TeamRoster = {
  forwards: SelectedPlayer[];
  defensemen: SelectedPlayer[];
  goalies: SelectedPlayer[];
};

export type ScheduleResponse = {
  gameWeek: Array<{
    games: Game[];
  }>;
};
