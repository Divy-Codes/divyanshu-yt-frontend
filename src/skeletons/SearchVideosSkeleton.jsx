import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const styling = {
  margin: '0.25rem 0',
};

export default function SearchVideosSkeleton() {
  return (
    <SkeletonTheme baseColor='#202020' highlightColor='#252525'>
      <section style={{ margin: '0.5rem 0 0' }}>
        <div>
          <Skeleton height='11rem' width='100%' borderRadius={10} />
        </div>
        <div style={styling}>
          <div>
            <Skeleton height='1rem' width='95%' borderRadius={7} />
          </div>
          <div>
            <Skeleton height='0.75rem' width='50%' borderRadius={3} />
          </div>
        </div>
      </section>
    </SkeletonTheme>
  );
}
