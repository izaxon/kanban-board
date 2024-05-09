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
				id: "#backlog",
				title: "Not Started"
			},
			{
				id: "#inprogress",
				title: "In Progress"
			},
			{
				id: "#done",
				title: "Completed"
			}
		];
	}
}
