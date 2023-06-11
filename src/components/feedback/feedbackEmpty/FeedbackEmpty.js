import React from 'react'
import { FiPlus } from "react-icons/fi";
import './FeedbackEmpty.css';
import { Link } from 'react-router-dom';

const FeedbackEmpty = () => {
    return (
        <div className='empty-feedback'>
            <div className='empty-image-wrapper'>
                <img src="./illustration-empty.svg" alt='Empty' />
            </div>

            <div className="empty-text">
                <h3>There is no feedback yet.</h3>
                <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
            </div>

            <Link className='link' to='/add-feedback'><button className='add-feedback-btn'>
                <span className='fi-plus'>
                    <FiPlus />
                </span>
                <span>
                    Add Feedback
                </span>
            </button>
            </Link>
        </div>
    )
}

export default FeedbackEmpty