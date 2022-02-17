import React, { useEffect, useRef, useState } from "react";
import { postingProcess, updatePostProcess } from "../features/post/postSlice";
import { setOpen, statusSelector } from "../features/status/statusSlice";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Icons from "./Icons";
import ImageIcon from "@mui/icons-material/Image";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { authSelector } from "../features/auth/authSlice";
import { socketSelector } from "../features/socket/socketSlice";
import { toast } from "react-toastify";

// import { useClickOutside } from "../utils/common";

function StatusModal() {
  const { responseData } = useSelector(authSelector);
  const statusState = useSelector(statusSelector);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");
  const socket = useSelector(socketSelector).socketData;

  const dispatch = useDispatch();
  const videoRef = useRef();
  const refCanvas = useRef();
  const handleChangImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];
    files.forEach((file) => {
      if (!file) return (err = "File does not exist");
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return (err = "Image format is incorrect");
      }
      return newImages.push(file);
    });
    if (err) toast.error(err);
    setImages([...images, ...newImages]);
  };
  const handleDeleteItem = (index) => {
    const newList = [...images];
    newList.splice(index, 1);
    setImages(newList);
  };
  // const domNode = useClickOutside(() => {
  //   dispatch(setOpen(false));
  // });
  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          const track = stream.getTracks();
          setTracks(track[0]);
        })
        .catch((error) => console.log(error));
    }
  };
  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;
    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);
    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };
  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };
  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (content.length === 0 && images.length === 0) {
      toast.error("Please share your feeling before posting");
    }
    if (statusState.isEdit) {
      dispatch(
        updatePostProcess({ content, images, responseData, statusState })
      );
    } else {
      dispatch(postingProcess({ content, images, responseData, socket }));
    }
    setContent("");
    setImages([]);
    setStream(false);
    if (tracks) tracks.stop();
  };

  useEffect(() => {
    if (statusState.isEdit) {
      setContent(statusState.currentPost.content);
      setImages(statusState.currentPost.images);
    }
  }, [
    statusState.isEdit,
    statusState.currentPost.content,
    statusState.currentPost.images,
  ]);
  return (
    <div className="status_modal">
      {/* <form ref={domNode}> */}

      <form>
        <div className="status_header">
          <h3>Create Post</h3>
          <CloseIcon
            onClick={() => dispatch(setOpen(false))}
            sx={{ cursor: "pointer" }}
          />
        </div>
        <hr style={{ margin: "8px 0" }} />
        <div className="status_content">
          <div className=" status_content_info">
            <Avatar
              src={responseData.user.avatar}
              alt={responseData.user.username}
            />
            <p>{responseData.user.username}</p>
          </div>
          <div className="status_content_feeling">
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`What is on your mind, ${responseData.user.username}`}
            ></textarea>
            {images.length > 0 && (
              <div className="show_images">
                {images.map((img, index) => {
                  return (
                    <div key={index} className="file_img">
                      <img
                        src={
                          img.camera
                            ? img.camera
                            : img.url
                            ? img.url
                            : URL.createObjectURL(img)
                        }
                        alt="images"
                      />
                      <span onClick={() => handleDeleteItem(index)}>
                        &times;
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            {stream && (
              <div className="stream">
                <video
                  src=""
                  autoPlay
                  muted
                  ref={videoRef}
                  width="100%"
                  height="100%"
                />
                <span onClick={handleStopStream} className="stop_stream_btn">
                  &times;
                </span>
                <canvas ref={refCanvas} style={{ display: "none" }} />
              </div>
            )}
            {stream && (
              <PhotoCameraIcon
                sx={{ fontSize: "45px", width: "100%" }}
                onClick={handleCapture}
              />
            )}
          </div>
          <div className="add_to_post">
            <p>Add to your post</p>

            <div className="input_images">
              <Icons
                style={{
                  color: "red!important",
                  marginRight: "8px",
                  marginBottom: "2px",
                }}
                setContent={setContent}
                content={content}
              />
              <PhotoCameraIcon
                sx={{ cursor: "pointer" }}
                onClick={handleStream}
              />
              <div className="file_upload">
                <ImageIcon sx={{ cursor: "pointer" }} />
                <input
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  accept="image/*"
                  onChange={handleChangImages}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="status_footer">
          <Button fullWidth variant="contained" onClick={handleSubmitPost}>
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StatusModal;
