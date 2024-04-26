import './_app.scss';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/homeScreen/HomeScreen';
import { useEffect, useReducer } from 'react';
import LoginScreen from './screens/loginScreen/LoginScreen';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoPlayerScreen from './screens/VideoPlayer/VideoPlayerScreen';
import SearchScreen from './screens/searchScreen/SearchScreen';
import Subscriptions from './screens/subscriptions/Subscriptions';
import ChannelScreen from './screens/channelScreen/ChannelScreen';
import LikedVideos from './components/likedVideos/LikedVideos';

const HomeLayout = ({ children }) => {
  const [sidebar, toggleSidebar] = useReducer((value) => !value, false);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className='appContainer '>
        <Sidebar sidebar={sidebar} toggleSidebar={toggleSidebar} />
        {/*'fluid' :  to remove default padding from bootstap Container*/}
        <Container fluid className='appMain'>
          {children}
        </Container>
      </div>
    </>
  );
};

export default function App() {
  const { accessToken, loading } = useSelector((state) => state.authObject);

  //Re-direct to "/auth" if accessToken is null. Protects other components when not logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !accessToken) {
      navigate('/auth');
    }
  }, [accessToken, loading, navigate]);

  return (
    <Routes>
      <Route path='/auth' element={<LoginScreen />} />
      <Route
        path='/'
        element={
          <HomeLayout>
            <HomeScreen />
          </HomeLayout>
        }
      />
      <Route
        path='/search/:query'
        element={
          <HomeLayout>
            <SearchScreen />
          </HomeLayout>
        }
      />
      <Route
        path='video/:videoId'
        element={
          <HomeLayout>
            <VideoPlayerScreen />
          </HomeLayout>
        }
      />
      <Route
        path='feed/subscriptions'
        element={
          <HomeLayout>
            <Subscriptions />
          </HomeLayout>
        }
      />
      <Route
        path='channel/:channelId'
        element={
          <HomeLayout>
            <ChannelScreen />
          </HomeLayout>
        }
      />
      <Route
        path='/likedVideos'
        element={
          <HomeLayout>
            <LikedVideos />
          </HomeLayout>
        }
      />
      <Route path='*' element={<h3>Error 404: Not Found. Invalid URL </h3>} />
    </Routes>
  );
}
