import React, { useEffect, useState } from 'react';
import { FiPlus } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";
import { IoChevronBack, IoAddSharp, IoChevronUp, IoChevronDown, IoCheckmark } from 'react-icons/io5';
import { IoMenuSharp, IoCloseSharp } from 'react-icons/io5';
import { FaComment } from "react-icons/fa";
import FeedbackEmpty from "../feedbackEmpty/FeedbackEmpty";
import "./feedbacks.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { countComments, countStatuses } from '../../../utilities/Funcs';
import { selectAllFeedbacks, selectFilteredFeedbacks, selectCategory } from '../../../features/feedbacks/FeedbackSlice';



const Feedbacks = () => {
    //useState hooks
    const [toggleDrawer, setDrawerToggle] = useState(false);
    const [category, setNewCategory] = useState('all');
    const [categories] = useState(['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'])
    const [statuses, setStatuses] = useState([]);
    const [sortList] = useState(['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'])
    const [sort, setSort] = useState('Most Upvotes')
    const [sortToggle, setSortToggle] = useState(false)



    //useSelector and useDispatch hooks
    const dispatch = useDispatch();
    const feedbacks = useSelector(selectAllFeedbacks);
    let filteredFeedbacks = useSelector(selectFilteredFeedbacks);

    //handleToggleSideBar function
    const handleToggleSideBar = () => setDrawerToggle(!toggleDrawer)

    //handleSetCategory function
    const HandleSetCategory = (cat) => {
        setNewCategory(cat);
        dispatch(selectCategory(cat))
    }

    //handleSortToggle function
    const handleSortToggle = () => setSortToggle(!sortToggle)

    //handleSortSelect function
    const handleSortSelect = (srt) => {
        setSort(srt);
        setSortToggle(!sortToggle)
    }


    //useEffect hooks
    useEffect(() => {
        //dispatch(fetchFeedbacks())

        //update the statuses state
        setStatuses(countStatuses(feedbacks));


    }, [feedbacks])




    return (
        <div className='feedbacks-main'>
            <div className='side-nav'>
                <div className='logo-container'>
                    <h3>Frontend Mentor</h3>
                    <p>Feedback Board</p>
                    {!toggleDrawer && (<span className='menu-icon menu' onClick={handleToggleSideBar}><IoMenuSharp /></span>)}
                    {toggleDrawer && (<span className='menu-icon close active' onClick={handleToggleSideBar}><IoCloseSharp /></span>)}
                </div>
                <div className='categories-container large'>
                    <ul className='categories'>
                        {categories.map((cat, index) => (
                            <li key={index} onClick={() => HandleSetCategory(cat)}
                                className={cat === category ? 'active' : ''} >
                                {cat}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='status-container large'>
                    <div className='status-header'>
                        <h3>Roadmap</h3>
                        <Link className='link' to='/roadmap'><span className='view-roadmap'>View</span></Link>

                    </div>

                    <ul className='statuses'>
                        <li className='planned'> <span className='status-text'>Planned</span> <span className='status-count'>{statuses.planned ? statuses.planned : 0}</span> </li>
                        <li className='inprogress'> <span className='status-text'>In-Progress</span> <span className='status-count'>{statuses['in-progress'] ? statuses['in-progress'] : 0}</span></li>
                        <li className='live'> <span className='status-text'>Live</span> <span className='status-count'>{statuses.live ? statuses.live : 0}</span></li>
                        <li className='suggestion'> <span className='status-text'>Suggestions</span> <span className='status-count'>{statuses.suggestion ? statuses.suggestion : 0}</span></li>
                    </ul>

                </div>

            </div>
            <div className='feedbacks'>
                <div className='top-nav'>
                    <div className='nav-left'>

                        <span className='suggestion-icon'>
                            <svg width="20" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 2.274c2.237 0 4.339.854 5.923 2.408a8.123 8.123 0 012.465 5.839 8.084 8.084 0 01-1.7 4.979 8.457 8.457 0 01-3.652 2.71l-.31.112.003.826h.369c.262 0 .475.21.475.469a.47.47 0 01-.39.46l-.085.008h-.365l.004 1.02h.36c.263 0 .476.21.476.469a.47.47 0 01-.39.461l-.085.008h-.358l.006 1.487a.466.466 0 01-.381.46l-.094.01H9.23a.478.478 0 01-.466-.378l-.01-.092.006-1.487h-.357a.472.472 0 01-.475-.47.47.47 0 01.39-.46l.085-.008h.361l.004-1.02h-.365a.472.472 0 01-.475-.468.47.47 0 01.39-.462l.085-.007h.368l.004-.826a8.452 8.452 0 01-3.996-2.867 8.08 8.08 0 01-1.666-5.056c.032-2.127.923-4.152 2.511-5.7 1.508-1.471 3.448-2.322 5.493-2.416l.324-.009h.06zm1.791 19.769H9.709l-.004 1.02h3.59l-.004-1.02zm-.007-1.958H9.716l-.003 1.02h3.574l-.003-1.02zM11.5 3.212h-.054c-3.946.027-7.327 3.325-7.384 7.2-.048 3.266 2.14 6.192 5.322 7.118.174.05.3.193.332.364l.008.088-.004 1.166h3.56l-.004-1.166a.47.47 0 01.34-.452c3.134-.912 5.323-3.794 5.323-7.01a7.197 7.197 0 00-2.185-5.173A7.453 7.453 0 0011.5 3.212zm.829 1.782a.4.4 0 01.401.397v.322c.48.12.932.307 1.346.552l.228-.226a.405.405 0 01.569 0L16.046 7.2a.393.393 0 010 .56l-.23.228c.247.41.437.858.557 1.333h.323a.4.4 0 01.402.397v1.645a.4.4 0 01-.402.396h-.323c-.12.476-.31.924-.557 1.333l.23.228a.393.393 0 010 .56l-1.173 1.163a.405.405 0 01-.57 0l-.227-.227a5.02 5.02 0 01-1.346.553v.322a.4.4 0 01-.401.396H10.67a.4.4 0 01-.402-.396v-.322a5.022 5.022 0 01-1.345-.553l-.228.227a.405.405 0 01-.569 0L6.954 13.88a.393.393 0 010-.56l.23-.228a4.924 4.924 0 01-.557-1.333h-.324a.4.4 0 01-.401-.396V9.719a.4.4 0 01.401-.397h.324c.12-.475.31-.923.557-1.333l-.23-.228a.393.393 0 010-.56L8.127 6.04a.405.405 0 01.569 0l.228.226a5.021 5.021 0 011.345-.552V5.39a.4.4 0 01.402-.397zM11.5 7.721c-1.572 0-2.846 1.263-2.846 2.82 0 1.558 1.274 2.82 2.846 2.82s2.846-1.262 2.846-2.82c0-1.557-1.274-2.82-2.846-2.82zm11.025 4.152c.262 0 .475.21.475.469a.47.47 0 01-.39.461l-.085.008h-.498a.472.472 0 01-.475-.469.47.47 0 01.39-.461l.085-.008h.498zm-21.552 0c.262 0 .475.21.475.469a.47.47 0 01-.39.461l-.085.008H.475A.472.472 0 010 12.342a.47.47 0 01.39-.461l.085-.008h.498zM3.112 3.45l.074.06.46.451c.185.183.186.48 0 .663a.476.476 0 01-.596.062l-.075-.06-.459-.451a.465.465 0 01-.001-.663.48.48 0 01.597-.062zm17.373.062c.162.16.182.408.06.59l-.061.073-.46.45a.476.476 0 01-.67 0 .464.464 0 01-.06-.59l.06-.074.46-.45a.48.48 0 01.671 0zM11.5 0c.233 0 .427.166.467.384l.008.085v.49a.472.472 0 01-.475.468.473.473 0 01-.467-.384l-.008-.084v-.49c0-.26.213-.469.475-.469z" fill="#FFF" fillRule="nonzero" /></svg>
                        </span>
                        <h3 className='nav-header-text'>{filteredFeedbacks.length} Suggestions</h3>

                        <div className='sort-container'>
                            <div className='sort-selected' onClick={handleSortToggle}>
                                <p className='' >   <span > <span className='sort-label'>Sort by:</span> <span className='sort-selected-value'>{sort}</span>  </span> </p>
                                <span className='sort-selected-icon'> {sortToggle ? < IoChevronDown /> : <IoChevronUp />}  </span>
                            </div>
                            {sortToggle && (<ul className='sort-list'>
                                {sortList.map((srt, index) => (
                                    <li key={index + 1} onClick={() => handleSortSelect(srt)} className={srt === sort ? 'active' : ''}>{srt} {(sort === srt) && (<span> <IoCheckmark /> </span>)} </li>
                                ))}
                            </ul>)}
                        </div>
                        {/* <form>
                            <label className='label' htmlFor="sort-by">Sort by:</label>

                            <select className='sort' id="sort-by" name="sort-by">
                                <option className='option' value="most-votes">Most Upvotes</option>
                                <option className='option' value="least-votes">Least Upvotes</option>
                                <option className='option' value="most-comments">Most Comments</option>
                                <option className='option' value="least-comments">Leat Comments </option>
                            </select>


                        </form> */}
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

                {toggleDrawer && (<div className={`drawer ${toggleDrawer ? 'open' : 'close'}`}>
                    <div className='categories-container small'>
                        <ul className='categories'>
                            {categories.map((cat, index) => (
                                <li key={index + 12} onClick={
                                    () => {
                                        HandleSetCategory(cat)
                                        handleToggleSideBar()
                                    }
                                }

                                    className={cat === category ? 'active' : ''} >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='status-container small'>
                        <div className='status-header'>
                            <h3>Roadmap</h3>
                            <Link className='link' to='/roadmap'><span className='view-roadmap'>View</span></Link>

                        </div>

                        <ul className='statuses'>
                            <li className='planned'> <span className='status-text'>Planned</span> <span className='status-count'>{statuses.planned}</span> </li>
                            <li className='inprogress'> <span className='status-text'>In-Progress</span> <span className='status-count'>{statuses['in-progress']}</span></li>
                            <li className='live'> <span className='status-text'>Live</span> <span className='status-count'>{statuses.live}</span></li>
                            <li className='suggestion'> <span className='status-text'>Suggestions</span> <span className='status-count'>{statuses.suggestion}</span></li>
                        </ul>

                    </div>
                </div>)}

                {toggleDrawer && (<div className='backdrop'></div>)}

                {filteredFeedbacks.map(feedback => (

                    <div className='feedback' key={feedback.id}>
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
                            <Link to={`/feedback-details?id=${feedback.id}`} className='link' >
                                <h3> {feedback.title}</h3>
                            </Link>
                            <div>

                                <p> {feedback.description}</p>
                            </div>

                            <div>
                                <button className='feedback-tag' type='button'>
                                    {feedback.category}
                                </button>
                            </div>


                        </div>
                        <div className='comments-tag'>
                            <span className='comments-icon'><FaComment /></span>
                            <span className='comments-count'> {countComments(feedback)}</span>
                        </div>
                    </div>

                ))}

                {/* Empty Feedback page */}
                {(filteredFeedbacks.length === 0) && (<FeedbackEmpty />)}
            </div>



        </div>
    )
}

export default Feedbacks