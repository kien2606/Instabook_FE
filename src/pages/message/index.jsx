import { messageSelector, setUsers } from "../../features/message/messageSlice";
import { useDispatch, useSelector } from "react-redux";

import ContactField from "../../components/message/ContactField";
import NearMeIcon from "@mui/icons-material/NearMe";
import React from "react";
import SearchNew from "../../components/message/SearchNew";
import { authSelector } from "../../features/auth/authSlice";
import { getDataApi } from "../../utils/fetchData";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function Index() {
  const { responseData } = useSelector(authSelector);
  const messageState = useSelector(messageSelector);
  const [openSearch, setOpenSearch] = useState(false);
  const [usersSearch, setUsersSearch] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmitSearch = (value) => {
    if (value && responseData.token) {
      getDataApi(`search?username=${value}`, responseData.token)
        .then((res) => {
          setUsersSearch(
            res.data.users.filter((user) => user._id !== responseData.user._id)
          );
        })
        .catch((error) => console.log(error.response.data.msg));
    } else {
      setUsersSearch([]);
    }
  };

  const handleAddUser = (value) => {
    setUsersSearch([]);
    setOpenSearch(false);
    if (messageState.users.every((user) => user._id !== value._id)) {
      dispatch(setUsers({ value }));
    }
    return history.push(`/message/${value._id}`);
  };
  return (
    <div className="message_main_page">
      <div className="left_contact_field">
        <ContactField
          setOpenSearch={setOpenSearch}
          users={messageState.users}
        />
      </div>
      <div className="message_icon">
        <div className="wrapper_message_icon">
          <NearMeIcon sx={{ fontSize: "50px" }} />
        </div>
        <div className="intro_message_icon">
          <p>Your Messages</p>
          <p>Send private photos and messages to a friend or group</p>
        </div>
      </div>
      {openSearch && (
        <SearchNew
          setOpenSearch={setOpenSearch}
          onSubmitSearch={handleSubmitSearch}
          users={usersSearch}
          addUser={handleAddUser}
        />
      )}
    </div>
  );
}

export default Index;
