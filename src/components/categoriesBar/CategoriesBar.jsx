import { useEffect, useState } from 'react';
import './_categoriesBar.scss';
import {
  getHomeVideos,
  getVideosByCategory,
} from '../../redux/slices/homeVideosSlice';
import { useDispatch } from 'react-redux';

const arr = [
  'All',
  'Redux Toolkit',
  'React Js Tutorial',
  'Javascript Tutorial',
  'React virtualized',
  'Debouncing',
  'Memoization',
  'Throttling',
  'Recursion',
  'FrontEnd Developer',
  'Full Stack Developer',
  'JQuery',
  'Abort Controller',
  'Axios vs Fetch',
  'Functional Programming',
  'Higher Order Functions',
];

export default function CategoriesBar() {
  const [activeCategory, setActiveCategory] = useState('All');
  const dispatch = useDispatch();
  const categoryClicked = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    if (activeCategory == 'All') {
      dispatch(getHomeVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  }, [activeCategory, dispatch, setActiveCategory]);

  return (
    <div className='categoriesBar'>
      {arr.map((category, index) => (
        <span
          key={index.toString()}
          onClick={() => categoryClicked(category)}
          className={activeCategory === category ? 'active' : ''}
        >
          {category} &nbsp;
        </span>
      ))}
    </div>
  );
}
