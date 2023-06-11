import React, { useEffect, useState } from 'react'
import { IoChevronBack, IoPencilSharp } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import './EditFeedback.css'
import { useDispatch, useSelector } from 'react-redux';
import { editFeedback, selectAllFeedbacks, deleteFeedback } from '../../../features/feedbacks/FeedbackSlice';

const EditFeedback = () => {
    const { id } = useParams();
    const feedbacks = useSelector(selectAllFeedbacks);
    const [title, setNewTitle] = useState('');
    const [description, setNewDescription] = useState('')
    const [category, setNewCategory] = useState('')
    const [status, setNewStatus] = useState('')
    const [touchedTitle, setTouchedTitle] = useState(false);
    const [touchedDescription, setTouchedDescription] = useState(false);



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //edit feedback
        const editedFeedback = {
            id,
            title,
            description,
            category,
            status,
        }
        dispatch(editFeedback(editedFeedback));
        navigate(-1)
    }

    const handleDelete = () => {
        dispatch(deleteFeedback(id));
        navigate('/')
    }



    useEffect(() => {
        //get id from url using reat useParams

        console.log(id)
        //get feedbacks from redux store

        //get feedback with id from url
        const feedback = feedbacks.find((feedback) => feedback.id === parseInt(id));
        //console.log(feedback)
        if (feedback) {
            //set fields to feedback values
            setNewTitle(feedback.title);
            setNewDescription(feedback.description);
            setNewCategory(feedback.category);
            setNewStatus(feedback.status);

        }
    }, [id, feedbacks])

    return (
        <div className='add-feedback-main'>
            <div className='top-header'>
                <div className='go-back'>
                    <span className='back-icon'><IoChevronBack /></span>
                    <span className='back-text' onClick={goBack}>Go Back</span>
                </div>

            </div>

            <div className='add-feedbac-form-wrapper'>
                <span className='add-icon'><IoPencilSharp /></span>
                <form className='add-feedback-from' onSubmit={handleSubmit}>
                    <h3 className='form-title'>Editing '{title}'</h3>

                    <div className='title-wrapper'>
                        <p>Feedback Title</p>
                        <label htmlFor='title'>Add a short, descriptive headline</label>
                        <br />
                        <input
                            id='title'
                            className={(touchedTitle && title.length === 0) ? 'error-field' : 'title-input'}
                            type='text'
                            name='title'
                            value={title}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onBlur={() => { setTouchedTitle(true) }}
                        />
                        {touchedTitle && title.length === 0 && <span className='error'>Title is required</span>}
                    </div>
                    <div className='category-wrapper'>
                        <p>Category</p>
                        <label htmlFor='category'>Choose a category for your feedback</label>
                        <br />
                        <select
                            id='category'
                            className='category'
                            type='text'
                            name='category'
                            value={category}
                            onChange={(e) => setNewCategory(e.target.value)}>
                            <option value='feature'>Feature</option>
                            <option value='ui'>UI</option>
                            <option value='ux'>UX</option>
                            <option value='enhancement'>Enhancement</option>
                            <option value='bug'>Bug</option>


                        </select>
                    </div>
                    <div className='category-wrapper'>
                        <p>Update Status</p>
                        <label htmlFor='status'>Choose a category for your feedback</label>
                        <br />
                        <select
                            id='status'
                            className='status'
                            name='status'
                            value={status}
                            onChange={(e) => setNewStatus(e.target.value)}
                        >
                            <option value='planned'>Planned</option>
                            <option value='in-progress'>In-Progress</option>
                            <option value='live'>Live</option>
                            <option value='suggestion'>suggestion</option>
                        </select>
                    </div>
                    <div className='details-wrapper'>
                        <p>Feedback Detail</p>
                        <label htmlFor='details'>Include any specific comments on what should be improved, added, etc.</label>
                        <br />
                        <textarea
                            id='details'
                            className={(touchedDescription && description.length === 0) ? 'error-field' : 'details'}
                            name='details'
                            value={description}
                            onChange={(e) => setNewDescription(e.target.value)}
                            onBlur={() => { setTouchedDescription(true) }}
                        >

                        </textarea>
                        {touchedDescription && description.length === 0 && <span className='error'>Description is required</span>}
                    </div>
                    <div className='actions-wrapper'>
                        <div className='delete-wrapper'>
                            <button type='button' className='delete-btn' onClick={handleDelete}>Delete</button>
                        </div>

                        <div className='other-btns'>
                            <button type='button' className='cancel-btn' onClick={goBack}>Cancel</button>
                            <button type='submit' className='submit-btn'>Add Feedback</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditFeedback