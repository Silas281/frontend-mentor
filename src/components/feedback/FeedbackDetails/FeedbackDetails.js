import React, { useEffect, useState } from 'react'

import { IoChevronBack } from 'react-icons/io5';
import { FiChevronUp } from "react-icons/fi";
import { FaComment } from "react-icons/fa";
import "./FeedbackDetails.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, fetchCurrentUser } from '../../../features/User/UserSlice';
import { selectAllFeedbacks, addComment, addReply } from '../../../features/feedbacks/FeedbackSlice';
import { countComments } from '../../../utilities/Funcs';


const FeedbackDetails = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    // const { id } = useParams();

    const [toggleReply, setToggleReply] = useState(-1);
    const [commentContent, setCommentContent] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [touchedComment, setTouchedComment] = useState(false);
    const [touchedReply, setTouchedReply] = useState(false);
    const maxLength = 600;

    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    //get feedbacks from redux store
    const feedbacks = useSelector(selectAllFeedbacks);
    //get feedback with id from url
    const feedback = feedbacks.find((feedback) => feedback.id === parseInt(id));




    const postCommment = () => {
        if (commentContent === '') {
            setTouchedComment(true);
            return
        }

        const newComment = {
            id: feedback.comments ? feedback.comments.length + 1 : 1,
            content: commentContent,
            user: currentUser,
            replies: []
        }

        dispatch(addComment({ id: id, comment: newComment }));
        //feedback.comments.push(newComment);
        setCommentContent('');
        setTouchedComment(false);
    }

    const postReply = () => {
        if (replyContent === '') {
            setTouchedReply(true);
            return
        }
        //find comment index
        const commentIndex = feedback.comments.findIndex(obj => obj.id === parseInt(toggleReply));
        const newReply = {
            id: feedback.comments[commentIndex].replies ? feedback.comments[commentIndex].replies.length + 1 : 1,
            content: replyContent,
            user: currentUser,
            replyingTo: feedback.comments[commentIndex].user.username
        }
        dispatch(addReply({ id: id, commentId: toggleReply, reply: newReply }));
        //feedback.comments[toggleReply].replies.push(newReply);
        setReplyContent('');
        setToggleReply(-1);
        setTouchedReply(false);
    }




    useEffect(() => {
        dispatch(fetchCurrentUser())
        //console.log(currentUser.name);
        // console.log(feedback)
    }, [currentUser, dispatch])


    const goBack = () => {
        navigate('/');
    }
    //handle toggle reply
    const handleToggleReply = (index) => {
        if (toggleReply === parseInt(index)) {
            setToggleReply(-1);

        } else {
            setToggleReply(parseInt(index));
        }
        setReplyContent('')
        setTouchedReply(false)
    }


    return (
        <div className='feeback-details'>
            <div className='top-header'>
                <div className='go-back'>
                    <span className='back-icon'><IoChevronBack /></span>
                    <span className='back-text' onClick={goBack}>Go Back</span>
                </div>
                <Link className='link' to={`/edit-feedback/${id}`}>
                    <button className='edit-feedback-btn'>
                        Edit Feedback
                    </button>
                </Link>
            </div>

            <div className='feedback'>
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
                <div className='feedback-content'>
                    <h3>{feedback.title} </h3>
                    <div>
                        <p>{feedback.description}</p>
                    </div>

                    <div>
                        <button className='feedback-tag' type='button'>
                            {feedback.category}
                        </button>
                    </div>


                </div>
                <div className='comments-tag'>
                    <span className='comments-icon'><FaComment /></span>
                    <span className='comments-count'>{countComments(feedback)}</span>
                </div>
            </div>

            <div className='comments-section'>
                <div className=''>
                    <h3 className='comments-title'>{countComments(feedback)} Comment(s)</h3>
                </div>
                {feedback.comments && feedback.comments.map((comment) => (
                    <div key={comment.id} className='main-comment'>
                        <div className='profile'>
                            <div className='image'>
                                <img src={comment.user.image} alt='name' />
                            </div>
                            <div className='name'>
                                <h3>{comment.user.name}</h3>
                                <p>{comment.user.username}</p>
                            </div>
                            <div className='reply' onClick={() => {
                                handleToggleReply(comment.id)
                            }}>
                                <span >Reply</span>
                            </div>
                        </div>
                        <div className='comment'>
                            <div></div>
                            <div>

                                <p>{comment.content}</p>
                                {toggleReply === comment.id && (
                                    <div className='post-reply'>
                                        <textarea className='reply-input'
                                            name='reply'
                                            placeholder='Type your comment here'
                                            rows="4"
                                            cols="50"
                                            value={replyContent}
                                            onBlur={() => setTouchedReply(true)}
                                            onChange={(e) => setReplyContent(e.target.value)}
                                        >
                                        </textarea>
                                        {touchedReply && replyContent.length === 0 && <span className='error'>Field is required</span>}

                                        <button className='post-btn' onClick={postReply}>Post Reply</button>
                                    </div>
                                )}

                                {/* replies */}
                                {comment.replies && comment.replies.map((reply, index) => (
                                    <div key={index} className='main-comment'>
                                        <div className='profile'>
                                            <div className='image'>
                                                <img src={reply.user.image} alt='name' />
                                            </div>
                                            <div className='name'>
                                                <h3>{reply.user.name}</h3>
                                                <p>{reply.user.username}</p>
                                            </div>
                                            <div className='reply'>
                                                {/* <span onClick={() => {
                                                    setToggleReply(index)
                                                }} >Reply</span> */}
                                            </div>
                                        </div>
                                        <div className='comment'>
                                            <div></div>
                                            <div className='reply-div'>
                                                <p> <span className='replyingTo'>@{reply.replyingTo}</span>
                                                    {reply.content} </p>
                                                {/* {toggleReply === index && (
                                                    <div className='post-reply'>
                                                        <textarea className='reply-input'
                                                            name='reply'
                                                            placeholder='Type your comment here'
                                                            rows="4"
                                                            cols="50"
                                                            value={replyContent}
                                                            onChange={(e) => setReplyContent(e.target.value)}
                                                        >
                                                        </textarea>

                                                        <button className='post-btn' onClick={postReply} >Post Reply</button>
                                                    </div>
                                                )} */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {/* <div className='main-comment'>
                    <div className='profile'>
                        <div className='image'>
                            <img src='./user-images/image-james.jpg' alt='name' />
                        </div>
                        <div className='name'>
                            <h3>James Skinner</h3>
                            <p>@hummingbird1</p>
                        </div>
                        <div className='reply'>
                            <span >Reply</span>
                        </div>
                    </div>
                    <div className='comment'>
                        <div></div>
                        <div>

                            <p>Also, please allow styles to be applied based on system preferences.
                                I would love to be able to browse Frontend Mentor in the evening after my device’s
                                dark mode turns on without the bright background it currently has.</p>
                            <div className='post-reply'>
                                <textarea className='reply-input'
                                    name='reply'
                                    placeholder='Type your comment here'
                                    rows="4"
                                    cols="50"
                                >
                                </textarea>

                                <button className='post-btn'>Post Reply</button>
                            </div>
                        </div>

                    </div>
                </div> */}
            </div>

            <div className='add-comment-container'>
                <h3 className='add-comment'>Add Comment</h3>
                <textarea className='add-comment'
                    name='comment'
                    placeholder='Type your comment here'
                    rows="6"
                    value={commentContent}
                    maxLength={maxLength}
                    onBlur={() => setTouchedComment(true)}
                    onChange={(e) => setCommentContent(e.target.value)}
                >

                </textarea>
                {touchedComment && commentContent.length === 0 && <span className='error'>Field is required</span>}
                <div className='add-desc'>
                    <p>{maxLength - commentContent.length} Characters Left</p>
                    <button className='post-comment-btn' onClick={postCommment} >Post Comment</button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackDetails