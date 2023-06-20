import { FC } from "react";

import { IInputProps } from "./input.types";

import "./input.scss";

const Input: FC<IInputProps> = ({
	onChange,
	value,
	error,
	placeholder,
	disabled,
}) => {
	const hasError = !!error && <span className="error">{error}</span>;

	return (
		<div className="input-wrapper">
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className={!!error ? "input-error" : ""}
        disabled={disabled}
			/>
			{hasError}
		</div>
	);
};

export { Input };
