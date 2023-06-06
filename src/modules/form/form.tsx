import { useState } from "react";

import Store from "../../store/store";

import { Button, Input } from "../../components";

import "./form.scss";

const Form = () => {
	const [value, setValue] = useState("");
	const [error, setError] = useState("");

	const { add } = Store;

	const addTask = () => {
		if (!value) {
			setError("Please fill in the field");
			return;
		}

		add({
			id: new Date().getTime(),
			order: new Date().getTime(),
			title: value,
			date: new Date().getTime(),
			completed: false,
		});
		setValue("");
	};
	const onChange = (value: string) => {
		!!error && setError("");
		setValue(value);
	};

	return (
		<div className="form">
			<Input
				value={value}
				onChange={onChange}
				error={error}
				placeholder="Add task"
			/>
			<div className="form-button">
				<Button title="Add" onClick={addTask} />
			</div>
		</div>
	);
};

export { Form };
