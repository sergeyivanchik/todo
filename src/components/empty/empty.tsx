import { FC } from "react";

import { IEmptyProps } from "./empty.types";

import { ReactComponent as EmptyIcon } from "../../assets/icons/empty.svg";

import "./empty.scss";

const Empty: FC<IEmptyProps> = ({ title, subTitle }) => {
	return (
		<div className="empty">
			<div className="empty-container">
				<EmptyIcon />
				<div className="empty-info">
					<span className="empty-title">{title}</span>
					<span>{subTitle}</span>
				</div>
			</div>
		</div>
	);
};

export { Empty };
