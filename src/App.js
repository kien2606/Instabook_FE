import "react-toastify/dist/ReactToastify.css";

import { Route, BrowserRouter as Router } from "react-router-dom";
import { authSelector, refreshToken } from "./features/auth/authSlice";
import { gettingPostProcess, postSelector } from "./features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Header from "./components/header/Header";
import Home from "./pages/home";
import Loading from "./components/Loading";
import Login from "./pages/login";
import PageRender from "./privateRouter/PageRender";
import PrivateRouter from "./privateRouter/PrivateRouter";
import Register from "./pages/register";
import SocketClient from "./SocketClient";
import StatusModal from "./components/StatusModal";
import { gettingNotifies } from "./features/notify/notifySlice";
import io from "socket.io-client";
import { setSocket } from "./features/socket/socketSlice";
import { statusSelector } from "./features/status/statusSlice";
import { useEffect } from "react";

function App() {
  const { loading, responseData } = useSelector(authSelector);
  const postState = useSelector(postSelector);
  const statusState = useSelector(statusSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch(setSocket(socket));
    return () => socket.close();
  }, [dispatch]);

  // get post
  useEffect(() => {
    if (responseData?.token) {
      dispatch(gettingPostProcess({ token: responseData.token, page: 1 }));
      dispatch(gettingNotifies({ token: responseData.token }));
    }
  }, [dispatch, responseData?.token]);

  return (
    <Router>
      {loading && <Loading />}
      {postState.loading && responseData?.token && <Loading />}

      <input type="checkbox" id="theme" />
      <Box className="App">
        {responseData?.token && <Header />}
        <Box className="main">
          {responseData?.token && <SocketClient />}
          {statusState.isOpen && <StatusModal />}
          <Route
            exact
            path="/"
            component={responseData?.token ? Home : Login}
          />
          <Route exact path="/register" component={Register} />
          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
