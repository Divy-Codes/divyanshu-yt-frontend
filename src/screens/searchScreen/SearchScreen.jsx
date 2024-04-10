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
        loader={<div>Loading...</div>}
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

        {/* </Row> */}
      </InfiniteScroll>
    </Container>
    // <div>Searched videos : {query}</div>
  );
}

//Finding duplicates in data
// const idArray = videos.map((video) => video.id.videoId || video.id.channelId);
// console.log(
//   `Duplicate ids:`,
//   idArray.filter((id, index) => idArray.indexOf(id) !== index)
// );

//If you want indices of duplicate data
// function duplicateIndices(arr) {
//   const duplicateIndices = [];
//   const unique = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (!unique.includes(arr[i])) {
//       unique.push(arr[i]);
//     } else {
//       duplicateIndices.push(i);
//     }
//   }
//   return duplicateIndices;
// }
// console.log(duplicateIndices(idArray));

{
  /* <Row> 
         {videos && !loading ? (
          videos.map((video) => (
            <SearchedVideo video={video} key={video.id.videoId} />
          ))
        ) : (
          <h1>Loading...</h1>
        )} */
}
