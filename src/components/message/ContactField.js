import React, { useEffect } from "react";
import {
  getConversation,
  messageSelector,
} from "../../features/message/messageSlice";
import { useDispatch, useSelector } from "react-redux";

import ContactFieldUser from "./ContactFieldUser";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { authSelector } from "../../features/auth/authSlice";
import { useParams } from "react-router-dom";

function ContactField({ setOpenSearch, users }) {
  const { responseData } = useSelector(authSelector);
  const messageState = useSelector(messageSelector);
  const { id } = useParams();

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (messageState.firstLoad) return;
    dispatch(getConversation({ responseData }));
  }, [responseData, dispatch, messageState.firstLoad]);

  return (
    <div className="contact_field">
      <div className="new_message">
        <p>{responseData.user.username}</p>
        <OpenInNewIcon
          sx={{ cursor: "pointer", flex: "0.2" }}
          onClick={handleOpenSearch}
        />
      </div>
      <div className="list_message_user">
        {users.map((user, index) => {
          return <ContactFieldUser key={index} user={user} id={id} />;
        })}
      </div>
    </div>
  );
}

export default ContactField;
