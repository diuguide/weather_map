import Results from '../components/Results';
import Hourly from '../components/Hourly';
import { useSelector, shallowEqual } from "react-redux";

const Main = () => {
    const store = useSelector((store) => store, shallowEqual);
    return (
        <>
        {store.searchQuery.data_loaded && (
        <Results />
        )}
        {store.searchQuery.data_loaded && (
        <Hourly />
        )}
        </>
    )
}

export default Main;