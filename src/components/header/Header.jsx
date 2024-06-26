import './_header.scss';
import { useState } from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoPersonCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Header({ toggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const searchVideo = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className='header border border-dark'>
      <div className='menuContainer'>
        <MdOutlineMenu
          size={26}
          className='hamburger'
          onClick={toggleSidebar}
        />
        <Link to='/'>
          <img
            src='https://pngimg.com/uploads/youtube/youtube_PNG2.png'
            alt='Youtube Logo'
            className='youtubeLogo'
            width={40}
          />
        </Link>
      </div>

      <form onSubmit={searchVideo}>
        <input
          type='text'
          placeholder='Search'
          name='searchInput'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type='submit' disabled={searchQuery === ''}>
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className='userAvatar'>
        {/* {photoURL && (
          <img src={photoURL} alt="User's avatar" className='userPhoto' />
        )} */}

        <IoPersonCircle size={35} className='userPhoto' />
      </div>

      {/* <div className='userFeatures'>
        <MdNotifications size={28} />
        <MdApps size={28} />
      </div> */}
    </div>
  );
}

// https://pngimg.com/uploads/youtube/youtube_PNG2.png
