import { observer } from "mobx-react-lite";

import Store from "../../store/store";

import { EInfoColors, ESort } from "../../enums";

import { Info } from "../../components";

import "./counts.scss";

const Counts = observer(() => {
	const { completed, incompleted, changeSort } = Store;

	return (
		<div className="counts">
			<Info
				color={EInfoColors.blue}
				title="Incompleted"
				count={incompleted.length}
				onClick={() => changeSort(ESort.incompleted)}
			/>
			<Info
				color={EInfoColors.purple}
				title="Completed"
				count={completed.length}
				onClick={() => changeSort(ESort.completed)}
			/>
		</div>
	);
});

export { Counts };
