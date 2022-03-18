import { Helmet } from 'react-helmet';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import SearchForm from "../../components/searchForm/SearchForm";
import Header from "../header/Header";

import './page.scss'


const MainPage = () => {
    return (
        <>
            <Helmet>
                <meta
                name="description"
                content="Random Movie Generator"
                />
                <title>Random Movie Generator</title>
            </Helmet>
            <div className="page__wrapper">
                <Header/>
                <ErrorBoundary>
                    <SearchForm/>
                </ErrorBoundary>
            </div>
        </>
    )
}

export default MainPage;