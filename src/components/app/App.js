import { lazy, Suspense } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Spinner from '../spinner/Spinner';

import './App.css';

const MainPage = lazy(() => import('../pages/MainPage'));
const PersonPage = lazy(() => import('../pages/PersonPage'));
const MoviePage = lazy(() => import('../pages/MoviePage'));
const Page404 = lazy(() => import('../pages/Page404'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/persons/:personId" element={<PersonPage/>}/>
            <Route path="/movies/:movieId" element={<MoviePage/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
