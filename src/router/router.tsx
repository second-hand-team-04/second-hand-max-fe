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
import Routes from "./Routes";

const router = (user: User | undefined) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<PublicOnlyRoute user={user} />}>
          <Route path={Routes.SIGNUP} element={<SignUpPage />} />
          <Route index path={Routes.SIGNIN} element={<SignInPage />} />
        </Route>

        <Route element={<ProtectedRoute user={user} />}>
          <Route index element={<HomePage />} />
          <Route path={Routes.CATEGORIES} element={<CategoryPage />} />
          <Route path={Routes.NEWPRODUCT} element={<NewProductPage />} />
          {/* <Route path={Routes.PRODUCTITEM} element={<ProductPage />} /> */}
          {/* <Route path={Routes.TRANSACTIONS} element={<MyTransactionsPage />} /> */}
          {/* <Route path={Routes.WISHLIST} element={<MyWishlistPage />} /> */}
          <Route path={Routes.PROFILE} element={<MyProfilePage />} />
          {/* <Route path={Routes.CHATS} element={<MyChatsPage />} /> */}
          {/* <Route path={Route.CHAT} element={<ChatPage />} /> */}
        </Route>

        <Route path="*" element={<FallbackPage />} />
      </Route>
    )
  );

export default router;
