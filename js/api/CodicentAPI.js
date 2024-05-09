export default class CodicentAPI {
   codicent = undefined;

   constructor({ codicent }) {
      this.codicent = codicent;
      window.Codicent.init({
         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjJlMTliNjNmLWQxNDgtNGRmMi04MzMxLTZlZGE3ZTQzNjQ1ZCIsIm5pY2tuYW1lIjoiam9oYW4iLCJ1c2VySWQiOiIyZTE5YjYzZi1kMTQ4LTRkZjItODMzMS02ZWRhN2U0MzY0NWQiLCJwcm9qZWN0Ijoia2FuYmFuIiwibmJmIjoxNzE1MjUxNzIzLCJleHAiOjE3NDY3ODc3MjMsImlhdCI6MTcxNTI1MTcyM30.p8CwUP5nfLTLl3UXvgk3-xeCsnGI1D782Rf4g5bx-Bc",
         // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjJlMTliNjNmLWQxNDgtNGRmMi04MzMxLTZlZGE3ZTQzNjQ1ZCIsIm5pY2tuYW1lIjoiam9oYW4iLCJ1c2VySWQiOiIyZTE5YjYzZi1kMTQ4LTRkZjItODMzMS02ZWRhN2U0MzY0NWQiLCJwcm9qZWN0IjoiZGVtby1wbGFubmVyIiwibmJmIjoxNzE1MjQ1ODQzLCJleHAiOjE3NDY3ODE4NDMsImlhdCI6MTcxNTI0NTg0M30.xCC2VBHR0CDaZq2vynLyovsXeXjWFMqIEiieWy5IMgA",
         baseUrl: "https://localhost:5001/"
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
