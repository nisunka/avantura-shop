import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={272}
    height={452}
    viewBox="0 0 272 452"
    backgroundColor="rgba(235, 240, 255, .9)"
    foregroundColor="rgba(197, 195, 247, .2)">
    <rect x="0" y="0" rx="15" ry="15" width="270" height="230" />
    <rect x="0" y="248" rx="15" ry="15" width="270" height="23" />
    <rect x="0" y="289" rx="15" ry="15" width="270" height="56" />
    <rect x="0" y="363" rx="15" ry="15" width="137" height="40" />
    <rect x="6" y="424" rx="15" ry="15" width="70" height="25" />
    <rect x="200" y="424" rx="15" ry="15" width="70" height="25" />
  </ContentLoader>
);

export default Skeleton;
