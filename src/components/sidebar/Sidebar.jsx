import './_sidebar.scss';
import {
  MdHome,
  MdSubscriptions,
  MdHistory,
  MdExitToApp,
  MdLibraryBooks,
  MdSentimentDissatisfied,
} from 'react-icons/md';
import { IoMdThumbsUp } from 'react-icons/io';
import auth from '../../utils/firebase';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { Link } from 'react-router-dom';

export default function Sidebar({ sidebar, toggleSidebar }) {
  const dispatch = useDispatch();
  const logOut = async () => {
    await signOut(auth);
    dispatch(logout());
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('user-profile');
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
      <li>
        <IoMdThumbsUp size={23} />
        <span>Liked</span>
      </li>
      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={23} />
        <span>Lorem Ipsum</span>
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
