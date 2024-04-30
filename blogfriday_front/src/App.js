import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
// import BaseLayout from "./components/layout/BaseLayout";
import Header from "./components/Header";
import Porductsave from "./components/product/Productsave";
import Search from "./components/search/Search";
import BlogUserProduct from "./components/search/SearchDetail";
import Productlist from "./components/product/Productlist";
import Footer from "./components/Footer";
import PaymentPage from "./components/pay/PaymentPage";
import PaymentCompletePage from "./components/pay/PaymentCompletePage";
import Main from "./components/Main";
import SearchEmpty from "./components/search/SearchEmpty";
import Login from "./components/user/Login";
import Chat from "./components/chat/Chat";
import ChatHome from "./components/chat/ChatHome";
import Chatdot from "./components/chat/Chatdot";
import ChatSet from "./components/chat/ChatSet";
import JoinAdd from "./components/user/JoinAdd";
import Logout from "./components/user/Logout";
import PrivateRoute from "./access/PrivateRoute";
import EditInfo from "./components/user/EditInfo";
import UserRemove from "./components/user/UserRemove";
import BaseLayout from "./components/layout/BaseLayout";
import MyPage from "./components/user/MyPage";
import SearchCategory from "./components/search/searchCategory";
import CartComponent from "./components/cart/Cart";
import FindID from "./components/user/FindID";
import Okuser from "./components/user/Okuser";
import FindPass from "./components/user/FindPass";
import Loginshop from "./components/user/Loginshop";
import ShopUserinfo from "./components/user/ShopUserinfo";
import ShopUserEdit from "./components/user/ShopUserEdit";
import Productbuylist from "./components/product/Productbuylist";
import Productsellist from "./components/product/Productsellist";

