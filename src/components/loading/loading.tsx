import { FC } from "react";

import "./loading.scss";

const Loading: FC = () => {
	return (
		<div className='loading-wrapper'>
			<div className="loading">
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);
};

export { Loading };
