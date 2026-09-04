import { PropsWithChildren, useState } from "react";
import { useFetchTeam } from "./useFetchTeam";
import {
  ScheduledGame,
  Game,
  SelectedPlayer,
  SetSelectedPlayer,
  SetSelectedGame,
} from "./types";
import PriorityRating from "./StarPriority";
//
//
type MainProps = {
  selectedGame: Game | undefined;
  setSelectedGame: SetSelectedGame;
  userPriority: number;
  setUserPriority: React.Dispatch<React.SetStateAction<number>>;
  myGames: ScheduledGame[];
  setMyGames: React.Dispatch<React.SetStateAction<ScheduledGame[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalMessage: React.Dispatch<React.SetStateAction<string>>;
};
//
export default function Main({
  selectedGame,
  setSelectedGame,
  userPriority,
  setUserPriority,
  myGames,
  setMyGames,
  setModalOpen,
  setModalMessage,
}: MainProps) {
  //
  const [selectedPlayer, setSelectedPlayer] = useState<SelectedPlayer | null>(
    null,
  );
  //
  function handleAdd() {
    if (!selectedGame) {
      return;
    }

    if (myGames.length > 2) {
      setModalMessage("Only 3 games allowed to schedule");
      setModalOpen(true);
      return;
    }

    const newAddedGame: ScheduledGame = {
      id: selectedGame.id,
      homeTeamLogo: selectedGame.homeTeam.logo,
      awayTeamLogo: selectedGame.awayTeam.logo,
      startDate: selectedGame.startTimeUTC.slice(0, 10),
      userPriority,
    };

    function handleAddMyGame(game: ScheduledGame) {
      if (myGames.map((myGame) => myGame.id).includes(game.id)) {
        setModalMessage("This game has already been added");
        setModalOpen(true);
        return;
      }
      setMyGames([...myGames, game]);
    }
    handleAddMyGame(newAddedGame);
    setUserPriority(0);
    setSelectedGame(undefined);
  }
  //
  return (
    <main>
      <span className="main-label">Selected game</span>
      {selectedPlayer ? (
        <PlayerStats selectedPlayer={selectedPlayer} />
      ) : (
        <div className="rating-container">
          <>
            {selectedGame && (
              <div className="rating-select">
                <span className="rating-label">Rate this game</span>
              <PriorityRating
                  key={selectedGame.id}
                  className="starPriority__container"
                  maxPriority={3}
                  size={24}
                  onSetPriority={setUserPriority}
                />
              </div>
            )}
            {userPriority * 1 > 0 && (
              <button className="myRateAndAdd__btn" onClick={handleAdd}>
                Add to my schedule
              </button>
            )}
          </>
        </div>
      )}

      <Players selectedGame={selectedGame} setSelectedPlayer={setSelectedPlayer} />
    </main>
  );
}
//
type PlayersProps = {
  selectedGame?: Game;
  setSelectedPlayer: SetSelectedPlayer;
};
//
function Players({ selectedGame, setSelectedPlayer }: PlayersProps) {
  //
  const {
    isLoadingTeam: isLoadingHomeTeam,
    gameTeamPlayers: gameHomeTeamPlayers,
  } = useFetchTeam(selectedGame?.homeTeam.abbrev);
  const {
    isLoadingTeam: isLoadingAwayTeam,
    gameTeamPlayers: gameAwayTeamPlayers,
  } = useFetchTeam(selectedGame?.awayTeam.abbrev);
  //
  return (
    <div className="players">
      {isLoadingHomeTeam ? (
        <Loader />
      ) : (
        <PlayersTeam
          selectedGameTeamLogo={selectedGame?.homeTeam.logo}
          className={"playersHomeTeam__container"}
        >
          <div className="playersHomeTeam__container-opacity">
            {selectedGame && (
              <>
                <PlayersBox
                  players={gameHomeTeamPlayers?.goalies!}
                  setSelectedPlayer={setSelectedPlayer}
                />
                <PlayersBox
                  players={gameHomeTeamPlayers?.defensemen!}
                  setSelectedPlayer={setSelectedPlayer}
                />
                <PlayersBox
                  players={gameHomeTeamPlayers?.forwards!}
                  setSelectedPlayer={setSelectedPlayer}
                />
              </>
            )}
          </div>
        </PlayersTeam>
      )}

      {isLoadingAwayTeam ? (
        <Loader />
      ) : (
        <PlayersTeam
          selectedGameTeamLogo={selectedGame?.awayTeam.logo}
          className={"playersAwayTeam__container"}
        >
          <div className="playersAwayTeam__container-opacity">
            {selectedGame && (
              <>
                <PlayersBox
                  players={gameAwayTeamPlayers?.forwards!}
                  setSelectedPlayer={setSelectedPlayer}
                />
                <PlayersBox
                  players={gameAwayTeamPlayers?.defensemen!}
                  setSelectedPlayer={setSelectedPlayer}
                />
                <PlayersBox
                  players={gameAwayTeamPlayers?.goalies!}
                  setSelectedPlayer={setSelectedPlayer}
                />
              </>
            )}
          </div>
        </PlayersTeam>
      )}
    </div>
  );
}
//
function Loader() {
  return <p className="loader">Loading...</p>;
}
//
//
type PlayersTeamProps = PropsWithChildren<{
  selectedGameTeamLogo?: string;
  className: string;
}>;
//
function PlayersTeam({
  selectedGameTeamLogo,
  className,
  children,
}: PlayersTeamProps) {
  //
  return (
    <div
      className={className}
      style={{
        backgroundSize: 500,
        backgroundImage: `url("${
          selectedGameTeamLogo === undefined
            ? "https://assets.nhle.com/logos/nhl/svg/NHL_light.svg"
            : selectedGameTeamLogo
        }")`,
      }}
    >
      {children}
    </div>
  );
}
//
//
type PlayersBoxProps = {
  players: SelectedPlayer[];
  setSelectedPlayer: SetSelectedPlayer;
};
//
function PlayersBox({ players, setSelectedPlayer }: PlayersBoxProps) {
  return (
    <div>
      {players?.map((player) => (
        <Player
          player={player}
          setSelectedPlayer={setSelectedPlayer}
          key={player.id}
        />
      ))}
    </div>
  );
}
//
//
type PlayerProps = {
  player: SelectedPlayer;
  setSelectedPlayer: SetSelectedPlayer;
};
//
function Player({ player, setSelectedPlayer }: PlayerProps) {
  //
  function setPlayer(player: SelectedPlayer) {
    setSelectedPlayer(player);
  }
  //
  return (
    <div
      className="player__container"
      onMouseEnter={() => setPlayer(player)}
      onMouseLeave={() => setSelectedPlayer(null)}
    >
      {player?.firstName?.default} {player?.lastName?.default}
    </div>
  );
}
//
//
type PlayerStatsProps = {
  selectedPlayer: SelectedPlayer;
};
//
function PlayerStats({ selectedPlayer }: PlayerStatsProps) {
  //
  return (
    <div className="playerInfo">
      <img
        className="playerPhoto__img"
        src={selectedPlayer.headshot}
        alt={`${selectedPlayer.firstName.default} ${selectedPlayer.lastName.default}`}
      />
      <div className="playerFirstLastName__container">
        <p>{selectedPlayer?.firstName.default}</p>
        <p> {selectedPlayer?.lastName.default}</p>
      </div>
      <div className="playerBirth__container">
        <p> Sweater Number : {selectedPlayer?.sweaterNumber}</p>
        <p> Birth date: {selectedPlayer?.birthDate}</p>
        <p>
          Birth: {selectedPlayer?.birthCity?.default}{" "}
          {selectedPlayer?.birthStateProvince?.default}{" "}
          {selectedPlayer?.birthCountry}{" "}
        </p>
      </div>
    </div>
  );
}
