import { ReactNode, useState } from "react";
import { useFetchGames } from "./useFetchGames";
import Article from "./AppScheduledGames";
import Nav from "./AppNav";
import Main from "./AppMain";
import { ScheduledGame, Game } from "./types";

export default function App() {
  //
  const [selectedGame, setSelectedGame] = useState<Game | undefined>();
  const [gameDate, setGameDate] = useState(new Date("October 14, 2024"));
  //
  const [userPriority, setUserPriority] = useState(0);
  //
  const [myGames, setMyGames] = useState<ScheduledGame[]>([]);
  //
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  //
  const { games: fetchedGames, isLoading, error } = useFetchGames(gameDate);
  //
  function handleSetGameDate(gameDate: Date) {
    const seasonStart = new Date(2024, 9, 4); // the month is 0-indexed
    const seasonEnds = new Date(2025, 3, 18); // the month is 0-indexed
    //
    if (gameDate < seasonStart || gameDate > seasonEnds) {
      setModalOpen(true);
      setModalMessage(
        "Regular 2024/25 season starts on Oct. 4 and ends on Apr. 18 ",
      );
      return;
    }
    setGameDate(gameDate);
  }
  //
  return (
    <AppBody>
      {modalOpen && !error && (
        <ModalWindow modalMessage={modalMessage} setModalOpen={setModalOpen} />
      )}
      <Header />
      <Nav
        gameDate={gameDate}
        onSetGameDate={handleSetGameDate}
        fetchedGames={fetchedGames}
        isLoading={isLoading}
        setSelectedGame={setSelectedGame}
      />
      <Main
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        userPriority={userPriority}
        setUserPriority={setUserPriority}
        myGames={myGames}
        setMyGames={setMyGames}
        setModalOpen={setModalOpen}
        setModalMessage={setModalMessage}
      />
      <Article myGames={myGames} setMyGames={setMyGames} />
    </AppBody>
  );
}
//
type BodyProps = {
  children: ReactNode;
};
//
function AppBody({ children }: BodyProps) {
  return (
    <div className="app">
      <div className="app-body">{children}</div>;
    </div>
  );
}

function Header() {
  return <header>NHL Games Planner (season 2024 / 2025)</header>;
}
//
type ModalProps = {
  modalMessage: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
//
function ModalWindow({ modalMessage, setModalOpen }: ModalProps) {
  //
  function clickModal() {
    setModalOpen(false);
  }
  return (
    <div className={`modal__container`} onClick={() => clickModal()}>
      <div className="modalText__container">{modalMessage}</div>
    </div>
  );
}
