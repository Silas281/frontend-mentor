import React, { useState, useEffect } from 'react'
import { FiPlus } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";

import { FaComment } from "react-icons/fa";
import { IoChevronBack } from 'react-icons/io5';
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom';
import "./roadmap.css";
import { useSelector, useDispatch } from 'react-redux';
import { countComments } from '../../utilities/Funcs';
import { selectAllFeedbacks, fetchFeedbacks, selectFilteredFeedbacks, selectAllSuggestions, selectAllPlanned, selectAllInProgress, selectAllLive } from '../../features/feedbacks/FeedbackSlice';
import Suggestion from './statuses/suggestion/Suggestion';
import Planned from './statuses/planned/Planned';
import InProgress from './statuses/inProgress/InProgress';
import Live from './statuses/live/Live';


const Roadmap = () => {
    const [StatusesCount, setStatusesCount] = useState([]);

    const dispatch = useDispatch();
    const feedbacks = useSelector(selectAllFeedbacks);
    const filteredSuggestions = useSelector(selectAllSuggestions);
    const fliteredPlanned = useSelector(selectAllPlanned);
    const fliteredInProgress = useSelector(selectAllInProgress);
    const filteredLive = useSelector(selectAllLive)





    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const countStatuses = () => {
        const statusCounts = {};

        feedbacks.forEach((feedback) => {
            const { status } = feedback;
            if (statusCounts.hasOwnProperty(status)) {
                statusCounts[status] += 1;
            } else {
                statusCounts[status] = 1;
            }
        });
        setStatusesCount(statusCounts);
        //console.log(statusCounts);
    }

    useEffect(() => {
        //dispatch(fetchFeedbacks())
        countStatuses();

    }, [])


    return (
        <div className='roadmap-main'>
            <div className='top-nav'>
                <div className='nav-left'>
                    <div className='go-back'>
                        <span className='back-icon'><IoChevronBack /></span>
                        <span className='back-text' onClick={goBack}>Go Back</span>
                    </div>
                    <h3 className='roadmap-left-caption'>Roadmap</h3>
                </div>
                <div className='nav-right'>
                    <Link className='link' to='/add-feedback'>
                        <button className='add-feedback-btn'>
                            <span className='fi-plus'>
                                <FiPlus />
                            </span>

                            <span>
                                Add Feedback
                            </span>

                        </button>
                    </Link>
                </div>
            </div>

            <div className='statuses-nav large'>
                <div className='task-header'>
                    <h3 className='task-status-name'>Suggestions ({StatusesCount['suggestion']})</h3>
                    <p className='task-status-header-desc'>Released features</p>
                </div>
                <div className='task-header'>

                    <h3 className='task-status-name'>Planned ({StatusesCount['planned']})</h3>
                    <p className='task-status-header-desc'>Ideas prioritized for research</p>
                </div>
                <div className='task-header'><h3 className='task-status-name'>In-Progress ({StatusesCount['in-progress']})</h3>
                    <p className='task-status-header-desc'>Currently being developed</p>
                </div>
                <div className='task-header'>
                    <h3 className='task-status-name last'>Live ({StatusesCount['live']})</h3>
                    <p className='task-status-header-desc'>Released features</p>
                </div>

            </div>

            <div className='statuses-nav small'>
                <div className='task-header'>
                    <NavLink to='/roadmap/suggestion' className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
                        <h3 className='task-status-name'>Suggestions ({StatusesCount['suggestion']})</h3>
                    </NavLink>
                    <p className='task-status-header-desc'>Ideas prioritized for research</p>
                </div>
                <div className='task-header'>
                    <NavLink to='/roadmap/planned' className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
                        <h3 className='task-status-name'>Planned ({StatusesCount['planned']})</h3>
                    </NavLink>
                    <p className='task-status-header-desc'>Ideas prioritized for research</p>
                </div>
                <div className='task-header'>
                    <NavLink to='/roadmap/in-progress' className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
                        <h3 className='task-status-name'>In-Progress ({StatusesCount['in-progress']})</h3>
                    </NavLink><p className='task-status-header-desc'>Currently being developed</p>
                </div>
                <div className='task-header'><NavLink to='/roadmap/live' className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"
                }><h3 className='task-status-name last'>Live ({StatusesCount['live']})</h3>
                </NavLink>
                    <p className='task-status-header-desc'>Released features</p>
                </div>
            </div>
            <div className='task-statuses large'>

                {/* <Suggestion />
                <Planned />
                <InProgress />
                <Live /> */}
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
                <div className='status-planned'>
                    {fliteredPlanned.map((feedback, index) => (
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
                <div className='status-inProgress'>

                    {fliteredInProgress.map((feedback, index) => (
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
                <div className='status-live'>

                    {filteredLive.map((feedback, index) => (
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

            <div className='small'>
                <Outlet />
            </div>
        </div>
    )
}

export default Roadmap