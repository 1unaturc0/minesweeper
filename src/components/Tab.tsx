import { motion } from "framer-motion";
import { ITabProps } from "../interfaces/ITab";

const Tab = ({ children, width }: ITabProps) => {
  const variants = {
    toggledOff: {
      width: 0,
      height: "80%",
      transition: {
        width: {
          ease: "easeIn",
        },
        height: {
          delay: 0.2,
          ease: "easeOut",
        },
      },
    },
    toggledOn: {
      width,
      height: "auto",
      transition: {
        width: {
          delay: 0.2,
          ease: "easeOut",
        },
        height: {
          ease: "easeIn",
        },
      },
    },
  };

  return (
    <motion.div
      initial="toggledOff"
      animate="toggledOn"
      exit="toggledOff"
      transition={{ duration: 0.2 }}
      variants={variants}
      style={{ width }}
      className="flex max-w-[800px] flex-col gap-4 overflow-hidden rounded-md border-4 border-solid border-primary-c text-left text-[1.5rem] font-bold leading-none tracking-wide transition-colors duration-300"
    >
      {children}
    </motion.div>
  );
};

export default Tab;
