export interface IMenuSliderProps {
  text: string;
  value: number;
  minValue: number;
  maxValue: number;
  onChange: (value: number) => void;
}
