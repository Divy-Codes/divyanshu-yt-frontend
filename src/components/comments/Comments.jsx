import './_comments.scss';
import Comment from '../comment/Comment';
import { useState, useEffect } from 'react';
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCommentsById,
  postComment,
} from '../../redux/slices/commentsByIdSlice';

export default function Comments({ videoId, totalComments }) {
  const [comments, setComments] = useState(null);
  const [commentText, setCommentText] = useState('');
  const commentsData = useSelector((state) => state.commentThreads.comments);
  const commentPosted = useSelector(
    (state) => state.commentThreads.commentPosted
  );
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.authObject.user); //for profile pic

  //Calculate window width and set it to windowWidth state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    return () =>
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);

  // const handleImageError = (fallback) => (event) =>
  // (event.target.src = fallback);

  const fallback = (e) =>
    (e.target.src =
      'https://yt3.ggpht.com/NOSx1LAKxaiTIBDjoFRm9xvT7Ytp_KjZTrxyci6QMc-2kpKJeDqqCaDl4KbGqoB-PLH4063mnQ=s88-c-k-c0x00ffffff-no-rj');

  const CollapsedComments = () => {
    const [openCommentsPanel, setCommentsPanel] = useState(false);

    return (
      <div className='collapsedComments'>
        <p
          className='commentStatus'
          onClick={() => setCommentsPanel(!openCommentsPanel)}
        >
          {openCommentsPanel ? (
            <span>Hide Comments</span>
          ) : (
            <span>Show Comments</span>
          )}
        </p>
        <div className='panelContainer'>
          <SlidingPanel
            type='bottom'
            isOpen={openCommentsPanel}
            backdropClicked={() => setCommentsPanel(false)}
            size={60}
            panelClassName='commentsPanel'
            panelContainerClassName='panelContainer'
            // noBackdrop={noBackdrop}
          >
            <p className='closePanel' onClick={() => setCommentsPanel(false)}>
              Hide Comments
            </p>
            <ul className='commentsList'>
              {/* {[...Array(20)].map((comment, i) => (
                <li key={i}>
                  <Comment />
                </li>
              ))} */}

              {comments &&
                comments.map((comment, i) => (
                  <li key={i}>
                    <Comment comment={comment} />
                  </li>
                ))}
            </ul>
          </SlidingPanel>
        </div>
      </div>
    );
  };

  const addComment = (e) => {
    e.preventDefault();
    if (commentText === '') return;
    dispatch(postComment({ videoId, commentText }));
    setCommentText('');
  };

  //To update comments, another call to getCommentsById(videoId) doesn't work as data on servers isn't getting updated immediately. It takes more than a minute sometimes for updation.
  //This is a somewhat safe workaround because, we are updating from the very data provided by API upon adding a comment. We aren't simply hard-coding it.
  useEffect(() => {
    if (commentPosted !== null) {
      setComments([commentPosted.snippet.topLevelComment.snippet, ...comments]);
    }
  }, [commentPosted]);

  //Get Comments for this video
  useEffect(() => {
    dispatch(getCommentsById(videoId));
  }, [dispatch, videoId]);

  useEffect(() => {
    if (commentsData) {
      setComments(
        commentsData.map((comment) => comment.snippet.topLevelComment.snippet)
      );
    }
  }, [commentsData]);

  return (
    <section className='commentSection'>
      <h5>{totalComments} Comments</h5>
      <div className='commentsForm d-flex w-100 my-2'>
        {userProfile && (
          <img
            src={userProfile.photoURL}
            // src="https://yt3.ggpht.com/NOSx1LAKxaiTIBDjoFRm9xvT7Ytp_KjZTrxyci6QMc-2kpKJeDqqCaDl4KbGqoB-PLH4063mnQ=s88-c-k-c0x00ffffff-no-rj"
            alt='Channel Thumbnail'
            onError={fallback}
            className='rounded-circle'
          />
        )}
        <form className='d-flex flex-grow-1' onSubmit={addComment}>
          <input
            type='text'
            name='commentText'
            id='commentInput'
            placeholder='Add a comment ...'
            className='flex-grow-1'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className='border-0 p-2' disabled={commentText === ''}>
            Comment
          </button>
        </form>
      </div>
      {/* If windowWidth<1200 collapse comments */}
      {windowWidth < 1200 ? (
        <CollapsedComments />
      ) : (
        <ul className='commentsList'>
          {comments &&
            comments.map((comment, i) => (
              <li key={i}>
                <Comment comment={comment} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
