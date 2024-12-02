import { configureStore } from "@reduxjs/toolkit";
import {
  reducer as tabReducer,
  actions as tabActions,
} from "@/redux/slices/tabSlice";
import {
  reducer as settingsReducer,
  actions as settingsActions,
} from "@/redux/slices/settingsSlice";
import {
  reducer as gameReducer,
  actions as gameActions,
} from "@/redux/slices/gameSlice";
import {
  listenerMiddleware,
  startAppListening,
} from "@/redux/listenerMiddleware";
import { getNewField } from "@/utils/getNewField";

startAppListening({
  actionCreator: settingsActions.setFieldSize,
  effect: (_action, listenerApi) => {
    localStorage.setItem(
      "fieldSize",
      String(listenerApi.getState().settings.fieldSize),
    );
    listenerApi.dispatch(
      settingsActions.setMinesCount(listenerApi.getState().settings.minesCount),
    );
    listenerApi.dispatch(gameActions.setField({ field: [] }));
  },
});

startAppListening({
  actionCreator: settingsActions.setMinesCount,
  effect: (_action, listenerApi) => {
    localStorage.setItem(
      "minesCount",
      String(listenerApi.getState().settings.minesCount),
    );
    listenerApi.dispatch(gameActions.setField({ field: [] }));
  },
});

startAppListening({
  actionCreator: settingsActions.setTheme,
  effect: (_action, listenerApi) => {
    localStorage.setItem("theme", listenerApi.getState().settings.theme);
  },
});

startAppListening({
  actionCreator: tabActions.changeTab,
  effect: (_action, listenerApi) => {
    const game = listenerApi.getState().game;
    const settings = listenerApi.getState().settings;
    if (game.field.length === 0 || game.status)
      listenerApi.dispatch(gameActions.setField(getNewField(settings)));
  },
});

startAppListening({
  actionCreator: gameActions.toggleCell,
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState();
    if (
      state.settings.fieldSize[0] * state.settings.fieldSize[1] -
        state.settings.minesCount ===
      state.game.toggledCellsCount
    )
      listenerApi.dispatch(gameActions.setStatus("victory"));
  },
});

startAppListening({
  actionCreator: gameActions.toggleFlag,
  effect: (action, listenerApi) => {
    if (
      listenerApi.getState().game.flagsCount >
      listenerApi.getState().settings.minesCount
    )
      listenerApi.dispatch(action);
  },
});

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    settings: settingsReducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
