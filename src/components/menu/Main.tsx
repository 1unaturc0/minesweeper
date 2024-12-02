import MenuButton from "@/components/menu/MenuButton";
import Tab from "@/components/Tab";
import { useActions } from "@/hooks/useActions";
import { useTranslation } from "react-i18next";

const Main = () => {
  const { changeTab } = useActions();
  const { t } = useTranslation();

  return (
    <Tab width={500}>
      <MenuButton onClick={() => changeTab("game")}>
        {t("main.playButton")}
      </MenuButton>
      <MenuButton onClick={() => changeTab("settings")}>
        {t("main.settingsButton")}
      </MenuButton>
    </Tab>
  );
};

export default Main;
