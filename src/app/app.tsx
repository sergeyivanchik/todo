import { Counts, Layout, Tasks, Form } from "../modules";

import "./app.scss";

const App = () => {
	return (
		<Layout>
			<Form />
			<Counts />
			<Tasks />
		</Layout>
	);
};

export { App };
