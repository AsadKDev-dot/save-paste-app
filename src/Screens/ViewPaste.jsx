import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import "./Home.css";

const ViewPaste = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const { id } = useParams();
  const [copyMessage, setCopyMessage] = useState(""); // For "Copied!" message
  const [isCopyVisible, setIsCopyVisible] = useState(true);
  const navigation = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopyVisible(false); // Hide the Copy button
    setCopyMessage("Copied!"); // Show the "Copied!" message
    setTimeout(() => {
      setCopyMessage(""); // Hide the "Copied!" message
      setIsCopyVisible(true); // Show the Copy button again
    }, 2000); // Adjust duration as needed
  };

  const handleSaveNotes=()=>{
    const paste = pastes[id];
    navigation(`/?pasteId=${paste?._id}`)
  };

  useEffect(() => {
    if (id) {
      const paste = pastes[id];
      setTitle(paste.Title);
      setContent(paste.Content);
    }
  }, [id]);
  return (
    <div className="note-container">
      <div className="input-row">
        <input
          className="note-title"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled
        />
        <button className="save-button" onClick={handleSaveNotes}>
            Edit Notes
          </button>
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
          disabled
        />
      </div>
    </div>
  );
};

export default ViewPaste;
