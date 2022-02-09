import React, { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import MessageDisplay from "./MessageDisplay";
import { authSelector } from "../../features/auth/authSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ConversationField({ users }) {
  const { responseData } = useSelector(authSelector);
  const [partner, setPartner] = useState([]);
  const [text, setText] = useState("");
  const { id } = useParams();
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (text) console.log(text);
    setText("");
  };
  useEffect(() => {
    const dataPartner = users.filter((user) => user._id === id);
    setPartner(dataPartner);
  }, [id, users]);
  return (
    <>
      {partner.map((user, index) => {
        return (
          <div className="conversation_wrapper" key={index}>
            <div className="conversation_header">
              <div className="header_info_partner">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="small_avatar"
                />
                <div className="user_card_info">
                  <p>{user.username}</p>
                  <p>{user.fullname}</p>
                </div>
              </div>
              <div className="delete_conversation">
                <DeleteIcon sx={{ cursor: "pointer" }} />
              </div>
            </div>
            <div className="conversation_message">
              <div className="partner_message">
                <MessageDisplay user={user} />
              </div>
              <div className="your_message">
                <MessageDisplay user={responseData.user} />
              </div>
            </div>
            <div className="input_message">
              <form onSubmit={handleSendMessage}>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Message..."
                />
                <button type="submit" style={{ display: "none" }}></button>
              </form>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ConversationField;
