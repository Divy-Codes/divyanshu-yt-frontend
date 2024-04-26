import './_loginScreen.scss';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../utils/firebase';
import {
  authPending,
  authRejected,
  authSuccess,
  loadProfile,
} from '../../redux/slices/authSlice';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    try {
      //Want loading state before making the request
      dispatch(authPending());

      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');
      const response = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(response);
      const accessToken = credential.accessToken;

      const userProfile = {
        name: response.user.displayName,
        photoURL: response.user.photoURL,
      };

      dispatch(authSuccess(accessToken));
      dispatch(loadProfile(userProfile));

      //Save the data in session storage. Otherwise we lose the access token on every refresh
      sessionStorage.setItem('access-token', JSON.stringify(accessToken));
      sessionStorage.setItem('user-profile', JSON.stringify(userProfile));
    } catch (error) {
      dispatch(authRejected(error.message));
    }
  };

  //Re-direct to homepage if we have the accessToken.
  const accessToken = useSelector((state) => state.authObject.accessToken);
  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  return (
    <div className='login'>
      <div className='loginContainer'>
        <div className='imgContainer'>
          <img
            src='https://pngimg.com/uploads/youtube/youtube_PNG2.png'
            alt='youtube Logo'
          />
        </div>
        <button onClick={login}>
          <FcGoogle /> | Sign In with Google
        </button>
        <p>
          A YouTube Frontend project. Created with &nbsp;
          <span className='heart'>&#9829;</span>
          <br />
          <span> &mdash; Divyanshu Gambhir</span>
        </p>
      </div>
    </div>
  );
}
