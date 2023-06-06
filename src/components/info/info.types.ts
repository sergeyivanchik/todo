import { EInfoColors } from "../../enums/info";

interface IInfoProps {
	color: EInfoColors;
  title: string;
  count: number;
  onClick: () => void;
}

export type { IInfoProps };
