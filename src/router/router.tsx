import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PublicOnlyRoute from "./PublicOnlyRoute";
import ProtectedRoute from "./ProtectedRoute";
import SignUpPage from "@pages/SignUpPage";
import CategoryPage from "@pages/CategoryPage";
import NewProductPage from "@pages/NewProductPage";
import SignInPage from "@pages/SignInPage";
import HomePage from "@pages/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* <Route index element={<div>Home</div>} /> */}
      <Route index element={<HomePage />} />
      {/* <Route index element={<HomePage />} /> */}
      <Route path="categories" element={<CategoryPage />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="signin" element={<SignInPage />} />
        {/* <Route path="product/:id" element={<ProductPage />} /> */}
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="product/new" element={<NewProductPage />} />
        {/* <Route path="wishlist" element={<WishlistPage />} /> */}
        {/* <Route path="transactions" element={<MyTransactionsPage />} /> */}
        {/* <Route path="wishlist" element={<MyWishlistPage />} /> */}
        {/* <Route path="profile" element={<MyProfilePage />} /> */}
        {/* <Route path="chats" element={<MyChatsPage />} /> */}
        {/* <Route path="chats/:chatId" element={<ChatPage />} /> */}
      </Route>
    </Route>
  )
);

export default router;
