import './_comment.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
export default function Comment({ comment }) {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    publishedAt,
    textOriginal,
    textDisplay,
  } = comment;

  const fallback = (e) =>
    (e.target.src =
      'https://yt3.ggpht.com/NOSx1LAKxaiTIBDjoFRm9xvT7Ytp_KjZTrxyci6QMc-2kpKJeDqqCaDl4KbGqoB-PLH4063mnQ=s88-c-k-c0x00ffffff-no-rj');

  return (
    <section className='commentSection'>
      <div className='comment d-flex'>
        <img
          src={authorProfileImageUrl}
          onError={fallback}
          alt='Thumbnail'
          className='rounded-circle'
        />
        <div className='commentBody'>
          <p className='username'>
            {authorDisplayName} &nbsp;
            <span className='commentTime'>{dayjs(publishedAt).fromNow()}</span>
          </p>
          <p className='commentText'>
            <span>{textOriginal}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
