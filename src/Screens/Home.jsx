import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToPastes, updatePaste } from "../redux/features/PasteSlice";
import { FaCopy } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const navigation = useNavigate();
  const [searchparam, setSearchParam] = useSearchParams();
  const pasteID = searchparam.get("pasteId");
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const [copyMessage, setCopyMessage] = useState(""); // For "Copied!" message
  const [isCopyVisible, setIsCopyVisible] = useState(true);

  const generateUUID = () => {
    const base62 =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let uuid = "";
    for (let i = 0; i < 12; i++) {
      // 12 characters provide sufficient uniqueness
      const randomIndex = Math.floor(Math.random() * base62.length);
      uuid += base62[randomIndex];
    }
    return uuid;
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  const createPaste = () => {
    const uniqueId = generateUUID();
    const date = formatDate(new Date());
    const paste = {
      _id: pasteID || uniqueId,
      Title: title,
      Content: content,
      Created_At: date,
    };
    return paste;
  };

  const saveNotes = () => {
    const paste = createPaste();
    if (!pasteID) {
      dispatch(addToPastes(paste));
      setTitle("");
      setContent("");
      setSearchParam({});
    } else {
      dispatch(updatePaste(paste));
      setTitle("");
      setContent("");
      setSearchParam({});
      navigation("/pastes");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopyVisible(false); // Hide the Copy button
    setCopyMessage("Copied!"); // Show the "Copied!" message
    setTimeout(() => {
      setCopyMessage(""); // Hide the "Copied!" message
      setIsCopyVisible(true); // Show the Copy button again
    }, 2000); // Adjust duration as needed
  };

  useEffect(() => {
    if (pasteID) {
      const paste = pastes.find((p) => p._id === pasteID);
      if (paste) {
        setTitle(paste.Title);
        setContent(paste.Content);
      }
    }
  }, [pasteID, pastes]);

  return (
    <div className="note-container">
      <div className="input-row">
        <input
          className="note-title"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {pasteID ? (
          <button className="save-button" onClick={saveNotes}>
            Update Notes
          </button>
        ) : (
          <button className="save-button" onClick={saveNotes}>
            Save Notes
          </button>
        )}
      </div>
      <div className="textarea-container">
        <div className="textarea-header">
          <div className="traffic-lights">
            <span className="light red"></span>
            <span className="light yellow"></span>
            <span className="light green"></span>
          </div>
          <div className="copy-container">
            {!isCopyVisible ? (
              <div className="copy-message">{copyMessage}</div>
            ) : (
              <button className="copy-button" onClick={handleCopy}>
                <FaCopy /> Copy
              </button>
            )}
          </div>
        </div>
        <textarea
          className="note-content"
          placeholder="Write Your Content Here...."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
