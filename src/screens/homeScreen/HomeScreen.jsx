import './_homeScreen.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Video from '../../components/video/Video';
import CategoriesBar from '../../components/categoriesBar/CategoriesBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHomeVideos,
  getVideosByCategory,
} from '../../redux/slices/homeVideosSlice';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import HomePageSkeleton from '../../skeletons/HomePageSkeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function HomeScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeVideos());
  }, [dispatch]);

  const {
    videos,
    activeCategory,
    loading = false,
  } = useSelector((state) => state.homeVideos);

  const fetchMoreData = () => {
    console.log(`homeScreen fetchmore data called`);

    if (activeCategory == 'All') {
      dispatch(getHomeVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  return (
    <Container className='Container' id='homeScreenContainer'>
      <CategoriesBar />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMoreData}
        hasMore={true}
        style={{ overflowY: 'hidden' }}
        loader={
          <div className='spinner-border text-danger d-block mx-auto'></div>
        }
      >
        <Row>
          {!loading
            ? videos.map((video) => (
                <Col lg={4} md={4} sm={6} key={video.id.videoId || video.id}>
                  <Video video={video} />
                </Col>
              ))
            : [...Array(20)].map((item, i) => (
                <Col md={4} key={i}>
                  <HomePageSkeleton />
                </Col>
              ))}
        </Row>
      </InfiniteScroll>
    </Container>
  );
}
