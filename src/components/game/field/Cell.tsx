import { useActions } from "@/hooks/useActions";
import { ICellProps } from "@/interfaces/game/ICell";
import { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { MouseEventHandler, useEffect, useMemo } from "react";
import { LuBomb, LuFlag } from "react-icons/lu";
import { useSelector } from "react-redux";

const Cell = ({ coord }: ICellProps) => {
  const { toggleCell, toggleFlag, startGame } = useActions();
  const fieldSize = useSelector((state: RootState) => state.settings.fieldSize);
  const status = useSelector((state: RootState) => state.game.status);
  const action = useSelector((state: RootState) => state.game.action);
  const cell = useSelector(
    (state: RootState) => state.game.field[coord[0]][coord[1]],
  );
  const closeCellsCoords: Array<Array<number>> = useMemo(() => {
    const closeCellsCoords = [];
    for (let i = -1; i < 2; i++) {
      if (coord[0] + i < 0 || coord[0] + i === fieldSize[0]) continue;
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0) continue;
        if (coord[1] + j < 0 || coord[1] + j === fieldSize[1]) continue;
        closeCellsCoords.push([coord[0] + i, coord[1] + j]);
      }
    }
    return closeCellsCoords;
  }, [coord, fieldSize]);
  const closeMinesCount = useSelector((state: RootState) =>
    closeCellsCoords.reduce(
      (acc, closeCellCoord) =>
        acc +
        Number(state.game.field[closeCellCoord[0]][closeCellCoord[1]].isMined),
      0,
    ),
  );

  const onClick = () => {
    if (action === "flag") return toggleFlag(coord);
    if (status === "ongoing") toggleCell(coord);
    else startGame(coord);
  };

  const onContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (action === "mine") return toggleFlag(coord);
    if (status === "ongoing") toggleCell(coord);
    else startGame(coord);
  };

  let className =
    "overflow-hidden relative flex items-center justify-center size-8 min-w-8 min-h-8 max-size m-[2px] text-secondary-a rounded-sm cursor-pointer";
  className +=
    cell.isMined && cell.isToggled ? " bg-primary-b" : " bg-primary-c";

  useEffect(() => {
    if (cell.isToggled && !cell.isMined && closeMinesCount === 0)
      closeCellsCoords.forEach((closeCellCoord) => toggleCell(closeCellCoord));
  }, [
    cell.isMined,
    cell.isToggled,
    closeCellsCoords,
    closeMinesCount,
    toggleCell,
  ]);

  return (
    <div
      onClick={status === "victory" || status === "defeat" ? () => {} : onClick}
      onContextMenu={
        status === "victory" || status === "defeat" ? () => {} : onContextMenu
      }
      className={className}
    >
      <AnimatePresence initial={false}>
        {!cell.isToggled && !(status === "defeat" && cell.isMined) && (
          <motion.div
            initial={{
              left: "-150%",
              top: "-150%",
            }}
            animate={{
              left: -10,
              top: -10,
            }}
            exit={{
              left: "-150%",
              top: "-150%",
            }}
            whileTap={{ filter: "brightness(80%)" }}
            whileHover={{ filter: "brightness(80%)" }}
            className="absolute z-0 size-[200%] rotate-45 bg-secondary-b"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {((cell.isToggled && cell.isMined) ||
          (status === "defeat" && cell.isMined)) && (
          <motion.span key="bomb">
            <LuBomb />
          </motion.span>
        )}
        {cell.isToggled && !cell.isMined && closeMinesCount !== 0 && (
          <motion.span key="number">{closeMinesCount}</motion.span>
        )}
        {cell.isFlagged && (
          <motion.span
            key="flag"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
            className="absolute z-10 flex size-full items-center justify-center rounded-sm bg-secondary-b text-primary-a hover:brightness-90"
          >
            <LuFlag />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cell;
