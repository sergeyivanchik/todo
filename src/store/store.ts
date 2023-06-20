import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

import { ITask } from "../types";

import { ESort } from "../enums";

class Store {
	tasks: ITask[] = [];
	sort: null | ESort = null;
	currentTask: ITask | null = null;
	isLoading: boolean = false;

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

		return currentTasks.slice().sort((a, b) => a.order - b.order);
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

	fetchTasks = async (searchValue?: string) => {
		const hasSearch = !!searchValue ? `?title_like=${searchValue}` : "";

		try {
			this.isLoading = true;
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_URL}/tasks${hasSearch}`
			);
			runInAction(() => {
				this.tasks = data;
				this.isLoading = false;
			});
		} catch (err) {
			console.error(err);
		}
	};
}

const store = new Store();

export default store;
