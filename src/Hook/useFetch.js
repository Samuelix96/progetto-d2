import {useState, useEffect} from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDataApi = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (e) {
            setError(e);
        }
    };

    useEffect(() => {
       fetchDataApi();
    }, []);

    return {data, loading, error, fetchDataApi};
}
export default useFetch;