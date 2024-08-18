import LoadingSpinner from '@/components/main/Loading';
import dynamic from 'next/dynamic';

const Main = dynamic(() => import('../components/main/Main'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function HomePage() {
  return <Main />;
}
