import SearchForm from "../components/search-form/SearchForm";
import Logo from "../components/logo/Logo";

const MainPage = () => {
    return (
        <>
            <div className="page">
                <Logo/>
                <SearchForm/>
            </div>
        </>
    )
}

export default MainPage;