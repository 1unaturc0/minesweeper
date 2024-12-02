import { useActions } from "@/hooks/useActions";
import { RootState } from "@/redux/store";
import { getNewField } from "@/utils/getNewField";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { useSelector } from "react-redux";

const RestartButton = () => {
  const { setField: changeField } = useActions();
  const settings = useSelector((state: RootState) => state.settings);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "r") return;
      setClickCount(clickCount + 1);
      changeField(getNewField(settings));
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [changeField, clickCount, settings]);

  return (
    <motion.button
      key={clickCount}
      animate={{
        rotate: -360,
        transition: {
          rotate: {
            duration: 0.7,
            ease: "backOut",
          },
        },
      }}
      onClick={() => {
        setClickCount(clickCount + 1);
        changeField(getNewField(settings));
      }}
      className="rounded-full border-[3px] border-solid border-primary-b p-1 text-3xl hover:brightness-90"
    >
      <VscDebugRestart />
    </motion.button>
  );
};

export default RestartButton;
