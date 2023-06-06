import { FC, PropsWithChildren } from "react";

import { Header } from "../../components";

import "./layout.scss";

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="layout">
			<Header />
			<div className="layout-container">{children}</div>
		</div>
	);
};

export { Layout };
