import './_comment.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
export default function Comment({ comment }) {
  // console.log(`individual comment datta`, comment);
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
          // src="https://yt3.ggpht.com/NOSx1LAKxaiTIBDjoFRm9xvT7Ytp_KjZTrxyci6QMc-2kpKJeDqqCaDl4KbGqoB-PLH4063mnQ=s88-c-k-c0x00ffffff-no-rj"
          src={authorProfileImageUrl}
          onError={fallback}
          alt='Thumbnail'
          className='rounded-circle'
        />
        <div className='commentBody'>
          <p className='username'>
            {authorDisplayName} &nbsp;
            {/* <span className="commentTime">{dayjs("2018-08-08").fromNow()}</span> */}
            <span className='commentTime'>{dayjs(publishedAt).fromNow()}</span>
          </p>
          <p className='commentText'>
            {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, unde
            architecto vero cupiditate dicta, commodi sapiente mollitia dolores
            exercitationem similique, tempore eveniet dignissimos. Placeat, aut
            consequatur. Recusandae accusantium odio ullam. Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Consectetur impedit,
            voluptatem hic similique molestias totam eius! Laboriosam neque
            incidunt distinctio quasi omnis, laudantium odit. Ab saepe ad
            quaerat eum modi! */}
            <span>{textOriginal}</span>
            {/* <span>{textDisplay}</span> */}
          </p>
        </div>
      </div>
    </section>
  );
}
