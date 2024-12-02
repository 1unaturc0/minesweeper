import { createSlice } from "@reduxjs/toolkit";

export interface ISettingsState {
  fieldSize: Array<number>;
  minesCount: number;
  theme: string;
}

const initialState: ISettingsState = {
  fieldSize: [10, 10],
  minesCount: 30,
  theme: "dark",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setFieldSize: (state, { payload: fieldSize }) => {
      state.fieldSize[0] =
        fieldSize[0] < 10 ? 10 : fieldSize[0] > 20 ? 20 : fieldSize[0];
      state.fieldSize[1] =
        fieldSize[1] < 10 ? 10 : fieldSize[1] > 20 ? 20 : fieldSize[1];
    },
    setMinesCount: (state, { payload: minesCount }) => {
      const minMinesCount = Math.floor(
        state.fieldSize[0] * state.fieldSize[1] * 0.15,
      );
      const maxMinesCount = Math.floor(
        state.fieldSize[0] * state.fieldSize[1] * 0.25,
      );
      state.minesCount =
        minesCount > maxMinesCount ? maxMinesCount : minesCount;
      state.minesCount =
        state.minesCount < minMinesCount ? minMinesCount : state.minesCount;
    },
    setTheme: (state, { payload: theme }) => {
      state.theme = theme;
    },
    initializeSettings: (state, { payload: settings }) => {
      state.fieldSize = settings.fieldSize;
      state.minesCount = settings.minesCount;
    },
  },
});

export const { actions, reducer } = settingsSlice;
