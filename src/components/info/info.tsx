import { FC } from "react";

import { IInfoProps } from "./info.types";

import "./info.scss";

const Info: FC<IInfoProps> = ({ count, color, title, onClick }) => {
	return (
		<div className="info" onClick={onClick}>
			<span className={`info-title ${color}`}>{title}</span>
			<span className="info-count">{count}</span>
		</div>
	);
};

export { Info };
