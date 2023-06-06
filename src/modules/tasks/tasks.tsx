import { observer } from "mobx-react-lite";

import Store from "../../store/store";

import { ESort } from "../../enums";

import { Empty, Input, Task } from "../../components";

import "./tasks.scss";

const Tasks = observer(() => {
	const { sortedTasks, sort, setSearchValue, searchValue } = Store;

	const hasTasks =
		!!sortedTasks.length && sortedTasks.map((t) => <Task {...t} key={t.id} />);
	const hasEmpty =
		!sortedTasks.length &&
		((!sort && !searchValue && <Empty />) ||
			(sort === ESort.completed && (
				<Empty
					title="You don't have completed tasks yet"
					subTitle="Finish at least one task"
				/>
			)) ||
			(sort === ESort.incompleted && (
				<Empty
					title="You have no incompleted tasks"
					subTitle="Add a new task or change the status of others"
				/>
			)) ||
			(!!searchValue && (
				<Empty
					title="No results found"
					subTitle="Change your search criteria"
				/>
			)));
	const hasTitle = !sort
		? "All"
		: sort === ESort.completed
		? "Completed"
		: "Incompleted";

	return (
		<div className="tasks">
			<Input
				onChange={setSearchValue}
				value={searchValue}
				placeholder="Search"
			/>
			<div className="tasks-title">{hasTitle} tasks</div>
			{hasTasks}
			{hasEmpty}
		</div>
	);
});

export { Tasks };
