import { useState, useEffect } from 'react';
import request from '../../utils/api';
import './_searchedVideo.scss';

import { Col, Row } from 'react-bootstrap';
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

export default function SearchedVideo({ video }) {
  const [duration, setDuration] = useState('');
  const [viewCount, setViewCount] = useState('');
  let [channelThumbnailURL, setChannelThumbnail] = useState('');
  const navigate = useNavigate();
  const {
    id,
    snippet: {
      title,
      channelTitle,
      channelId,
      publishedAt,
      description,
      thumbnails: { medium },
    },
  } = video;

  console.log(`video:`, video);

  const isVideo = id.kind === 'youtube#video';
  console.log(`isVideo:`, isVideo);

  const openChannel = () => {
    navigate(`/channel/${id.channelId}`);
  };

  if (!isVideo)
    return (
      <Row
        className='channelRow px-2 py-2 m-2 align-items-center'
        onClick={openChannel}
      >
        <Col xs={12} sm={4} md={4} className='videoThumbnail'>
          <div className='channelThumbnailWrapper'>
            <LazyLoadImage
              // src="https://i.ytimg.com/vi/mLFCSOLwfho/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBJa4akFCrF4oC0TwsRC8Jpy2E65w"
              src={medium.url}
              alt='Channel Thumbnail'
              effect='blur'
              className='channelThumbnailImage'
              width='100%'
            />
          </div>
        </Col>
        <Col xs={12} sm={7} md={7} className='videoDetails channelDetails p-0'>
          {/* <div className="otherDetails"> */}
          <span className='channelTitle'>
            {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora corrupti aperiam saepe mollitia quos odio nam  */}
            {title}
          </span>
          <div className='channelDescription'>{description}</div>
        </Col>
      </Row>
    );

  useEffect(() => {
    if (isVideo) {
      console.log(`is video`);

      //Don't fetch video details for channels
      (async () => {
        const { data } = await request('/videos', {
          params: {
            part: 'snippet,contentDetails,statistics',
            id: id.videoId,
          },
        });
        setDuration(data.items[0].contentDetails.duration);
        setViewCount(data.items[0].statistics.viewCount);
      })();
    }
  }, [id]);

  useEffect(() => {
    if (isVideo) {
      (async () => {
        const { data } = await request('/channels', {
          params: {
            part: 'snippet',
            id: channelId,
          },
        });
        setChannelThumbnail(data.items[0].snippet.thumbnails.default.url);
      })();
    }
  }, [channelId]);

  const seconds = dayjs.duration(duration).asSeconds();
  const videoDuration = dayjs.utc(seconds * 1000).format('mm:ss');

  const watchVideo = () => {
    navigate(`/video/${id.videoId}`);
  };

  return (
    <Row
      className='sidePlaylistSection align-items-start px-2 py-2 m-2'
      onClick={watchVideo}
    >
      <Col xs={12} sm={5} md={5} className='videoThumbnail'>
        <div className='sideVideoThumbnail'>
          <LazyLoadImage
            // src="https://i.ytimg.com/vi/mLFCSOLwfho/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBJa4akFCrF4oC0TwsRC8Jpy2E65w"
            src={medium.url}
            alt='Video Thumbnail'
            effect='blur'
            className='sideThumbnail'
            wrapperClassName='sideVideoWrapper'
            width='100%'
          />
          {isVideo && (
            <span className='sideVideoDuration'>{videoDuration}</span>
          )}
        </div>
      </Col>
      <Col xs={12} sm={6} md={6} className='videoDetails p-0'>
        {/* <div className="otherDetails"> */}
        <span className='sideVideoTitle'>
          {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora corrupti aperiam saepe mollitia quos odio nam  */}
          {title}
        </span>

        <div className='viewsRelativeTime'>
          <span className='sideViews'>{numeral(viewCount).format('0.a')}</span>
          {/* <span className="sideViews">{numeral("12800").format("0.a")}</span> */}
          &nbsp;&bull;&nbsp;
          <span className='relativeTime'>{dayjs(publishedAt).fromNow()}</span>
          {/* <span className="relativeTime">
              {dayjs("2020-06-06").fromNow()}
            </span> */}
        </div>
        <div className='sideVideoDetails'>
          <div className='sideChannelName'>
            {/* Divyanshu Codes Youtube Divyanshu Codes Youtube Divyanshu Codes
              Youtube */}
            {channelThumbnailURL && (
              <LazyLoadImage
                src={channelThumbnailURL}
                alt='channel Thumbnail'
                className='channelThumbnail'
              />
            )}
            {channelTitle}
          </div>
        </div>
        {isVideo && <div className='description'>{description}</div>}
        {/* </div> */}
      </Col>
    </Row>
  );
}
