import CodicentAPI from "./CodicentAPI.js";

export default class KanbanAPI {
	static async getItems(tag) {
		return await codicent.getColumn(tag);
	}

	static insertItem(tag, content) {
		return codicent.addMessage(content, undefined, tag).then(id => {
			return { id, content, tag };
		});
	}

	static moveItem(itemId, newProps) {
		const tag = newProps.columnId;
		codicent.addMessage(`${newProps.content}`, itemId, tag);
	}

	static updateItem(itemId, newProps) {
		codicent.addMessage(`${newProps.content}`, itemId, newProps.tag);
	}

	static deleteItem(itemId, content) {
		codicent.addMessage(content, itemId, `#archived`).then(id => console.log(`Deleted item ${id}`));
	}
}

let codicent = new CodicentAPI({ codicent: "kanban" });