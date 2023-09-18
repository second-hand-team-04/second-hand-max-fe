import authHandlers from "./handlers/authHandlers";
import categoriesHandlers from "./handlers/categoriesHandlers";
import productItemHandlers from "./handlers/productItemHandlers";
import regionsHandlers from "./handlers/regionsHandlers";
import userHandlers from "./handlers/userHandlers";

export default [
  ...authHandlers,
  ...userHandlers,
  ...productItemHandlers,
  ...categoriesHandlers,
  ...regionsHandlers,
];
