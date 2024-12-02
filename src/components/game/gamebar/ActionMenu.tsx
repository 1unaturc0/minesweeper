import { useActions } from "@/hooks/useActions";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { LuFlag, LuBomb } from "react-icons/lu";
import { useSelector } from "react-redux";

const ActionMenu = () => {
  const { setAction } = useActions();
  const action = useSelector((state: RootState) => state.game.action);

  let flagButtonClassName =
    "p-2 rounded-md transition-all duration-300 hover:brightness-[80%]";
  let mineButtonClassName = flagButtonClassName;
  flagButtonClassName +=
    action === "flag" ? " bg-primary-b text-secondary-a" : " bg-secondary-b";
  mineButtonClassName +=
    action === "mine" ? " bg-primary-b text-secondary-a" : " bg-secondary-b";

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "a" || e.key === "d") && action === "mine")
        setAction("flag");
      else if ((e.key === "a" || e.key === "d") && action === "flag")
        setAction("mine");
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [action, setAction]);

  return (
    <div className="flex justify-evenly gap-2 rounded-md border-solid border-primary-c sm:border-2 sm:px-4 sm:py-2">
      <motion.button
        onClick={() => setAction("flag")}
        className={flagButtonClassName}
      >
        <LuFlag />
      </motion.button>
      <motion.button
        onClick={() => setAction("mine")}
        className={mineButtonClassName}
      >
        <LuBomb />
      </motion.button>
    </div>
  );
};

export default ActionMenu;
