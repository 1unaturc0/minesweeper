import MenuButton from "@/components/menu/MenuButton";
import Tab from "@/components/Tab";
import { useActions } from "@/hooks/useActions";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import MenuSlider from "./MenuSlider";
import { useCallback } from "react";

const locales = [
  { code: "en", path: "images/flags/united-kingdom.png" },
  { code: "ru", path: "images/flags/russia.png" },
];

const Settings = () => {
  const { setFieldSize, setMinesCount, setTheme } = useActions();
  const settings = useSelector((state: RootState) => state.settings);
  const { t, i18n } = useTranslation();
  const currentLocaleIndex = locales.findIndex(
    (locale) => locale.code === i18n.resolvedLanguage,
  );

  const onRowsSliderChange = useCallback(
    (value: number) => setFieldSize([value, settings.fieldSize[1]]),
    [settings.fieldSize, setFieldSize],
  );
  const onColumnsSliderChange = useCallback(
    (value: number) => setFieldSize([settings.fieldSize[0], value]),
    [settings.fieldSize, setFieldSize],
  );
  const onMinesSliderChange = useCallback(
    (value: number) => setMinesCount(value),
    [setMinesCount],
  );

  return (
    <Tab width={500}>
      <MenuSlider
        text={t("settings.rowsSlider")}
        value={settings.fieldSize[0]}
        minValue={10}
        maxValue={20}
        onChange={onRowsSliderChange}
      />
      <MenuSlider
        text={t("settings.columnsSlider")}
        value={settings.fieldSize[1]}
        minValue={10}
        maxValue={20}
        onChange={onColumnsSliderChange}
      />
      <MenuSlider
        text={t("settings.minesSlider")}
        value={settings.minesCount}
        minValue={Math.floor(
          settings.fieldSize[0] * settings.fieldSize[1] * 0.15,
        )}
        maxValue={Math.floor(
          settings.fieldSize[0] * settings.fieldSize[1] * 0.25,
        )}
        onChange={onMinesSliderChange}
      />
      <MenuButton
        onClick={() => {
          if (currentLocaleIndex < locales.length - 1)
            i18n.changeLanguage(locales[currentLocaleIndex + 1].code);
          if (currentLocaleIndex === locales.length - 1)
            i18n.changeLanguage(locales[0].code);
        }}
      >
        {t("settings.languageButton")}
        <img
          src={locales[currentLocaleIndex].path}
          alt={locales[currentLocaleIndex].code}
          width="30px"
        />
      </MenuButton>
      <MenuButton
        onClick={() => setTheme(settings.theme === "dark" ? "light" : "dark")}
      >
        {t("settings.themeButton")}
        <AnimatePresence initial={false} mode="wait">
          {settings.theme === "dark" && (
            <motion.span
              initial={{ y: 50 }}
              animate={{
                y: 0,
              }}
              exit={{ y: -50 }}
              key="dark"
            >
              <FaMoon />
            </motion.span>
          )}
          {settings.theme === "light" && (
            <motion.span
              initial={{ y: 50 }}
              animate={{
                y: 0,
              }}
              exit={{ y: -50 }}
              key="sun"
            >
              <FaSun />
            </motion.span>
          )}
        </AnimatePresence>
      </MenuButton>
    </Tab>
  );
};

export default Settings;
