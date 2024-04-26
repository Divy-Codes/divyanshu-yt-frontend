import './_videoPlayerData.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import numeral from 'numeral';
import { useEffect, useReducer, useState } from 'react';
import { IconContext } from 'react-icons';
import { VscThumbsdown } from 'react-icons/vsc';
import { VscThumbsdownFilled } from 'react-icons/vsc';
import { VscThumbsup } from 'react-icons/vsc';
import { VscThumbsupFilled } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import {
  getChannelById,
  getSubscriptionStatus,
} from '../../redux/slices/channelById';
import { likeDislikeVideo } from '../../redux/slices/likeVideoSlice';

export default function VideoPlayerData({ video, videoId }) {
  const { title, publishedAt, description, channelTitle, channelId } =
    video.snippet;
  const { viewCount, likeCount } = video.statistics;

  const [liked, toggleLiked] = useReducer((value) => !value, false);
  const [disliked, toggleDisliked] = useReducer((value) => !value, false);
  const [showMore, toggleShowMore] = useReducer((value) => !value, false);
  const [channelSnippet, setChannelSnippet] = useState({});
  const [channelStatistics, setChannelStatistics] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChannelById(channelId));
    dispatch(getSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  const channel = useSelector(
    (state) => state?.selectedChannelDetails?.channel
  );

  useEffect(() => {
    if (channel) {
      setChannelSnippet(channel.snippet);
      setChannelStatistics(channel.statistics);
    }
  }, [channel]);

  //Like-Dislike Functionality
  const handleLikeDislike = (likeStatus) => {
    //likeStatus would be like or dislike
    //If already liked/disliked and clicked again, we want to dispatch 'none' in likeStatus to slice
    if (likeStatus == 'like') {
      likeStatus = liked ? 'none' : 'like';
      toggleLiked();
    } else {
      likeStatus = disliked ? 'none' : 'dislike';
      toggleDisliked();
    }
    dispatch(likeDislikeVideo({ videoId, likeStatus }));
  };

  const subscribed = useSelector(
    (state) => state.selectedChannelDetails.subscriptionStatus
  );

  return (
    <div className='videoData'>
      <div className='title'>
        <h4 className='videoTitle'>{title}</h4>
      </div>
      <div className='channelDetailsContainer d-flex justify-content-between align-items-center '>
        <div className='channelDetails d-flex align-items-center gap-2'>
          {channelSnippet && (
            <img
              src={channelSnippet?.thumbnails?.default?.url}
              alt='Youtube channel thumbail image'
              className='channelImage rounded-circle'
            />
          )}
          <div className='channel d-flex flex-column '>
            <span className='channelTitle'>{channelTitle}</span>
            {channelStatistics && (
              <span className='subscribers'>
                {numeral(channelStatistics?.subscriberCount).format('0.a')}
                &nbsp;
                {/* {numeral(150000).format("0.a")}&nbsp; */}subscribers
              </span>
            )}
          </div>
        </div>
        <div className='subscribeAndLike d-flex gap-3'>
          <button className='likeUnlike'>
            <span
              onClick={() => handleLikeDislike('like')}
              className='likeButton'
            >
              {liked ? (
                <span style={{ fontSize: '2rem' }}>
                  <IconContext.Provider value={{ className: 'likeUnlikeIcon' }}>
                    <VscThumbsupFilled />
                  </IconContext.Provider>
                </span>
              ) : (
                <span>
                  <IconContext.Provider value={{ className: 'likeUnlikeIcon' }}>
                    <VscThumbsup />
                  </IconContext.Provider>
                </span>
              )}
              &nbsp;
              <span className='likeCount'>
                {numeral(likeCount).format('0.a')}
              </span>
            </span>
            <span>|</span>
            <span
              onClick={() => handleLikeDislike('dislike')}
              className='dislikeButton'
            >
              {disliked ? (
                <span>
                  <IconContext.Provider value={{ className: 'likeUnlikeIcon' }}>
                    <VscThumbsdownFilled />
                  </IconContext.Provider>
                </span>
              ) : (
                <span>
                  <IconContext.Provider value={{ className: 'likeUnlikeIcon' }}>
                    <VscThumbsdown />
                  </IconContext.Provider>
                </span>
              )}
            </span>
          </button>
          <div className='subscribeButton'>
            <button
              className={`subscribe ${subscribed && 'channelIsSubscribed'}`}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
      <div className='description'>
        <span>
          <strong>{numeral(viewCount).format('0.a')} views &#x2022;</strong>
        </span>
        &nbsp;
        <span>
          <strong>{dayjs(publishedAt).fromNow()}</strong>
        </span>
        &nbsp;
        <p
          className={!showMore ? 'showLess descriptionText' : 'descriptionText'}
        >
          {description}
        </p>
        <span className='showMore' onClick={toggleShowMore}>
          {showMore ? 'ShowLess' : 'Show More'}
        </span>
      </div>
    </div>
  );
}
