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
		return !this.sort
			? this.tasks
			: this.sort === ESort.completed
			? this.completed
			: this.incompleted;
	}

	remove = async (id: ITask["id"]) => {
		try {
			await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`);

			this.tasks = this.tasks.filter((t) => t.id !== id);
		} catch (err) {
			console.error(err);
		}
	};

	add = async (task: ITask) => {
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, task);

			this.tasks.unshift(task);
		} catch (err) {
			console.error(err);
		}
	};

	change = async (task: ITask) => {
		try {
			const { data } = await axios.patch(
				`${process.env.REACT_APP_API_URL}/tasks/${task.id}`,
				task
			);

			this.tasks = this.tasks.map((t) =>
				t.id === task.id ? data : t
			);
		} catch (err) {
			console.error(err);
		}
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
		const hasSearch = !!searchValue ? `&title_like=${searchValue}` : "";

		try {
			this.isLoading = true;
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_URL}/tasks?_sort=order&_order=desc${hasSearch}`
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
