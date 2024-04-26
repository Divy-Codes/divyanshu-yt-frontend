import { LazyLoadImage } from 'react-lazy-load-image-component';
import './_channelRow.scss';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ChannelRow({ video, subscriptions }) {
  const navigate = useNavigate();

  const {
    id,
    snippet: {
      title,
      description,
      channelId,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video;

  const idOfChannel = resourceId?.channelId || channelId;

  const openChannel = () => {
    navigate(`/channel/${idOfChannel}`);
  };

  return (
    <Row
      className='channelRow px-2 py-2 m-2 align-items-center'
      onClick={openChannel}
    >
      <Col xs={12} sm={4} md={4} className='videoThumbnail'>
        <div className='channelThumbnailWrapper'>
          <LazyLoadImage
            src={medium.url}
            alt='Channel Thumbnail'
            effect='blur'
            className='channelThumbnailImage'
            width='100%'
          />
        </div>
      </Col>
      <Col xs={12} sm={7} md={7} className='videoDetails channelDetails p-0'>
        <span className='channelTitle'>{title}</span>
        <div className='channelDescription'>{description}</div>
        {subscriptions && (
          <div className='numOfVideos'>
            {video?.contentDetails.totalItemCount}&nbsp;Videos
          </div>
        )}
      </Col>
    </Row>
  );
}
