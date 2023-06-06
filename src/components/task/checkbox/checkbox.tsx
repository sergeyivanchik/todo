import { FC } from "react";

import { ICheckboxProps } from "./checkbox.types";

import "./checkbox.scss";

import { ReactComponent as CheckboxIcon } from "../../../assets/icons/checkbox.svg";

const Checkbox: FC<ICheckboxProps> = ({ onClick, checked }) => {
	return (
		<div className={`checkbox ${checked ? "checked" : "unchecked"}`} onClick={onClick}>
			<CheckboxIcon />
		</div>
	);
};

export { Checkbox };
