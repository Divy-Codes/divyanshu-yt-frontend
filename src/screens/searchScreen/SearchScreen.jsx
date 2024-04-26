import { useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getSearchedVideos } from '../../redux/slices/searchVideoSlice';
import SearchedVideo from '../../components/searchedVideo/SearchedVideo';

export default function SearchScreen() {
  const { query } = useParams();
  const dispatch = useDispatch();

  const fetchMoreData = () => {
    dispatch(getSearchedVideos(query));
  };

  useEffect(() => {
    dispatch(getSearchedVideos(query));
  }, [query, dispatch]);

  const videos = useSelector((state) => state.searchedVideos.videos);

  return (
    <Container className='searchContainer'>
      <InfiniteScroll
        // height={300}
        dataLength={videos.length}
        next={fetchMoreData}
        hasMore={true}
        // loader={<div>Loading...</div>}
        loader={
          <div className='spinner-border text-danger d-block mx-auto'></div>
        }
      >
        {videos &&
          videos.map((video, i) => (
            <SearchedVideo
              video={video}
              key={video.id.videoId + `${i}` || video.id.channelId + `${i}`}
              index={i}
              passedId={video.id.videoId || video.id.channelId}
            />
          ))}
      </InfiniteScroll>
    </Container>
  );
}
