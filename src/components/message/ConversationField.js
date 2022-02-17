import React, { useEffect, useRef, useState } from "react";
import {
  getMessage,
  messageSelector,
  sendMessage,
} from "../../features/message/messageSlice";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import Icons from "../Icons";
import ImageIcon from "@mui/icons-material/Image";
import MessageDisplay from "./MessageDisplay";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { authSelector } from "../../features/auth/authSlice";
import { socketSelector } from "../../features/socket/socketSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function ConversationField({ users }) {
  const { responseData } = useSelector(authSelector);
  const messageState = useSelector(messageSelector);
  const socket = useSelector(socketSelector).socketData;

  const [partner, setPartner] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const { id } = useParams();
  const videoRef = useRef();
  const refCanvas = useRef();
  const refToBottomMessage = useRef();
  const dispatch = useDispatch();
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    setText("");
    setImages([]);
    setStream(false);
    if (tracks) tracks.stop();
    const msg = {
      sender: responseData.user._id,
      recipient: id,
      text,
      images,
      createdAt: new Date().toLocaleString("en-US"),
    };
    if (text || images.length > 0)
      dispatch(sendMessage({ msg, responseData, socket }));
    if (refToBottomMessage.current) {
      refToBottomMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
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
  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
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
  const handleDeleteItem = (index) => {
    const newList = [...images];
    newList.splice(index, 1);
    setImages(newList);
  };
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

  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        await dispatch(getMessage({ id, responseData }));
        setTimeout(() => {
          refToBottomMessage.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 1000);
      };
      getMessagesData();
    }
  }, [id, responseData, dispatch]);

  useEffect(() => {
    const dataPartner = users.filter((user) => user._id === id);
    setPartner(dataPartner);
    setTimeout(() => {
      refToBottomMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 1000);
  }, [id, users]);
  return (
    <>
      {messageState.loading ? (
        <div className="loading_search_users" style={{ marginTop: "16px" }}>
          <CircularProgress />
        </div>
      ) : (
        partner.map((user, index) => {
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
              <div className="chat_container">
                <div className="conversation_message" ref={refToBottomMessage}>
                  {messageState.messages.map((msg, index) => {
                    return (
                      <div key={index}>
                        {msg.sender === responseData.user._id ? (
                          <div className="your_message">
                            <MessageDisplay
                              user={responseData.user}
                              msg={msg}
                            />
                          </div>
                        ) : (
                          <div className="partner_message">
                            <MessageDisplay user={user} msg={msg} />
                          </div>
                        )}
                      </div>
                    );
                  })}

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
                      <span
                        onClick={handleStopStream}
                        className="stop_stream_btn"
                      >
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
              </div>
              <div className="input_message">
                {images.length > 0 && (
                  <div
                    className="show_images"
                    style={{
                      backgroundColor: "#f0f0f0",
                      marginTop: "8px",
                      gridTemplateColumns: "repeat(5, minmax(100px, 1fr))",
                    }}
                  >
                    {images.map((img, index) => {
                      return (
                        <div
                          key={index}
                          className="file_img"
                          style={{ height: "75px" }}
                        >
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
                <form
                  onSubmit={handleSubmitMessage}
                  style={{ position: "relative" }}
                >
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Message..."
                  />
                  <div
                    className="input_images"
                    style={{ position: "absolute", right: "8%" }}
                  >
                    <Icons setContent={setText} content={text} />
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
                  <div></div>
                  <button type="submit" style={{ display: "none" }}></button>
                </form>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default ConversationField;
