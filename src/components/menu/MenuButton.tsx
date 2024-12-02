import { IMenuButtonProps } from "../../interfaces/menu/IMenuButton";

const MenuButton = ({ children, onClick }: IMenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full justify-center gap-4 overflow-hidden py-5 transition-all duration-300 hover:bg-primary-c hover:text-secondary-a sm:justify-start sm:px-14 sm:hover:pl-20"
    >
      {children}
    </button>
  );
};

export default MenuButton;
