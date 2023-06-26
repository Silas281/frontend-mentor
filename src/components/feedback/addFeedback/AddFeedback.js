import React, { useState } from 'react'
import { IoChevronBack, IoAddSharp, IoChevronUp, IoChevronDown, IoCheckmark } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './AddFeedback.css'
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback, selectAllFeedbacks } from '../../../features/feedbacks/FeedbackSlice'
import capitalizeFirstLetter from '../../../utilities/captaliseFirstLetter'

const AddFeedback = () => {
    const [title, setNewTitle] = useState('');
    const [description, setNewDescription] = useState('')
    const [category, setNewCategory] = useState('feature')
    const [status, setNewStatus] = useState('planned')
    const [upvotes] = useState(0)
    const [comments] = useState([])
    const [touchedTile, setTouchedTile] = useState(false)
    const [touchedDescription, setTouchedDescription] = useState(false)
    const [categoryList] = useState(['feature', 'ui', 'ux', 'enhancement', 'bug'])
    const [statusList] = useState(['planned', 'in-progress', 'live', 'suggestion'])
    const [toggleCategorySelect, setCategoryToggleSelect] = useState(false)
    const [toggleStatusSelect, setStatusToggleSelect] = useState(false)




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

    //handle Category Select
    const handleCategorySelectToggle = (cat) => {
        setNewCategory(cat);
        setCategoryToggleSelect(!toggleCategorySelect);
    }

    //handle Status Select

    const handleStatusSelectToggle = (stat) => {
        setNewStatus(stat);
        setStatusToggleSelect(!toggleStatusSelect);
    }

    //Open Close category Selects
    const toggleCatSelect = () => {
        setStatusToggleSelect(false)
        setCategoryToggleSelect(!toggleCategorySelect)
    }

    //Open Close status Selects
    const toggleStatSelect = () => {
        setCategoryToggleSelect(false)
        setStatusToggleSelect(!toggleStatusSelect)

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
                        <div className='selected' onClick={toggleCatSelect} >
                            <p className='selected-value'>{capitalizeFirstLetter(category)}</p>
                            <span className='selected-icon'> {toggleCategorySelect ? < IoChevronDown /> : <IoChevronUp />}  </span>
                        </div>
                        {toggleCategorySelect && (<ul className='category-list'>
                            {categoryList.map((cat, index) => (
                                <li key={index} className='category-item' onClick={() => handleCategorySelectToggle(cat)}> {capitalizeFirstLetter(cat)} {(category === cat) && (<span> <IoCheckmark /> </span>)}  </li>

                            ))}
                        </ul>)}

                    </div>

                    <div className='category-wrapper'>
                        <p>Update Status</p>
                        <label htmlFor='status'>Choose a category for your feedback</label>
                        <br />
                        <div className='selected' onClick={toggleStatSelect} >
                            <p className='selected-value'>{capitalizeFirstLetter(status)}</p>
                            <span className='selected-icon'> {toggleCategorySelect ? < IoChevronDown /> : <IoChevronUp />}  </span>
                        </div>
                        {toggleStatusSelect && (<ul className='category-list'>
                            {statusList.map((stat, index) => (
                                <li key={index} className='category-item' onClick={() => handleStatusSelectToggle(stat)}> {capitalizeFirstLetter(stat)} {(status === stat) && (<span> <IoCheckmark /> </span>)}  </li>

                            ))}
                        </ul>)}

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