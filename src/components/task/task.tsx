import { DragEvent, FC } from "react";
import { observer } from "mobx-react-lite";

import { convertDate } from "../../utils";
import Store from "../../store/store";

import { ITaskProps } from "./task.types";
import { ITask } from "../../types";

import { Checkbox } from "./checkbox";

import { ReactComponent as BasketIcon } from "../../assets/icons/basket.svg";

import "./task.scss";

const Task: FC<ITaskProps> = observer(
	({ id, title, order, completed, date }) => {
		const {
			remove,
			change,
			changeCurrentTask,
			currentTask,
			tasks,
			changeTasks,
		} = Store;

		const onRemove = () => remove(id);
		const onComplete = () =>
			change({ id, title, completed: !completed, date, order });
		const onDragStart = (e: DragEvent<HTMLDivElement>) => {
			changeCurrentTask({ id, title, order, completed, date });
		};
		const onDragOver = (e: DragEvent<HTMLDivElement>) => {
			e.preventDefault();
		};
		const onDrop = async (e: DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			await change({
				id,
				completed,
				order: (currentTask as ITask).order,
				date,
				title,
			});
			await change({ ...(currentTask as ITask), order });
			changeTasks(
				tasks
					.map((t) => {
						if (t.id === id) {
							return { ...t, order: (currentTask as ITask).order };
						}
						if (t.id === currentTask?.id) {
							return { ...t, order };
						}
						return t;
					})
					.sort((a, b) => b.order - a.order)
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
