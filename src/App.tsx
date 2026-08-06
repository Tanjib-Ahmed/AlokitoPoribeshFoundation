import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

// Initialize i18n
import './locales/i18n';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
