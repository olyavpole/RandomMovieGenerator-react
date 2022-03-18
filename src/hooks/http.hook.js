import { useCallback, useState } from "react";

const useHttp = () => {

    const [process, setProcess] = useState('waiting');

    const request = useCallback( async (url, method = 'GET', body = null, headers = {'content-type': 'application/json'}) => {

        setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }

            const data = await response.json();

            return data;
        } catch(e) {
            setProcess('error');
            throw e;
        }
    }, [])

    const clearError = useCallback(() => {
        setProcess('loading');
    }, [])

    return {
        process,
        setProcess,
        request,
        clearError
    }

}

export default useHttp;