import { ISettingsState } from "@/redux/slices/settingsSlice";
import { fisherYatesShuffle } from "./fisherYatesShuffle";
import { ICell } from "@/redux/slices/gameSlice";

export const getNewField = (settings: ISettingsState) => {
  const cell = { isMined: false, isToggled: false, isFlagged: false };
  const field: Array<Array<ICell>> = [];
  const coords = [];

  for (let i = 0; i < settings.fieldSize[0]; i++) {
    field.push([]);
    for (let j = 0; j < settings.fieldSize[1]; j++) {
      coords.push([i, j]);
      field[i].push({ ...cell });
    }
  }

  fisherYatesShuffle(coords);
  for (let i = 0; i < settings.minesCount; i++)
    field[coords[i][0]][coords[i][1]].isMined = true;

  return field;
};
