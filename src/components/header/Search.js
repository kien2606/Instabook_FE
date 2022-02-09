import React, { useRef, useState } from "react";

import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useClickOutside } from "../../utils/common";

function Search({ onSubmitSearch, listUserSearch, resetListUserSearch }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const typingTimeoutRef = useRef(null);
  const focusSearch = useRef(null);
  const handleSubmitSearch = (e) => {
    setLoading(true);
    const searchQuery = e.target.value;
    setOpen(true);
    setSearch(e.target.value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      onSubmitSearch(searchQuery.toLowerCase().replace(/ /g, ""));
      setLoading(false);
    }, 300);
  };
  const handleCloseSearch = () => {
    setSearch("");
    setOpen(false);
    resetListUserSearch();
  };

  // handle click outside search list user

  let domNode = useClickOutside(() => {
    setSearch("");
    setOpen(false);
  });

  return (
    <Box className="wrap_search_field">
      <form className="search">
        <SearchIcon
          className="search_icon"
          onClick={() => {
            focusSearch.current.focus();
          }}
        />
        <input
          type="text"
          name="search"
          value={search}
          id="search"
          ref={focusSearch}
          onChange={handleSubmitSearch}
        />
        {search.length > 0 && (
          <CloseIcon
            sx={{ color: "gray", cursor: "pointer" }}
            onClick={handleCloseSearch}
          />
        )}
      </form>

      {search.length > 0 && open && (
        <div ref={domNode} className="result_search_field">
          {loading ? (
            <div className="loading_search_users">
              <CircularProgress />{" "}
            </div>
          ) : (
            listUserSearch.map((user, index) => {
              return (
                <Link
                  to={`/profile/${user._id}`}
                  className="specific_user"
                  key={index}
                  onClick={() => {
                    // maybe add set search to empty string here
                    setOpen(false);
                  }}
                >
                  <div className="avatar_specific_user">
                    <img src={user.avatar} alt="avatar_user" style = {{borderRadius : '100px'}} />
                  </div>
                  <div>
                    <p className="username_specific_user">{user.username}</p>
                    <p className="fullname_specific_user">{user.fullname}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </Box>
  );
}

export default Search;
