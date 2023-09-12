import CategoryPage from "@pages/CategoryPage";
import EditProductItemPage from "@pages/EditProductItemPage";
import FallbackPage from "@pages/FallbackPage";
import HomePage from "@pages/HomePage";
import MyProfilePage from "@pages/MyProfilePage";
import NewProductPage from "@pages/NewProductItemPage";
import ProductItemPage from "@pages/ProductItemPage";
import SignInPage from "@pages/SignInPage";
import SignUpPage from "@pages/SignUpPage";
import { User } from "api/user";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import Routes from "./Routes";

const router = (user: User | undefined) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<PublicOnlyRoute user={user} />}>
          <Route index path={Routes.SIGNIN} element={<SignInPage />} />
          <Route path={Routes.SIGNUP} element={<SignUpPage />} />
        </Route>

        <Route element={<ProtectedRoute user={user} />}>
          {/* TODO: `/items?region=1&category=1` 형태로 변경 */}
          <Route index element={<HomePage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="profile" element={<MyProfilePage />} />
          <Route path="product/new" element={<NewProductPage />} />
          <Route path="product/:id" element={<ProductItemPage />} />
          <Route path="product/:id/edit" element={<EditProductItemPage />} />
          {/* <Route path="wishlist" element={<WishlistPage />} /> */}
          {/* <Route path="transactions" element={<MyTransactionsPage />} /> */}
          {/* <Route path="wishlist" element={<MyWishlistPage />} /> */}
          {/* <Route path="chats" element={<MyChatsPage />} /> */}
          {/* <Route path="chats/:chatId" element={<ChatPage />} /> */}
        </Route>

        <Route path="*" element={<FallbackPage />} />
      </Route>
    )
  );

export default router;
