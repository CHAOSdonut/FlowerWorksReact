const BASE_URL = 'http://localhost:5032';

const apiFetch = (url: string, options: RequestInit = {}): Promise<Response> => {
    const fullUrl = `${BASE_URL}${url}`;

    const defaultOptions: RequestInit = {
       ...options,
    };

    return fetch(fullUrl, defaultOptions)
        .then((response) => {
            if (!response.ok) {
                
                return response.text().then((errorMessage) => {
                    throw new Error(errorMessage || 'Something went wrong');
                });
            }
            
            return response;
        })
        .catch((error) => {
            
            throw new Error(`Fetch error: ${(error as Error).message}`);
        });
};

export default apiFetch;
