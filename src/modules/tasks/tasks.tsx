import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Store from "../../store/store";
import { useDebounce } from "../../hooks";

import { EEmptyTasks, ESort } from "../../enums";

import { Empty, Input, Loading, Task } from "../../components";

import { emptyData } from "./tasks.constants";

import "./tasks.scss";

const Tasks = observer(() => {
	const [searchValue, setSearchValue] = useState("");
	const debouncedSearchValue = useDebounce(searchValue);

	const { sortedTasks, sort, fetchTasks, isLoading } = Store;

	useEffect(() => {
		fetchTasks(debouncedSearchValue);
	}, [debouncedSearchValue]);

	const hasLoading = isLoading && <Loading />;
	const hasTasks =
		!isLoading &&
		!!sortedTasks.length &&
		sortedTasks.map((t) => <Task {...t} key={t.id} />);
	const hasEmpty =
		!isLoading &&
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
				disabled={!searchValue && isLoading}
			/>
			<div className="tasks-title">{hasTitle} tasks</div>
			{hasLoading}
			{hasTasks}
			{hasEmpty}
		</div>
	);
});

export { Tasks };
