import Column from "./Column.js";

export default class Kanban {
	constructor(root) {
		this.root = root;

		Kanban.columns().forEach(column => {
			const columnView = new Column(column.id, column.title);
			this.root.appendChild(columnView.elements.root);
		});
	}

	static columns() {
		return [
			{
				id: 1,
				// tag: "#backlog",
				title: "Not Started"
			},
			{
				id: 2,
				// tag: "#inprogress",
				title: "In Progress"
			},
			{
				id: 3,
				// tag: "#done",
				title: "Completed"
			}
		];
	}
}
