import Tab from "../Tab";
import Field from "./field/Field";
import GameBar from "./gamebar/GameBar";

const Game = () => {
  return (
    <Tab width={"auto"}>
      <div className="flex flex-col gap-2 p-6 pt-2">
        <GameBar />
        <Field />
      </div>
    </Tab>
  );
};

export default Game;
