import React, { useState } from "react";
import { messageSelector, setUsers } from "../../features/message/messageSlice";
import { useDispatch, useSelector } from "react-redux";

import ContactField from "../../components/message/ContactField";
import ConversationField from "../../components/message/ConversationField";
import SearchNew from "../../components/message/SearchNew";
import { authSelector } from "../../features/auth/authSlice";
import { getDataApi } from "../../utils/fetchData";
import { useHistory } from "react-router-dom";

function Conversation() {
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
          setUsersSearch(res.data.users);
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
      <div className="conversation">
        <ConversationField users={messageState.users} />
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

export default Conversation;
