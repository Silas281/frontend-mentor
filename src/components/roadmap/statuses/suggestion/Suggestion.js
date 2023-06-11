import React, { useState, useEffect } from 'react'
import { FiChevronUp } from "react-icons/fi";

import { FaComment } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeedbacks, selectAllSuggestions } from '../../../../features/feedbacks/FeedbackSlice';
import { countComments } from '../../../../utilities/Funcs';

const Suggestion = () => {
    const dispatch = useDispatch();
    const filteredSuggestions = useSelector(selectAllSuggestions);




    useEffect(() => {
        //dispatch(fetchFeedbacks())
    }, [])

    return (
        <div className='task-statuses'>
            <div className='status-suggestion'>
                {filteredSuggestions.map((feedback, index) => (
                    <div key={feedback.id} className='single-task '>
                        <div className='wrap-status'>
                            <span className='status-title'>{feedback.status}</span>
                        </div>
                        <Link to={`/feedback-details/${feedback.id}`} className='task-name'> <h3 className='task-name'>{feedback.title}</h3> </Link>
                        <p className='task-desc'>{feedback.description}</p>
                        <button className='category' type='button'>
                            {feedback.category}
                        </button>
                        <div className='comments-votes'>
                            <div className='upvotes'>
                                <button className='upvote-btn' type='button'>
                                    <span className='up-icon'>
                                        <FiChevronUp />
                                    </span>
                                    <span className='upvote-count'>
                                        {feedback.upvotes}
                                    </span>
                                </button>
                            </div>
                            <div className='comments-tag'>
                                <span className='comments-icon'><FaComment /></span>
                                <span className='comments-count'>{countComments(feedback)}</span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Suggestion