import ActionMenu from "./ActionMenu";
import GameStatus from "./GameStatus";
import MinesCounter from "./MinesCounter";
import RestartButton from "./RestartButton";

const GameBar = () => {
  return (
    <div className="text flex items-center gap-2 p-2">
      <div className="flex flex-1 justify-center">
        <RestartButton />
      </div>
      <div className="flex flex-1 justify-center">
        <MinesCounter />
      </div>
      <div className="flex flex-1 justify-center">
        <ActionMenu />
      </div>
      <div className="flex flex-1 justify-center">
        <GameStatus />
      </div>
    </div>
  );
};

export default GameBar;
