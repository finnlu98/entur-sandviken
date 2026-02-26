import './app.css';
import './styles/global.css';
import './styles/colors.css';
import './styles/widgets.css';
import './styles/animation.css';
import 'leaflet/dist/leaflet.css';
import AuthProvider from './context/auth-context';
import apiClient from './api/api-client';
import externalApiClient from './api/external-api-client';
import ErrorBoundary from './feedback/error/error-boundary';
import { ApiBridge } from './feedback/loading/components/api-bridge';
import FeedBackProvider from './feedback/feedback-provider';
import DashboardContainer from './core/dashboard/dashboard-container';

function App() {
  return (
    <ErrorBoundary>
      <FeedBackProvider>
        <ApiBridge apiClient={apiClient} />
        <ApiBridge apiClient={externalApiClient} />
        <AuthProvider>
          <div className="app">
            <DashboardContainer />
          </div>
        </AuthProvider>
      </FeedBackProvider>
    </ErrorBoundary>
  );
}

export default App;
