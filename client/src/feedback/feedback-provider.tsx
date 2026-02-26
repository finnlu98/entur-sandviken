import { AlertProvider } from './alert/provider/alert-provider';
import { LoadingProvider } from './loading/providers/loading-provider';

interface FeedBackProviderProps {
  children?: React.ReactNode;
}

const FeedBackProvider: React.FC<FeedBackProviderProps> = ({ children }) => {
  return (
    <AlertProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </AlertProvider>
  );
};
export default FeedBackProvider;