function App() {
  const location = useLocation();

  const hideFooterRoutes = [
    "/search/user/product/:product_code", // 여기는 동적 경로로 비교가 필요합니다.
  ];

  // 현재 경로가 hideFooterRoutes에 있는지 확인
  const showFooter = !hideFooterRoutes.some((path) =>
    // 동적 경로가 포함된 비교를 위해 RegExp 사용
    new RegExp(path.replace(/:\w+/g, "\\w+")).test(location.pathname)
  );

  const showLayout = ![
    // user 부분
    "/",
    "/page",
    "/loginshop",
    "/joinadd",
    "/logout",
    "/editinfo",
    "/userRemove",
    "/findid",
    "/okuser",
    "/findpass",

    // chat 부분
    "/chat/home",
    "/chat",
    "/chat/dot",
    "/chat/set",
  ].includes(location.pathname);
  return (
    <div className="app">
      {showLayout && <Header />}

      {showLayout ? (
        <div className="body">
          {/* <div className="body_blank"></div> */}
          <Routes>
            <Route
              path="/shophome"
              element={<PrivateRoute isAuth={false} RouteComponent={Main} />}
            />
            {/* <Route path="/shophome" element={<Main />} /> */}
            {/* <Route path="/mypage" element={<MyPage />} /> */}
            <Route
              path="/mypage"
              element={<PrivateRoute isAuth={true} RouteComponent={MyPage} />}
            />
            {/* <Route path="/chat/list" element={<Login />}></Route> */}
            {/* <Route path="/search/searchempty"element={<SearchEmpty/>} /> */}
            <Route
              path="/search/searchempty"
              element={
                <PrivateRoute isAuth={false} RouteComponent={SearchEmpty} />
              }
            />
            {/* <Route path="/search/:product_name" element={<Search />} /> */}
            <Route
              path="/search/:product_name"
              element={<PrivateRoute isAuth={false} RouteComponent={Search} />}
            />
            {/* <Route path="/searchcategory/:category_name" element={<SearchCategory />}/> */}
            <Route
              path="/searchcategory/:category_name"
              element={
                <PrivateRoute isAuth={false} RouteComponent={SearchCategory} />
              }
            />
            {/* <Route path="/seller/product/list" element={<Productlist />} /> */}
            <Route
              path="/seller/product/list"
              element={
                <PrivateRoute isAuth={true} RouteComponent={Productlist} />
              }
            />
            {/* <Route path="/seller/product/save/:seller_id" element={<Porductsave />}/> */}
            <Route
              path="/seller/product/save/:seller_id"
              element={
                <PrivateRoute isAuth={false} RouteComponent={SearchCategory} />
              }
            />
            {/* <Route path="/buylist" element={<Productbuylist />} /> */}
            <Route
              path="/buylist"
              element={
                <PrivateRoute isAuth={true} RouteComponent={Productbuylist} />
              }
            />
            {/* <Route path="/selllist" element={<Productsellist />} /> */}

            <Route
              path="/selllist"
              element={
                <PrivateRoute isAuth={true} RouteComponent={Productsellist} />
              }
            />

            {/* <Route path="/seller/product/save/:seller_id" element={<Porductsave />}/> */}
            <Route
              path="/seller/product/save"
              element={
                <PrivateRoute isAuth={true} RouteComponent={Porductsave} />
              }
            />

            <Route
              path="/search/user/product/:product_code"
              element={
                <PrivateRoute isAuth={false} RouteComponent={BlogUserProduct} />
              }
            />

            {/* <Route path="/search/user/product/:product_code" element={<BlogUserProduct />}/> */}
            {/* <Route path="/payment/:product_code" element={<PaymentPage />} /> */}

            <Route
              path="/payment/:product_code/:count"
              element={
                <PrivateRoute isAuth={true} RouteComponent={PaymentPage} />
              }
            />

            {/* <Route path="/order/complete" element={<PaymentCompletePage />} /> */}
            <Route
              path="/order/complete"
              element={
                <PrivateRoute
                  isAuth={true}
                  RouteComponent={PaymentCompletePage}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <PrivateRoute isAuth={true} RouteComponent={CartComponent} />
              }
            />

            {/* <Route path="/shopedininfo" element={<ShopUserinfo />} /> */}
            <Route
              path="/shopedininfo"
              element={
                <PrivateRoute isAuth={true} RouteComponent={ShopUserinfo} />
              }
            />

            {/* <Route path="/shopuseredit" element={<ShopUserEdit />} /> */}
            <Route
              path="/shopuseredit"
              element={
                <PrivateRoute isAuth={true} RouteComponent={ShopUserEdit} />
              }
            />
          </Routes>
          {showFooter && <Footer />}
        </div>
      ) : (
        <Routes>
          {/* user 추가 */}
          <Route
            path="/"
            element={<PrivateRoute isAuth={false} RouteComponent={Login} />}
          />
          <Route
            path="/loginshop"
            element={<PrivateRoute isAuth={false} RouteComponent={Loginshop} />}
          />

          {/* <Route
            path="/page"
            element={
              <PrivateRoute isAuth={false} RouteComponent={BaseLayout} />
            }
          /> */}
          <Route
            path="/joinadd"
            element={<PrivateRoute isAuth={false} RouteComponent={JoinAdd} />}
          />
          <Route
            path="/logout"
            element={<PrivateRoute isAuth={true} RouteComponent={Logout} />}
          />
          <Route
            path="/editinfo"
            element={<PrivateRoute isAuth={true} RouteComponent={EditInfo} />}
          />

          <Route
            path="/userRemove"
            element={<PrivateRoute isAuth={true} RouteComponent={UserRemove} />}
          />
          <Route
            path="/findid"
            element={<PrivateRoute isAuth={false} RouteComponent={FindID} />}
          />

          <Route
            path="/okuser"
            element={<PrivateRoute isAuth={false} RouteComponent={Okuser} />}
          />

          <Route
            path="/findpass"
            element={<PrivateRoute isAuth={false} RouteComponent={FindPass} />}
          />

          {/* chat 추가 */}
          {/* <Route path="/chat/home" element={<ChatHome />} /> */}
          <Route
            path="/chat/home"
            element={<PrivateRoute isAuth={true} RouteComponent={ChatHome} />}
          />

          {/* <Route path="/chat" element={<Chat />} /> */}
          <Route
            path="/chat"
            element={<PrivateRoute isAuth={true} RouteComponent={Chat} />}
          />
          {/* <Route path="/chat/dot" element={<Chatdot />} /> */}
          <Route
            path="/chat/dot"
            element={<PrivateRoute isAuth={true} RouteComponent={Chatdot} />}
          />
          {/* <Route path="/chat/set" element={<ChatSet />} /> */}
          <Route
            path="/chat/set"
            element={<PrivateRoute isAuth={true} RouteComponent={ChatSet} />}
          />
        </Routes>
      )}

      {/* {showLayout && <Footer />} */}
    </div>
  );
}

export default App;
