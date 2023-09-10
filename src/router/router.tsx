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
import { User } from "api/user";
import HomePage from "@pages/HomePage";
import MyProfilePage from "@pages/MyProfilePage";
import FallbackPage from "@pages/FallbackPage";

const router = (user: User | undefined) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<PublicOnlyRoute user={user} />}>
          <Route path="signup" element={<SignUpPage />} />
          <Route index path="signin" element={<SignInPage />} />
        </Route>

        <Route element={<ProtectedRoute user={user} />}>
          <Route index element={<HomePage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="product/new" element={<NewProductPage />} />
          {/* <Route path="product/:id" element={<ProductPage />} /> */}
          {/* <Route path="wishlist" element={<WishlistPage />} /> */}
          {/* <Route path="transactions" element={<MyTransactionsPage />} /> */}
          {/* <Route path="wishlist" element={<MyWishlistPage />} /> */}
          <Route path="profile" element={<MyProfilePage />} />
          {/* <Route path="chats" element={<MyChatsPage />} /> */}
          {/* <Route path="chats/:chatId" element={<ChatPage />} /> */}
        </Route>

        <Route path="*" element={<FallbackPage />} />
      </Route>
    )
  );

export default router;
