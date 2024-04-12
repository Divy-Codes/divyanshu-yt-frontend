import { Col, Row } from 'react-bootstrap';
import './_videoPlayerScreen.scss';
import VideoPlayerData from '../../components/videoPlayerData/VideoPlayerData';
import Comments from '../../components/comments/Comments';
import SidePlaylistVideo from '../../components/SidePlaylistVideos/SidePlaylistVideo';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoById } from '../../redux/slices/videoByIdSlice';
import { getRelatedVideos } from '../../redux/slices/relatedVideosSlice';

export default function VideoPlayerScreen() {
  const { videoId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(videoId));
  }, [dispatch, videoId]);

  const { video, loading } = useSelector((state) => state.selectedVideoDetails);

  //When component mounts & we have video. Call for related videos
  useEffect(() => {
    if (video) {
      dispatch(getRelatedVideos(video.snippet.title));
    }
  }, [dispatch, video]);

  const { videos: relatedVideos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );

  relatedVideos && console.log(`related videos in screen:`, relatedVideos);

  return (
    //We already have the Bootstrap Container in the HomeLayouot in App.jsx
    <Row className='playerRow'>
      <Col xl={8}>
        <div className='videoPlayerContainer'>
          <iframe
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
            title={video?.snippet?.title}
          />
        </div>
        {!loading && video ? (
          // <VideoPlayerData videoId={videoId} />
          <VideoPlayerData video={video} videoId={videoId} />
        ) : (
          // <h5>Loading...</h5>
          <div className='spinner-border text-danger d-block mx-auto'></div>
        )}
        <Comments
          videoId={videoId}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>
      <Col xl={4}>
        {!loading &&
          relatedVideos &&
          relatedVideos.map((video) => (
            <SidePlaylistVideo video={video} key={video?.id?.videoId} />
          ))}
      </Col>
    </Row>
  );
}
