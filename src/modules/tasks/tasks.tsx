import { observer } from "mobx-react-lite";

import Store from "../../store/store";

import { EEmptyTasks, ESort } from "../../enums";

import { Empty, Input, Task } from "../../components";

import { emptyData } from "./tasks.constants";

import "./tasks.scss";

const Tasks = observer(() => {
	const { sortedTasks, sort, setSearchValue, searchValue } = Store;

	const hasTasks =
		!!sortedTasks.length && sortedTasks.map((t) => <Task {...t} key={t.id} />);
	const hasEmpty =
		!sortedTasks.length &&
		((!sort && !searchValue && <Empty {...emptyData[EEmptyTasks.default]} />) ||
			(sort === ESort.completed && (
				<Empty {...emptyData[EEmptyTasks.completed]} />
			)) ||
			(sort === ESort.incompleted && (
				<Empty {...emptyData[EEmptyTasks.incompleted]} />
			)) ||
			(!!searchValue && <Empty {...emptyData[EEmptyTasks.search]} />));
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
