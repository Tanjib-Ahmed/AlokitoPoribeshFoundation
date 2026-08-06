import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes';

// Initialize i18n
import './locales/i18n';

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
