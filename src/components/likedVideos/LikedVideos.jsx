// import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getLikedVideos } from '../../redux/slices/likedListSlice';
// import SearchedVideo from '../../components/searchedVideo/SearchedVideo';
import request from '../../utils/api';
// import './_searchedVideo.scss';
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

export default function LikedVideos() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]);

  const videos = useSelector((state) => state.likedVideosList.videos);

  return (
    <Container className='searchContainer'>
      {videos &&
        videos.map((video, i) => (
          <LikedVideo
            video={video}
            key={video?.id}
            // index={i}
            // passedId={video.id.videoId || video.id.channelId}
          />
        ))}
    </Container>
  );
}

function LikedVideo({ video }) {
  let [channelThumbnailURL, setChannelThumbnail] = useState('');
  const navigate = useNavigate();
  const {
    id,
    contentDetails: { duration },
    statistics: { viewCount },

    snippet: {
      title,
      channelTitle,
      channelId,
      publishedAt,
      description,
      thumbnails: { medium },
    },
  } = video;

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

  const seconds = dayjs.duration(duration).asSeconds();
  const videoDuration = dayjs.utc(seconds * 1000).format('mm:ss');

  const watchVideo = () => {
    navigate(`/video/${id}`);
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
          <span className='sideVideoDuration'>{videoDuration}</span>
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
        <div className='description'>{description}</div>
        {/* </div> */}
      </Col>
    </Row>
  );
}
