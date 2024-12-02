import { useWindowSize } from "@/hooks/useWindowSize";
import { RootState } from "@/redux/store";
import { LuBomb } from "react-icons/lu";
import { useSelector } from "react-redux";

const MinesCounter = () => {
  const flagsCount = useSelector((state: RootState) => state.game.flagsCount);
  const minesCount = useSelector(
    (state: RootState) => state.settings.minesCount,
  );
  const windowSize = useWindowSize();

  return (
    <div className="flex justify-center gap-1 rounded-md border-solid border-primary-c font-medium sm:border-2 sm:p-4">
      {flagsCount}/{minesCount} {windowSize[0] > 350 && <LuBomb />}
    </div>
  );
};

export default MinesCounter;
