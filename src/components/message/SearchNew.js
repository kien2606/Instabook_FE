import React, { useRef, useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";

function SearchNew({ setOpenSearch, onSubmitSearch, users, addUser }) {
  const [value, setValue] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };
  const handleSearchChange = (e) => {
    setValue(e.target.value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      onSubmitSearch(e.target.value);
    }, 500);
  };
  const handleAddUser = (user) => {
    setValue("");
    addUser(user);
  };
  return (
    <div className="search_new">
      <div className="model_search">
        <div className="model_search_header">
          <p>New Message</p>
          <ClearIcon
            sx={{ flex: 0.1, cursor: "pointer" }}
            onClick={handleCloseSearch}
          />
        </div>
        <div className="model_search_search">
          <p>To :</p>
          <input
            placeholder="Search"
            value={value}
            onChange={handleSearchChange}
          />
        </div>
        <div className="model_search_suggest">
          <p>Suggestion : </p>
          {users.map((user, index) => {
            return (
              <div
                className="user_card user_card_message"
                key={index}
                onClick={() => handleAddUser(user)}
              >
                <div className="user_card_left">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className={"small_avatar"}
                  />
                  <div className="user_card_info">
                    {/* <Link to={`/profile/${user._id}`}>{user.username}</Link> */}
                    <p>{user.username}</p>
                    <p>{user.fullname}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchNew;
