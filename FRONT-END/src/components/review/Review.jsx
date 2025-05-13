import React, { useState, useContext } from "react";
import styles from "./Review.module.scss";
import Rating from "@mui/material/Rating";
import { UserContext } from "../context/UserContext";
import { createReview } from "../../apis/review";
export default function Review({ p }) {
  const { user } = useContext(UserContext);

  const [note, setNote] = useState("");
  const [titleReview, setTitleReview] = useState("");
  const [commentReview, setCommentReview] = useState("");
  const [feedback, setFeedback] = useState(null);

  console.log(note);
  console.log(titleReview);
  console.log(commentReview);
  console.log(p);
  // if (!p) {
  //     return <div>Loading...</div>; // Placeholder while data is being fetched
  //   }

  const onSubmit = async (e) => {
    e.preventDefault();
    const p = {
      note: note,
      titleReview: titleReview,
      commentReview: commentReview,
      prestataireId: p,
      userId: user.id,
    };
    try {
      const response = await createReview(p);
      console.log(response);
      setFeedback(response.message);
      setNote(0);
      setTitleReview("");
      setCommentReview("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.Review}>
      <div className={styles.ContentReview}>
        <h4>Donnez votre avis</h4>
        <form onSubmit={onSubmit}>
          <div className={styles.ReviewNote}>
            <label className={styles.label} htmlFor="businessname">
              {" "}
              Note{" "}
            </label>
            <Rating
              size="large"
              name="size-large"
              value={note}
              onChange={(event, newNote) => {
                setNote(newNote);
              }}
            />
          </div>
          <div className={styles.ReviewTitle}>
            <label htmlFor="title"> Titre </label>
            <input
              type="text"
              placeholder="Choississez un titre..."
              onChange={(e) => setTitleReview(e.target.value)}
            />
          </div>

          <div className={styles.ReviewComment}>
            <label htmlFor="businessname"> Commentaire </label>
            <textarea
              name=""
              id=""
              placeholder="Ecrivez ici..."
              onChange={(e) => setCommentReview(e.target.value)}
            ></textarea>
          </div>
          <div className="d-flex center">
            <button className="mj-btn-primary" type="submit">
              Envoyer
            </button>
          </div>
        </form>
        {feedback && <p>{feedback}</p>}
      </div>
    </div>
  );
}
