import './_video.scss';
import { AiFillEye } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import request from '../../utils/api';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import numeral from 'numeral';
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';

export default function Video({ video, channelScreen }) {
  const {
    id,
    snippet: {
      title,
      channelTitle,
      publishedAt,
      channelId,
      thumbnails: { medium },
    },
    contentDetails,
    // contentDetails: { duration },
    // statistics: { viewCount },
  } = video;

  //Inconsistent API. When reusing this component to display searched videos, the "items" returned does not contain "contentDetails" & "statistics". Therefore, we will have to make an extra API call for these two. We need "duration" & "viewCount" from these two
  const [duration, setDuration] = useState('');
  const [viewCount, setViewCount] = useState('');

  //In "/video" API call, the id is simple string property. But in "/search" API call, the id is an object and the id is inside the "videoId" property of "id". To factor in both, we need the following
  const videoId = id?.videoId || contentDetails?.videoId || id;

  useEffect(() => {
    (async () => {
      const { data } = await request('/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: videoId,
        },
      });
      setDuration(data.items[0].contentDetails.duration);
      setViewCount(data.items[0].statistics.viewCount);
    })();
  }, [videoId]);

  const seconds = dayjs.duration(duration).asSeconds();
  const videoDuration = dayjs.utc(seconds * 1000).format('mm:ss');

  // Need another API call to get channel thumbnails
  let [channelThumbnailURL, setChannelThumbnail] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await request('/channels', {
        params: {
          part: 'snippet',
          id: channelId,
        },
      });
      setChannelThumbnail(data.items[0].snippet.thumbnails.default.url);
    })();
  }, [channelId]);

  const navigate = useNavigate();
  const navigateToVideo = (id) => {
    navigate(`/video/${id}`);
  };

  return (
    <div className='videoContainer' onClick={() => navigateToVideo(videoId)}>
      <div className='video'>
        <LazyLoadImage
          src={medium.url}
          alt='Video Thumbnail'
          effect='blur'
          className='videoThumbnail'
          width='100%'
        />
        <span className='duration'>{videoDuration}</span>
      </div>
      <div
        className={
          channelScreen ? 'channelScreenDetailsContainer' : 'detailsContainer'
        }
      >
        {!channelScreen && (
          <div className='channelImage'>
            <LazyLoadImage
              src={channelThumbnailURL}
              alt='Channel Image'
              effect='blur'
              className='channelThumbnail'
            />
          </div>
        )}
        <div className='details'>
          <div className='videoTitle'>{title}</div>
          <div className='videoDetails'>
            {!channelScreen && (
              <span className='videoChannel'>{channelTitle}</span>
            )}
            <span>
              <AiFillEye />
              &nbsp;
              {numeral(viewCount).format('0.a')} &bull;&nbsp;
              {dayjs(publishedAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
