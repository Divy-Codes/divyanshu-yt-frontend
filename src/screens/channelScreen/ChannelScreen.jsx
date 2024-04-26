import { useParams } from 'react-router-dom';
import './_channelScreen.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getChannelVideos } from '../../redux/slices/channelVideosSlice';
import { Col, Container, Row } from 'react-bootstrap';
import Video from '../../components/video/Video';
import ChannelVideosSkeleton from '../../skeletons/ChannelVideosSkeleton';
import { getChannelById } from '../../redux/slices/channelById';
import numeral from 'numeral';

export default function ChannelScreen() {
  const [snippet, setSnippet] = useState({});
  const [statistics, setStatistics] = useState({});

  const { channelId } = useParams();
  const dispatch = useDispatch();

  //API call to get channel's videos and it's details
  useEffect(() => {
    dispatch(getChannelVideos(channelId));
    dispatch(getChannelById(channelId));
  }, [channelId, dispatch]);

  const { videos, loading } = useSelector((state) => state.channelVideos);

  const channel = useSelector((state) => state.selectedChannelDetails.channel);

  // const {
  //   snippet: {
  //     customUrl,
  //     title,
  //     description,
  //     thumbnails: { high },
  //   },

  //   statistics: { subscriberCount, videoCount },
  // } = channel;

  useEffect(() => {
    if (channel) {
      setSnippet(channel.snippet);
      setStatistics(channel.statistics);
    }
  }, [channel]);

  return (
    <>
      {channel && (
        <div className='infoContainer'>
          <div className='thumbnailContainer'>
            <img
              src={snippet?.thumbnails?.high?.url}
              alt='Channel Thumbnail'
              className='thumbnail'
            />
          </div>
          <div className='detailsContainer'>
            <h2>{snippet?.title}</h2>
            <div className='stats'>
              <span className='customUrl'>
                {snippet?.customUrl} &bull;&nbsp;
              </span>
              <span className='videoCount'>
                {numeral(statistics?.videoCount).format('0.a')} videos
                &bull;&nbsp;
              </span>
              <span className='subscriberCount'>
                {numeral(statistics?.subscriberCount).format('0.a')} Subscribers
              </span>
            </div>
            <div className='description'>{snippet?.description}</div>
            <button>Subscribe</button>
          </div>
        </div>
      )}
      <Container className='Container' id='homeScreenContainer'>
        <Row>
          {!loading && videos
            ? videos.map((video) => (
                <Col md={4} sm={6} xl={3} key={video?.id?.videoId || video?.id}>
                  <Video video={video} channelScreen />
                </Col>
              ))
            : [...Array(20)].map((item, i) => (
                <Col md={4} sm={6} xl={3} key={i}>
                  <ChannelVideosSkeleton />
                </Col>
              ))}
        </Row>
      </Container>
    </>
  );
}
