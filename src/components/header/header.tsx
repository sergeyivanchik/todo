import { FC } from "react";

import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";

import "./header.scss";

const Header: FC = () => {
	return (
		<div className="header">
			<LogoIcon />
		</div>
	);
};

export { Header };
