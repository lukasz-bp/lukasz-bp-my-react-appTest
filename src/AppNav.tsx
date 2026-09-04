import { useState } from "react";
import { DraggableCalendar } from "./AppNavCalendar";
import { Games } from "./AppNavGames";
import { Game } from "./types";
import { format } from "date-fns";
//
//
type NavProps = {
  gameDate: Date;
  onSetGameDate: (date: Date) => void;
  fetchedGames: Game[];
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | undefined>>;
  isLoading: boolean;
};
//
export default function Nav({
  gameDate,
  onSetGameDate,
  fetchedGames,
  isLoading,
  setSelectedGame,
}: NavProps) {
  //
  const [calendarVisible, setCalendarVisible] = useState(false);
  //
  return (
    <nav>
      <p className="nav-label">Games schedule</p>
      <div className="date-select">
        <img className="calendar-img" src={"calendar.svg"} alt="calendar" />
        <button className="date-btn" onClick={() => setCalendarVisible(true)}>
          {format(gameDate, "yyyy-MM-dd")}
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <Games
          fetchedGames={fetchedGames}
          setSelectedGame={setSelectedGame}
          //setResetUserPriority={setResetUserPriority}
        />
      )}
      <DraggableCalendar
        gameDate={gameDate}
        calendarVisible={calendarVisible}
        setCalendarVisible={setCalendarVisible}
        onSetGameDate={onSetGameDate}
      />
    </nav>
  );
}
//
function Loader() {
  return <p className="loader">Loading...</p>;
}
