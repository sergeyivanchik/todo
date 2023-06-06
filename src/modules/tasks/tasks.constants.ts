import { EEmptyTasks } from "../../enums";
import { TEmptyTasks } from "./tasks.types";

const emptyData: TEmptyTasks = {
	[EEmptyTasks.default]: {
		title: "You don't have any registered tasks yet",
		subTitle: "Create tasks and organize your affairs",
	},
	[EEmptyTasks.completed]: {
		title: "You don't have completed tasks yet",
		subTitle: "Finish at least one task",
	},
	[EEmptyTasks.incompleted]: {
		title: "You have no incompleted tasks",
		subTitle: "Add a new task or change the status of others",
	},
	[EEmptyTasks.search]: {
		title: "No results found",
		subTitle: "Change your search criteria",
	},
};

export { emptyData };
