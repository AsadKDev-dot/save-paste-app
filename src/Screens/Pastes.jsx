import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEdit, FaTrash, FaCopy } from "react-icons/fa";
import { removePaste } from "../redux/features/PasteSlice";
import "./Pastes.css"; // Importing the CSS file for styling
import { useNavigate } from "react-router-dom";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [search, setSearch] = useState("");
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [copiedId, setCopiedId] = useState(null); // Track the copied paste ID

  const handleCopy = (content, id) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id); // Set the copied paste ID
    setTimeout(() => {
      setCopiedId(null); // Reset copiedId after 2 seconds
    }, 2000); // Show the "Copied!" message for 2 seconds
  };

  // Filter pastes based on the search query
  const filteredPastes = pastes.filter((item) =>
    item.Title.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (item) => {
    navigation(`/?pasteId=${item?._id}`);
  };
  const handleView = (index) => {
    navigation(`/pastes/${index}`);
  };
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this paste?"
    );
    if (isConfirmed) {
      dispatch(removePaste(id));
    }
  };

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        value={search}
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tiles Container */}
      <div className="tiles-container">
        {filteredPastes.length > 0 ? (
          filteredPastes.map((item, index) => (
            <div className="tile" key={item._id}>
              {/* Title and Buttons in Same Row */}
              <div className="tile-header">
                <h5>{item?.Title}</h5>
                {/* Button Container */}
                <div className="button-container">
                  <button className="button" onClick={() => handleView(index)}>
                    <FaEye /> View
                  </button>

                  <button className="button" onClick={() => handleEdit(item)}>
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="button"
                    onClick={() => handleDelete(item?._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                  {/* Show "Copied!" message for the specific tile */}
                  {copiedId === item._id ? (
                    <div className="button">Copied!</div>
                  ) : (
                    <button
                      className="button"
                      onClick={() => handleCopy(item.Content, item._id)}
                    >
                      <FaCopy /> Copy
                    </button>
                  )}
                </div>
              </div>

              {/* Paste Content */}
              <p>{item.Content}</p>
            </div>
          ))
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </div>
  );
};

export default Pastes;
