export default class CodicentAPI {
   codicent = undefined;

   constructor({ codicent }) {
      this.codicent = codicent;
      window.Codicent.init({
         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjJlMTliNjNmLWQxNDgtNGRmMi04MzMxLTZlZGE3ZTQzNjQ1ZCIsIm5pY2tuYW1lIjoiam9oYW4iLCJ1c2VySWQiOiIyZTE5YjYzZi1kMTQ4LTRkZjItODMzMS02ZWRhN2U0MzY0NWQiLCJwcm9qZWN0Ijoia2FuYmFuIiwibmJmIjoxNzE1MjUxNzIzLCJleHAiOjE3NDY3ODc3MjMsImlhdCI6MTcxNTI1MTcyM30.p8CwUP5nfLTLl3UXvgk3-xeCsnGI1D782Rf4g5bx-Bc",
         // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjJlMTliNjNmLWQxNDgtNGRmMi04MzMxLTZlZGE3ZTQzNjQ1ZCIsIm5pY2tuYW1lIjoiam9oYW4iLCJ1c2VySWQiOiIyZTE5YjYzZi1kMTQ4LTRkZjItODMzMS02ZWRhN2U0MzY0NWQiLCJwcm9qZWN0IjoiZGVtby1wbGFubmVyIiwibmJmIjoxNzE1MjQ1ODQzLCJleHAiOjE3NDY3ODE4NDMsImlhdCI6MTcxNTI0NTg0M30.xCC2VBHR0CDaZq2vynLyovsXeXjWFMqIEiieWy5IMgA",
         baseUrl: "https://localhost:5001/"
      });

      // this.init();
   }

   init = () => {
      this.save(this.update());
      window.Codicent.getMessages({ search: `@${this.codicent} #backlog`, beforeTimestamp: new Date() }).then(messages => {
         // messages.forEach(message => KanbanAPI.insertItem(1, message.content));
         messages = messages.map(m => ({ id: m.id, content: m.content.replace(`@${this.codicent} #backlog`, "") }));
         console.log(messages);
         const canban = this.read();
         canban[0].items = [...messages];
         this.save(canban);
      });
      window.Codicent.getMessages({ search: `@${this.codicent} #inprogress`, beforeTimestamp: new Date() }).then(messages => {
         // messages.forEach(message => KanbanAPI.insertItem(2, message.content));
         messages = messages.map(m => ({ id: m.id, content: m.content.replace(`@${this.codicent} #inprogress`, "") }));
         console.log(messages);
         const canban = this.read();
         canban[1].items = [...messages];
         this.save(canban);
      });
      window.Codicent.getMessages({ search: `@${this.codicent} #done`, beforeTimestamp: new Date() }).then(messages => {
         // messages.forEach(message => KanbanAPI.insertItem(3, message.content));
         messages = messages.map(m => ({ id: m.id, content: m.content.replace(`@${this.codicent} #done`, "") }));
         console.log(messages);
         const canban = this.read();
         canban[2].items = [...messages];
         this.save(canban);
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

   update = () => {
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

   read() {
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

   save(data) {
      localStorage.setItem("kanban-data", JSON.stringify(data));
   }
}
