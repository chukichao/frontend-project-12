import { BrowserRouter } from 'react-router-dom';
import '../assets/application.scss';
import AppRouter from './AppRouter.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
