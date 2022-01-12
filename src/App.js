import {BrowserRouter, Route, Routes} from 'react-router-dom';

import MainPage from './pages/MainPage';
import PersonPage from './pages/PersonPage';
import MoviePage from './pages/MoviePage';
import Page404 from './pages/Page404';

import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/:personId" element={<PersonPage/>}/>
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
