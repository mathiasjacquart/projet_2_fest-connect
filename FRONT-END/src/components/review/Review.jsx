import React, {useState, useContext} from 'react'
import styles from "./Review.module.scss"
import Rating from '@mui/material/Rating';
import { UserContext } from '../context/UserContext';
import { createReview } from '../../apis/review';
export default function Review ({p}) {

    const { user } = useContext(UserContext);

    const [note, setNote] = useState('');
    const [titleReview, setTitleReview] = useState('');
    const [commentReview, setCommentReview] = useState('');
    const [feedback, setFeedback] = useState(null);
    
    console.log(note);
    console.log(titleReview);
    console.log(commentReview);
    console.log(p);
    // if (!p) {
    //     return <div>Loading...</div>; // Placeholder while data is being fetched
    //   }
    
    
    
    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (!user) {
            console.error("no user identifié");
            return
          }
        const submissionData = { 
            userId:user.id,
            note:note,
            title:titleReview,
            content:commentReview,
            prestataireId: p,
        };
        try {
            const response = await createReview(submissionData);
            console.log(response);
            setFeedback(response.message);
            
            
        } catch (error) {
            console.error(error);
            
        }
    }
    
  return (
    <div className={styles.Review}>
        <div className={styles.ContentReview}>
            <h4>Donnez votre avis</h4>
            <form onSubmit={handleSubmit}>
            <div className={styles.ReviewNote}>
            <label className={styles.label} htmlFor="businessname"> Note </label>
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
                <label htmlFor="title"> Titre  </label>
                    <input 
                    type="text" 
                    placeholder='Choississez un titre...'
                    onChange={(e) => setTitleReview(e.target.value)}/>
                   
                </div>

                <div className={styles.ReviewComment}>
                <label htmlFor="businessname"> Commentaire </label>
                <textarea 
                name="" 
                id=""
                placeholder='Ecrivez ici...'
                onChange={(e) => setCommentReview(e.target.value)}>
                    

                </textarea>
                </div>
                <div className='d-flex center'>
                    <button className='mj-btn-primary' type='submit'>Envoyer</button>
                </div>
            </form>
             {
                feedback && <p>{feedback}</p>
             }       
        </div>
    </div>
  )
}
