import { IMenuSliderProps } from "@/interfaces/menu/IMenuSlider";
import { motion, useAnimationFrame } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const MenuSlider = ({
  text,
  value,
  minValue,
  maxValue,
  onChange,
}: IMenuSliderProps) => {
  const minEndRef = useRef<HTMLDivElement | null>(null);
  const maxEndRef = useRef<HTMLDivElement | null>(null);
  const gripRef = useRef<HTMLDivElement | null>(null);
  const [isChanging, setIsChanging] = useState(false);
  const [displayingValue, setDisplayingValue] = useState(value);

  const onPointerDown = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const minEnd = minEndRef.current;
      const maxEnd = maxEndRef.current;
      const grip = gripRef.current;
      if (!minEnd || !maxEnd || !grip) return;

      setIsChanging(true);
      const clientX =
        e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const shift = clientX - grip.getBoundingClientRect().left;
      const gripRadius = grip.offsetWidth / 2;
      const minGripLeft = minEnd.offsetWidth / 2 - gripRadius;
      const maxGripLeft =
        maxEnd.getBoundingClientRect().right -
        minEnd.getBoundingClientRect().left -
        gripRadius -
        maxEnd.offsetWidth / 2;
      let newValue = value;

      const onPointerMove = (e: MouseEvent | TouchEvent) => {
        const clientX =
          e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        let gripLeft = clientX - minEnd.getBoundingClientRect().left - shift;
        gripLeft = gripLeft < minGripLeft ? minGripLeft : gripLeft;
        gripLeft = gripLeft > maxGripLeft ? maxGripLeft : gripLeft;
        grip.style.left = `${gripLeft}px`;
        newValue = Math.round(
          minValue +
            ((maxValue - minValue) / (maxGripLeft - minGripLeft)) *
              (grip.offsetLeft - minGripLeft),
        );
        setDisplayingValue(newValue);
      };

      const onPointerUp = () => {
        setIsChanging(false);
        onChange(newValue);
        document.onmousemove = null;
        document.ontouchmove = null;
        document.onmouseup = null;
        document.ontouchend = null;
      };

      document.onmousemove = onPointerMove;
      document.ontouchmove = onPointerMove;
      document.onmouseup = onPointerUp;
      document.ontouchend = onPointerUp;
    },
    [value, minValue, maxValue, onChange],
  );

  useAnimationFrame(
    !isChanging
      ? () => {
          const minEnd = minEndRef.current;
          const maxEnd = maxEndRef.current;
          const grip = gripRef.current;
          if (!minEnd || !maxEnd || !grip) return;
          const gripRadius = grip.offsetWidth / 2;
          const minGripLeft = minEnd.offsetWidth / 2 - gripRadius;
          const maxGripLeft =
            maxEnd.getBoundingClientRect().right -
            minEnd.getBoundingClientRect().left -
            maxEnd.offsetWidth / 2 -
            gripRadius;
          let gripLeft =
            minGripLeft +
            ((maxGripLeft - minGripLeft) / (maxValue - minValue)) *
              (value - minValue);
          gripLeft = gripLeft < minGripLeft ? minGripLeft : gripLeft;
          gripLeft = gripLeft > maxGripLeft ? maxGripLeft : gripLeft;
          grip.style.left = `${gripLeft}px`;
        }
      : () => {},
  );

  useEffect(() => {
    if (!gripRef.current) return;
    gripRef.current.onmousedown = onPointerDown;
    gripRef.current.ontouchstart = onPointerDown;
  }, [onPointerDown]);

  useEffect(() => setDisplayingValue(value), [value]);

  return (
    <div className="group flex w-full items-center justify-between gap-4 p-5 text-xl transition-all duration-300 hover:bg-primary-c hover:text-secondary-a sm:px-14 sm:text-2xl sm:hover:pl-20">
      <p>{text}</p>
      <div className="relative flex h-1 w-[130px] items-center justify-between rounded-l-full rounded-r-full bg-primary-c text-xl group-hover:bg-secondary-a">
        <div ref={minEndRef} className="relative h-3 w-3 rounded-sm bg-inherit">
          <div className="absolute left-[-50%] top-3">{minValue}</div>
        </div>
        <div ref={maxEndRef} className="relative h-3 w-3 rounded-sm bg-inherit">
          <div className="absolute left-[-50%] top-3">{maxValue}</div>
        </div>
        <motion.div
          ref={gripRef}
          whileTap={{ filter: "brightness(80%)" }}
          whileHover={{ filter: "brightness(80%)" }}
          className="absolute z-10 h-3 w-3 rounded-sm bg-primary-a outline outline-secondary-a"
        >
          <div className="absolute -top-6 left-[-50%]">{displayingValue}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default MenuSlider;
