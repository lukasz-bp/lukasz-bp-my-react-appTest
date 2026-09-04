import { SetSelectedGame, type Game } from "./types";
//
type GamesProps = {
  fetchedGames: Game[];
  setSelectedGame: SetSelectedGame;
};
//
export function Games({ fetchedGames, setSelectedGame }: GamesProps) {
  return (
    <ul className="fetchedGames">
      {fetchedGames.length === 0
        ? "No games scheduled for this date"
        : fetchedGames.map((game) => (
            <GameListItem
              game={game}
              setSelectedGame={setSelectedGame}
              key={game.id}
            />
          ))}
    </ul>
  );
}
//
type GameProps = {
  game: Game;
  setSelectedGame: SetSelectedGame;
};
//
function GameListItem({ game, setSelectedGame }: GameProps) {
  return (
    <li>
      <button
        className="fetchedGame"
        type="button"
        onClick={() => setSelectedGame(game)}
        aria-label={`Select ${game.awayTeam.abbrev} at ${game.homeTeam.abbrev}`}
      >
      <img
        className="fetchedGame-teamLogo"
        src={game.homeTeam.logo}
        alt={`${game.homeTeam.abbrev} logo`}
      />
      <p>vs</p>
      <img
        className="fetchedGame-teamLogo"
        src={game.awayTeam.logo}
        alt={`${game.awayTeam.abbrev} logo`}
      />
      </button>
    </li>
  );
}
