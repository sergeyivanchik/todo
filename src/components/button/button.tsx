import { FC } from "react";

import { IButtonProps } from "./button.types";

import "./button.scss";

const Button: FC<IButtonProps> = ({ title, onClick }) => {
	return (
		<div className="button" onClick={onClick}>
			{title}
		</div>
	);
};

export { Button };
