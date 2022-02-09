import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import { authSelector } from "../../features/auth/authSlice";
import { checkImage } from "../../utils/imageUpload";
import { toast } from "react-toastify";
import { updateProfileLoading } from "../../features/user/userSlice";
import { useClickOutside } from "../../utils/common";

function EditProfile({ setOnEditProfile }) {
  const initState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, address, website, story, gender } = userData;
  const [avatar, setAvatar] = useState("");
  const { responseData } = useSelector(authSelector);
  const dispatch = useDispatch();
  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) {
      toast.error(err);
    }
    setAvatar(file);
  };
  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullname) {
      dispatch(updateProfileLoading({ userData, avatar, responseData }));
    } else {
      toast.error("Please add your full name");
    }
  };
  let domNode = useClickOutside(() => {
    setOnEditProfile(false);
  });

  useEffect(() => {
    setUserData(responseData.user);
  }, [responseData.user]);
  return (
    <div className="edit_profile">
      <CloseIcon
        className="close_edit_form_btn"
        onClick={() => {
          setOnEditProfile(false);
        }}
      />
      <form ref={domNode} onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img
            src={
              avatar ? URL.createObjectURL(avatar) : responseData.user.avatar
            }
            alt="avatar"
            style={{ width: "150px", height: "150px" }}
          />
          <span>
            <PhotoCameraIcon />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>
        <Stack spacing={2}>
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            name="fullname"
            value={fullname}
            onChange={handleInput}
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Mobile"
            variant="outlined"
            name="mobile"
            value={mobile}
            onChange={handleInput}
            size="small"
            fullWidth
          />{" "}
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            name="address"
            value={address}
            onChange={handleInput}
            size="small"
            fullWidth
          />{" "}
          <TextField
            id="outlined-basic"
            label="Website"
            variant="outlined"
            name="website"
            value={website}
            onChange={handleInput}
            size="small"
            fullWidth
          />
        </Stack>
        <div style={{ marginTop: "16px" }}>
          <label htmlFor="story">Story</label>
          <textarea
            name="story"
            value={story}
            cols="30"
            rows="4"
            onChange={handleInput}
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "5px",
              outline: "none",
            }}
          />

          <small
            style={{ textAlign: "right", display: "block", color: "gray" }}
          >
            {story.length}/200
          </small>
        </div>
        <FormControl component="fieldset" sx={{ display: "block" }}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="gender"
            value={gender}
            onChange={handleInput}
            sx={{ justifyContent: "space-between" }}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: "8px" }}
          fullWidth
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default EditProfile;
