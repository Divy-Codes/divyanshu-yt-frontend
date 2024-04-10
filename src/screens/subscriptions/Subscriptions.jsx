import { useDispatch, useSelector } from 'react-redux';
import './_subscriptions.scss';
import { useEffect } from 'react';
import { getSubscriptions } from '../../redux/slices/subscriptionsSlice';
import { Container } from 'react-bootstrap';
import ChannelRow from '../../components/otherSubComponents/ChannelRow';
import SubscriptionsSkeleton from '../../skeletons/SubscriptionsSkeleton';

export default function Subscriptions() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);
  const { loading, videos } = useSelector((state) => state.subscriptions);
  return (
    <Container>
      {!loading
        ? videos &&
          videos.map((video) => (
            <ChannelRow key={video.id} video={video} subscriptions />
          ))
        : // <h2>Loading...</h2>
          [...Array(20)].map((item, i) => (
            // <Col md={4} key={i}>
            <SubscriptionsSkeleton key={i} />
            // </Col>
          ))}
    </Container>
  );
}
