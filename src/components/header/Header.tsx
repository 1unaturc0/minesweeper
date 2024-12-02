import { motion, AnimatePresence } from "framer-motion";
import { LuBomb } from "react-icons/lu";
import ReturnButton from "@/components/header/ReturnButton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "@/hooks/useWindowSize";

const Header = () => {
  const currentTab = useSelector((state: RootState) => state.tab.currentTab);
  const { t } = useTranslation();
  const windowSize = useWindowSize();

  return (
    <header className="fixed top-0 flex min-h-[60px] w-screen items-center justify-center gap-3 pt-4 text-3xl font-extrabold tracking-wide sm:text-4xl">
      <AnimatePresence initial={false} mode="wait">
        {currentTab !== "main" && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            key="return"
          >
            <ReturnButton />
          </motion.div>
        )}
        {currentTab == "main" && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            key="bomb"
            className="text-4xl"
          >
            <LuBomb />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.h1>{t("header.title")}</motion.h1>
      {windowSize[0] > 400 && <LuBomb />}
    </header>
  );
};

export default Header;
