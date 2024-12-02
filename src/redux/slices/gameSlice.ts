import { createSlice } from "@reduxjs/toolkit";

export interface ICell {
  isMined: boolean;
  isToggled: boolean;
  isFlagged: boolean;
}

interface IGameState {
  field: Array<Array<ICell>>;
  flagsCount: number;
  toggledCellsCount: number;
  status: string;
  action: string;
}

const initialState: IGameState = {
  field: [],
  // for less calculations
  flagsCount: 0,
  toggledCellsCount: 0,
  status: "",
  action: "mine",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    toggleCell: (state, { payload: coord }) => {
      const cell = state.field[coord[0]][coord[1]];
      if (!cell.isFlagged && !cell.isToggled) {
        cell.isToggled = true;
        if (cell.isMined) state.status = "defeat";
        else state.toggledCellsCount++;
      }
    },
    toggleFlag: (state, { payload: coord }) => {
      const cell = state.field[coord[0]][coord[1]];
      if (!cell.isToggled) {
        cell.isFlagged = !cell.isFlagged;
        state.flagsCount += cell.isFlagged ? 1 : -1;
      }
    },
    setField: (state, { payload: field }) => {
      state.field = field;
      state.flagsCount = 0;
      state.status = "";
      state.toggledCellsCount = 0;
    },
    startGame: (state, { payload: coord }) => {
      const toggledCell = state.field[coord[0]][coord[1]];
      if (toggledCell.isFlagged) return;
      state.status = "ongoing";
      toggledCell.isToggled = true;
      state.toggledCellsCount++;
      if (toggledCell.isMined) {
        outer: for (const row of state.field)
          for (const cell of row)
            if (!cell.isMined) {
              cell.isMined = true;
              break outer;
            }
        toggledCell.isMined = false;
      }
    },
    setStatus: (state, { payload: status }) => {
      state.status = status;
    },
    setAction: (state, { payload: action }) => {
      state.action = action;
    },
  },
});

export const { actions, reducer } = gameSlice;
