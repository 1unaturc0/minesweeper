import { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { GiLostLimb, GiTrophy } from "react-icons/gi";

const GameStatus = () => {
  const status = useSelector((state: RootState) => state.game.status);

  const className = "text-3xl flex justify-center sm:text-5xl";

  return (
    <AnimatePresence>
      {status === "victory" && (
        <motion.div
          initial={{ y: 350 }}
          animate={{ y: 0 }}
          exit={{ y: 350 }}
          transition={{ ease: "easeInOut" }}
          key="victory"
          className={className}
        >
          <GiTrophy />
        </motion.div>
      )}
      {status === "defeat" && (
        <motion.div
          initial={{ x: 350 }}
          animate={{ x: 0 }}
          exit={{ x: 350 }}
          transition={{ ease: "easeInOut" }}
          key="defeat"
          className={className}
        >
          <GiLostLimb />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameStatus;
