import React, { useState } from 'react'
import { IoChevronBack, IoAddSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import './AddFeedback.css'
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback, selectAllFeedbacks } from '../../../features/feedbacks/FeedbackSlice'

const AddFeedback = () => {
    const [title, setNewTitle] = useState('');
    const [description, setNewDescription] = useState('')
    const [category, setNewCategory] = useState('')
    const [status, setNewStatus] = useState('planned')
    const [upvotes, setNewVotes] = useState(0)
    const [comments, setNewComments] = useState([])
    const [touchedTile, setTouchedTile] = useState(false)
    const [touchedDescription, setTouchedDescription] = useState(false)




    const dispatch = useDispatch();
    const feedbacks = useSelector(selectAllFeedbacks);

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(feedbacks)
        const newFeedback = {
            id: feedbacks.length + 1,
            title,
            description,
            category,
            status,
            upvotes,
            comments
        }
        //console.log(newFeedback)
        dispatch(addFeedback(newFeedback));
        console.log(feedbacks)
        //set fields to empty
        setNewTitle('');
        setNewDescription('');
        setNewCategory('');
        //setNewStatus('');
        navigate('/');

    }

    //handle validation
    const handleBlur = (e) => {
        if (e.target.name === 'title') {
            setTouchedTile(true)
        }
    }

    return (
        <div className='add-feedback-main'>
            <div className='top-header'>
                <div className='go-back'>
                    <span className='back-icon'><IoChevronBack /></span>
                    <span className='back-text' onClick={goBack}>Go Back</span>
                </div>

            </div>

            <div className='add-feedbac-form-wrapper'>
                <span className='add-icon'><IoAddSharp /></span>
                <form className='add-feedback-from' onSubmit={handleSubmit}>
                    <h3 className='form-title'>Create New Feedback</h3>

                    <div className='title-wrapper'>
                        <p>Feedback Title</p>
                        <label htmlFor='title'>Add a short, descriptive headline</label>
                        <br />
                        <input
                            id='title'
                            className={(touchedTile && title.length === 0 ? 'error-field' : 'title-input')}
                            type='text'
                            name='title'
                            value={title}
                            onBlur={handleBlur}
                            onChange={(e) => setNewTitle(e.target.value)}

                        />
                        {touchedTile && title.length === 0 && <span className='error'>Title is required</span>}
                    </div>
                    <div className='category-wrapper'>
                        <p>Category</p>
                        <label htmlFor='category'>Choose a category for your feedback</label>
                        <br />
                        <select
                            id='category'
                            className='custom-select'
                            type='text'
                            name='category'
                            value={category}
                            onChange={(e) => setNewCategory(e.target.value)}

                        >
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
                            className={(touchedDescription && description.length === 0 ? 'error-field' : 'details')}
                            name='details'
                            value={description}
                            onChange={(e) => setNewDescription(e.target.value)}
                            onBlur={() => setTouchedDescription(true)}
                        >

                        </textarea>
                        {touchedDescription && description.length === 0 && <span className='error'>Description is required</span>}
                    </div>

                    <div className='actions-wrapper'>
                        <div className='delete-wrapper'>
                            {/* <button type='button' className='delete-btn'>Delete</button> */}
                        </div>

                        <div className='other-btns'>
                            <button type='button' className='cancel-btn' onClick={goBack} >Cancel</button>
                            <button type='submit' className='submit-btn'>Add Feedback</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFeedback