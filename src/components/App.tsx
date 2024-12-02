import { AnimatePresence } from "framer-motion";
import Header from "@/components/header/Header";
import Main from "@/components/menu/Main";
import Settings from "@/components/menu/Settings";
import Game from "@/components/game/Game";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useActions } from "@/hooks/useActions";
import { useEffect } from "react";
import { getNewField } from "@/utils/getNewField";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useTranslation } from "react-i18next";

const App = () => {
  const { initializeSettings, setField: changeField } = useActions();
  const currentTab = useSelector((state: RootState) => state.tab.currentTab);
  const settings = useSelector((state: RootState) => state.settings);
  const { t } = useTranslation();
  const windowSize = useWindowSize();

  useEffect(() => {
    initializeSettings({
      fieldSize: localStorage.getItem("fieldSize")
        ? localStorage
            .getItem("fieldSize")!
            .split(",")
            .map((val) => parseInt(val))
        : [10, 10],
      minesCount: localStorage.getItem("minesCount")
        ? parseInt(localStorage.getItem("minesCount")!)
        : 15,
    });
  }, [initializeSettings]);

  useEffect(() => {
    changeField(getNewField(settings));
  }, [changeField, settings]);

  useEffect(() => {
    document.body.className = settings.theme;
  }, [settings.theme]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-secondary-a pt-[56px] text-primary-a transition-colors duration-300">
      {windowSize[0] > 300 && windowSize[1] > 520 ? (
        <>
          <Header />
          <AnimatePresence initial={false} mode="wait">
            {currentTab === "main" && <Main key="main" />}
            {currentTab === "settings" && <Settings key="settings" />}
            {currentTab === "game" && <Game key="game" />}
          </AnimatePresence>{" "}
        </>
      ) : (
        <div className="p-3 text-center text-3xl">{t("smallScreen")}</div>
      )}
    </div>
  );
};

export default App;
