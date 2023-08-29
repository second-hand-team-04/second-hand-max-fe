import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PublicOnlyRoute from "./PublicOnlyRoute";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* <Route index element={<HomePage />} /> */}
      {/* <Route path="category" element={<CategoryPage />} /> */}

      <Route element={<PublicOnlyRoute />}>
        {/* <Route path="signin" element={<SignInPage />} /> */}
        {/* <Route path="signup" element={<SignUpPage />} /> */}
      </Route>

      <Route element={<ProtectedRoute />}>
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
