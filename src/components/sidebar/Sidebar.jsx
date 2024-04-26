import './_sidebar.scss';
import {
  MdHome,
  MdSubscriptions,
  MdHistory,
  MdExitToApp,
  MdLibraryBooks,
  MdSettings,
} from 'react-icons/md';
import { IoMdThumbsUp } from 'react-icons/io';
import auth from '../../utils/firebase';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { Link } from 'react-router-dom';
import { getLikedVideos } from '../../redux/slices/likedListSlice';

export default function Sidebar({ sidebar, toggleSidebar }) {
  const dispatch = useDispatch();
  const logOut = async () => {
    await signOut(auth);
    dispatch(logout());
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('user-profile');
  };

  const fetchLikedVideos = () => {
    dispatch(getLikedVideos());
  };

  return (
    <nav
      className={sidebar ? 'sidebar open' : 'sidebar'}
      onClick={toggleSidebar}
    >
      <Link to='/'>
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>

      <Link to='/feed/subscriptions'>
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </Link>
      <Link to='/likedVideos'>
        <li>
          <IoMdThumbsUp size={23} />
          <span>Liked</span>
        </li>
      </Link>
      <li className='dummyOption'>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <li className='dummyOption'>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li className='dummyOption'>
        <MdSettings size={23} />
        <span>Settings</span>
      </li>
      <hr />
      <li onClick={logOut}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
      <hr />
    </nav>
  );
}
