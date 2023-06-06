import { DragEvent, FC } from "react";
import { observer } from "mobx-react-lite";

import { convertDate } from "../../utils";
import Store from "../../store/store";

import { ITaskProps } from "./task.types";

import { Checkbox } from "./checkbox";

import { ReactComponent as BasketIcon } from "../../assets/icons/basket.svg";

import "./task.scss";

const Task: FC<ITaskProps> = observer(
	({ id, title, order, completed, date }) => {
		const {
			remove,
			complete,
			changeCurrentTask,
			currentTask,
			tasks,
			changeTasks,
		} = Store;

		const onRemove = () => remove(id);
		const onComplete = () => complete(id);
		const onDragStart = (e: DragEvent<HTMLDivElement>) => {
			changeCurrentTask({ id, title, order, completed, date });
		};
		const onDragOver = (e: DragEvent<HTMLDivElement>) => {
			e.preventDefault();
		};
		const onDrop = (e: DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			changeTasks(
				tasks.map((t) => {
					if (t.id === id) {
						return { ...t, order: currentTask?.order || t.order };
					}
					if (t.id === currentTask?.id) {
						return { ...t, order };
					}
					return t;
				})
			);
		};

		return (
			<div
				className={`task ${completed ? "completed" : ""}`}
				draggable={true}
				onDragStart={onDragStart}
				onDragOver={onDragOver}
				onDrop={onDrop}
			>
				<Checkbox onClick={onComplete} checked={completed} />
				<div className="task-container">
					<span className="task-title">{title}</span>
					<span className="task-date">{convertDate(date)}</span>
				</div>
				<div className="task-basket" onClick={onRemove}>
					<BasketIcon />
				</div>
			</div>
		);
	}
);

export { Task };
