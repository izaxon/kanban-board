import CodicentAPI from "./CodicentAPI.js";

export default class KanbanAPI {
	static async getItems(columnId) {
		return await codicent.getColumn(this.getTag(columnId));
	}

	static getTag = (columnId) => {
		switch (columnId) {
			case 1:
				return '#backlog';
			case 2:
				return '#inprogress';
			case 3:
				return '#done';
			default:
				return '';
		}
	}

	static insertItem(columnId, content) {
		const tag = this.getTag(columnId);
		return codicent.addMessage(content, undefined, tag).then(id => {
			const data = read();
			const column = data.find(column => column.id == columnId);
			if (!column) {
				throw new Error("Column does not exist.");
			}
			const item = { id, content, tag };
			column.items.push(item);
			save(data);
			return item;
		});
	}

	static insertItemOLD(columnId, content) {
		const data = read();
		const column = data.find(column => column.id == columnId);
		const item = {
			id: Math.floor(Math.random() * 100000),
			content
		};

		if (!column) {
			throw new Error("Column does not exist.");
		}

		column.items.push(item);
		save(data);

		return item;
	}

	static moveItem(itemId, newProps) {
		// const [item, currentColumn, data] = this.getItem(itemId);
		const tag = this.getTag(newProps.columnId);
		codicent.addMessage(`${newProps.content}`, itemId, tag).then(id => {
			// currentColumn.items.splice(currentColumn.items.indexOf(item), 1);
			// item.id = id;
			// targetColumn.items.splice(newProps.position, 0, item);
			// save(data);
		});
	}

	static updateItem(itemId, newProps) {
		// const [item, currentColumn, data] = this.getItem(itemId);
		codicent.addMessage(`${newProps.content}`, itemId, newProps.tag).then(id => {
			// item.id = id;
			// save(data);
		});
	}

	static getItem(itemId) {
		const [item, currentColumn, data] = (() => {
			const data = read();
			for (const column of data) {
				const item = column.items.find(item => item.id == itemId);

				if (item) {
					return [item, column, data];
				}
			}
		})();

		if (!item) {
			throw new Error("Item not found.");
		}

		return [item, currentColumn, data];
	}

	static updateItemOLD(itemId, newProps) {
		const data = read();
		const [item, currentColumn] = (() => {
			for (const column of data) {
				const item = column.items.find(item => item.id == itemId);

				if (item) {
					return [item, column];
				}
			}
		})();

		if (!item) {
			throw new Error("Item not found.");
		}

		// item.content = newProps.content === undefined ? item.content : newProps.content;
		codicent.addMessage(`${newProps.content || item.content}`, itemId, this.getTag(newProps.columnId || currentColumn.id)).then(id => {
			// Update column and position
			if (newProps.columnId !== undefined && newProps.position !== undefined) {
				const targetColumn = data.find(column => column.id == newProps.columnId);

				if (!targetColumn) {
					throw new Error("Target column not found.");
				}

				// Delete the item from it's current column
				currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

				item.id = id;

				// Move item into it's new column and position
				targetColumn.items.splice(newProps.position, 0, item);
			}

			item.id = id;
			save(data);
		});

		// save(data);
	}

	static deleteItem(itemId, content) {
		codicent.addMessage(content, itemId, `#archived`).then(id => console.log(`Deleted item ${id}`));
	}
}

function read() {
	const json = localStorage.getItem("kanban-data");

	if (!json) {
		return [
			{
				id: 1,
				items: []
			},
			{
				id: 2,
				items: []
			},
			{
				id: 3,
				items: []
			},
		];
	}

	return JSON.parse(json);
}

function save(data) {
	localStorage.setItem("kanban-data", JSON.stringify(data));
}

let codicent = new CodicentAPI({ codicent: "kanban" });