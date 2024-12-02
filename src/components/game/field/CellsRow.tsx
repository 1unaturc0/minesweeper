import { ICellsRowProps } from "@/interfaces/game/ICellsRow";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Cell from "./Cell";

const CellsRow = ({ index }: ICellsRowProps) => {
  const fieldSize = useSelector((state: RootState) => state.settings.fieldSize);

  const cellItems = [];
  for (let i = 0; i < fieldSize[1]; i++)
    cellItems.push(<Cell coord={[index, i]} key={i} />);

  return <div className="flex">{cellItems}</div>;
};

export default CellsRow;
