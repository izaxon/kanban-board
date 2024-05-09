export default class CodicentAPI {
   codicent = undefined;

   constructor({ codicent }) {
      this.codicent = codicent;
      window.Codicent.init({
         token: "ENTER TOKEN HERE",
         baseUrl: "https://codicent.com/"
      });
   }

   getColumn = (tag) => {
      return window.Codicent.getMessages({ search: `@${this.codicent} ${tag}`, beforeTimestamp: new Date() }).then(messages => {
         return messages.map(m => ({ id: m.id, content: m.content.replace(`@${this.codicent} ${tag}`, "").trim(), tag }));
      });
   }

   addMessage = (message, parentId, tag) => {
      return window.Codicent.postMessage({ message: `@${this.codicent} ${tag} ${message}`, parentId });
   }
}
