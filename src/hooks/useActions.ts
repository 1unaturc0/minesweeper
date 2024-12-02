import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { actions as tabActions } from "@/redux/slices/tabSlice";
import { actions as settingsActions } from "@/redux/slices/settingsSlice";
import { actions as gameActions } from "@/redux/slices/gameSlice";

const allActions = {
  ...tabActions,
  ...settingsActions,
  ...gameActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};
