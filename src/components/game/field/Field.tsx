import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import CellsRow from "./CellsRow";
import { useEffect, useRef } from "react";

const Field = () => {
  const rowsAmount = useSelector(
    (state: RootState) => state.settings.fieldSize[0],
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);

  const onPointerDown = (e: MouseEvent | TouchEvent) => {
    const container = containerRef.current;
    const field = fieldRef.current;
    if (!container || !field) return;

    e.preventDefault();

    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

    const minPosition = [
      container.clientWidth - field.scrollWidth,
      container.clientHeight - field.scrollHeight,
    ];
    const maxPosition = [0, 0];
    const initialMousePosition = [clientX, clientY];

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX =
        e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const clientY =
        e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
      const newPosition = [
        field.offsetLeft + (clientX - initialMousePosition[0]),
        field.offsetTop + (clientY - initialMousePosition[1]),
      ];
      initialMousePosition[0] = clientX;
      initialMousePosition[1] = clientY;
      newPosition.forEach((_, i) => {
        newPosition[i] =
          newPosition[i] < minPosition[i] ? minPosition[i] : newPosition[i];
        newPosition[i] =
          newPosition[i] > maxPosition[i] ? maxPosition[i] : newPosition[i];
      });
      field.style.left = `${newPosition[0]}px`;
      field.style.top = `${newPosition[1]}px`;
    };

    const onPointerUp = () => {
      document.onmousemove = null;
      document.ontouchmove = null;
      document.onmouseup = null;
      document.ontouchend = null;
    };

    document.onmousemove = onPointerMove;
    document.ontouchmove = onPointerMove;
    document.onmouseup = onPointerUp;
    document.ontouchend = onPointerUp;
  };

  const cellsRowItems = [];
  for (let i = 0; i < rowsAmount; i++)
    cellsRowItems.push(<CellsRow index={i} key={i} />);

  useEffect(() => {
    if (!fieldRef.current) return;
    fieldRef.current.onmousedown = onPointerDown;
    fieldRef.current.ontouchstart = onPointerDown;
  }, []);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      ref={containerRef}
      className="relative z-10 h-full max-h-[350px] w-full touch-none overflow-hidden rounded-md border-2 border-solid border-primary-b bg-secondary-a hmd:max-h-[400px]"
    >
      <div ref={fieldRef} className="relative flex flex-col">
        {cellsRowItems}
      </div>
    </div>
  );
};

export default Field;
