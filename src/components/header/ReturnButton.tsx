import { PiKeyReturnFill } from "react-icons/pi";
import { useActions } from "@/hooks/useActions";
import { KeyboardEvent } from "../../interfaces/header/ReturnButton";
import { useEffect } from "react";

const ReturnButton = () => {
  const { changeTab } = useActions();

  const onClick = () => {
    changeTab("main");
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") changeTab("main");
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [changeTab]);

  return (
    <button
      onClick={onClick}
      className="text-4xl transition-transform duration-300 hover:scale-110 hover:brightness-90"
    >
      <PiKeyReturnFill />
    </button>
  );
};

export default ReturnButton;
