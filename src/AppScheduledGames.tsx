import PriorityRating from "./StarPriority";
import { ScheduledGame } from "./types";
//
//
type ArticleProps = {
  myGames: ScheduledGame[];
  setMyGames: React.Dispatch<React.SetStateAction<ScheduledGame[]>>;
};
//
export default function Article({
  myGames,
  setMyGames,
}: ArticleProps) {
  return (
    <article className="myGames__container">
      <p className="article-label">My games</p>
      <div className="myGames">
        {myGames.map((myGame) => (
          <MyGame
            myGame={myGame}
            setMyGames={setMyGames}
            key={myGame.id}
          />
        ))}
      </div>
    </article>
  );
}
//
//
type MyGameProps = {
  myGame: ScheduledGame;
  setMyGames: React.Dispatch<React.SetStateAction<ScheduledGame[]>>;
};
//
function MyGame({ myGame, setMyGames }: MyGameProps) {
  //
  function handleDeleteMyGame(id: number) {
    setMyGames((myGames) => myGames.filter((myGame) => myGame.id !== id));
  }
  //
  return (
    <div className="myGame">
      <div>
        <div className="myGame-date">{myGame.startDate}</div>
        <div className="myGameLogos__container">
          <img
            className="myGameLogo__img"
            src={myGame.homeTeamLogo}
            alt="Home team logo"
          />
          <span className="myGame--text">vs.</span>
          <img
            className="myGameLogo__img"
            src={myGame.awayTeamLogo}
            alt="Away team logo"
          />
        </div>

        <div className="myRating">
          <PriorityRating
            defaultPriority={myGame.userPriority}
            maxPriority={myGame.userPriority}
            size={14}
            printMessage={false}
            disableSettingPriority={true}
          />
        </div>
      </div>
      <div
        className="myGame-delete"
        onClick={() => handleDeleteMyGame(myGame.id)}
      >
        <p className="delete-btn">❌</p>
      </div>
    </div>
  );
}
