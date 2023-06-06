import { makeAutoObservable } from "mobx";

import { ITask } from "../types";

import { ESort } from "../enums/sort";

class Store {
	tasks: ITask[] = [
		{
			id: 1686060062024,
			order: 1686060062024,
			title: "Task 1",
			date: 1686060062024,
			completed: true,
		},
		{
			id: 1686060091868,
			order: 1686060091868,
			title: "Task 2",
			date: 1686060091868,
			completed: false,
		},
		{
			id: 1686059959881,
			order: 1686059959881,
			title:
				"Task 3 Task 3 Task 3 Task 3 Task 3 Task 3 Task 3 Task 3 Task 3 Task 3 Task 3 Task 3",
			date: 1686059959881,
			completed: false,
		},
	];
	sort: null | ESort = null;
	currentTask: ITask | null = null;
	searchValue: string = "";

	constructor() {
		makeAutoObservable(this);
	}

	get completed() {
		return this.tasks.filter((t) => t.completed);
	}

	get incompleted() {
		return this.tasks.filter((t) => !t.completed);
	}

	get sortedTasks() {
		let currentTasks = !this.sort
			? this.tasks
			: this.sort === ESort.completed
			? this.completed
			: this.incompleted;

		return currentTasks
			.slice()
			.sort((a, b) => a.order - b.order)
			.filter((t) => t.title.includes(this.searchValue));
	}

	remove = (id: ITask["id"]) => {
		this.tasks = this.tasks.filter((t) => t.id !== id);
	};

	add = (task: ITask) => {
		this.tasks.push(task);
	};

	complete = (id: ITask["id"]) => {
		this.tasks = this.tasks.map((t) =>
			t.id === id ? { ...t, completed: !t.completed } : t
		);
	};

	changeSort = (value: ESort) => {
		this.sort = this.sort === value ? null : value;
	};

	changeCurrentTask = (task: ITask) => {
		this.currentTask = task;
	};

	changeTasks = (tasks: ITask[]) => {
		this.tasks = tasks;
	};

	setSearchValue = (value: string) => {
		this.searchValue = value;
	};
}

const store = new Store();

export default store;
