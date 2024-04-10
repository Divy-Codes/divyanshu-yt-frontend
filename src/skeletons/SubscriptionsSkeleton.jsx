import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './_subscriptionsSkeleton.scss';

const styles = {
  margin: '2rem 0',
  display: 'flex',
  height: '13rem',
  width: '100%',
  padding: '1rem',
  gap: '1rem',
};

const one = {
  flexGrow: 1,
  //   flexShrink: 2,
};

const three = {
  backgroundColor: '#111',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.5rem',
  borderRadius: '20px',
};

export default function SubscriptionsSkeleton() {
  return (
    <SkeletonTheme baseColor='#202020' highlightColor='#252525'>
      <section style={styles} className='container'>
        <div style={one}>
          <div style={three} className='three'>
            <Skeleton height='10vw' width='10vw' circle />
          </div>
        </div>
        <div className='two'>
          <div>
            <Skeleton height='1rem' width='95%' borderRadius={7} />
          </div>
          <div>
            <Skeleton height='0.75rem' width='85%' borderRadius={3} />
          </div>
          <div>
            <Skeleton height='0.75rem' width='50%' borderRadius={3} />
          </div>
        </div>
      </section>
    </SkeletonTheme>
  );
}
