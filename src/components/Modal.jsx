import "react";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Modal.module.css";

const Modal = ({ isOpen, newPost, onChange, onSave, onClose }) => {
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    // Validate required fields
    if (!newPost.title) newErrors.title = "Title is required";
    if (!newPost.content) newErrors.content = "Content is required";
    if (!newPost.actors)
      newErrors.actors = "Main characters/actors are required";
    if (
      newPost.userRating < 1 ||
      newPost.userRating > 10 ||
      isNaN(newPost.userRating)
    ) {
      newErrors.rating = "Your Rating must be a number between 1 and 10";
    }

    if (newPost.publicRating && isNaN(newPost.publicRating)) {
      newErrors.publicRating = "Public Rating must be a valid number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave();
    }
  };

  const allowedImageFormats = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !allowedImageFormats.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, or WEBP).");
      e.target.value = ""; // Очищення поля
      return;
    }
    onChange({ ...newPost, poster: file });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Create New Post</h2>

        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => onChange({ ...newPost, title: e.target.value })}
          className={`${styles.inputField} ${errors.title ? styles.error : ""}`}
        />
        {errors.title && <p className={styles.errorText}>{errors.title}</p>}

        <textarea
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => onChange({ ...newPost, content: e.target.value })}
          className={`${styles.textareaField} ${errors.content ? styles.error : ""}`}
        ></textarea>
        {errors.content && <p className={styles.errorText}>{errors.content}</p>}

        <textarea
          placeholder="Main Characters/Actors"
          value={newPost.actors}
          onChange={(e) => onChange({ ...newPost, actors: e.target.value })}
          className={`${styles.inputField} ${errors.actors ? styles.error : ""}`}
        />
        {errors.actors && <p className={styles.errorText}>{errors.actors}</p>}

        <input
          type="number"
          placeholder="Your Rating (1-10)"
          value={newPost.userRating}
          min="1"
          max="10"
          onChange={(e) => {
            const rating = Number(e.target.value);
            if (rating >= 1 && rating <= 10) {
              onChange({ ...newPost, userRating: rating });
            } else {
              alert("Rating must be between 1 and 10.");
            }
          }}
          className={`${styles.inputField} ${errors.rating ? styles.error : ""}`}
        />
        {errors.rating && <p className={styles.errorText}>{errors.rating}</p>}

        <input
          type="number"
          placeholder="Public Rating (optional)"
          value={newPost.publicRating || ""}
          onChange={(e) =>
            onChange({ ...newPost, publicRating: e.target.value })
          }
          className={styles.inputField}
        />

        <input
          type="url"
          placeholder="Link to Watch (optional)"
          value={newPost.link || ""}
          onChange={(e) => onChange({ ...newPost, link: e.target.value })}
          className={styles.inputField}
        />

        <textarea
          placeholder="Comments (optional)"
          value={newPost.comments || ""}
          onChange={(e) => onChange({ ...newPost, comments: e.target.value })}
          className={styles.textareaField}
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />

        <div className={styles.modalButtons}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  newPost: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    actors: PropTypes.string,
    userRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    publicRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    link: PropTypes.string,
    comments: PropTypes.string,
    poster: PropTypes.instanceOf(File),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
