import { useState } from "react";

const useFetch = (route, onReceived) => {
 
  const controller = new AbortController();
  const signal = controller.signal;
  const cancelFetch = () => {
    controller.abort();
  };

  if (route.includes("api/")) {
   
    throw Error(
      "when using the useFetch hook, the route should not include the /api/ part"
    );
  }

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  const performFetch = (options) => {
    setError(null);
    setIsLoading(true);

    const baseOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    const fetchData = async () => {
      
      const url = `${process.env.BASE_SERVER_URL}/api${route}`;

      const res = await fetch(url, { ...baseOptions, ...options, signal });

      if (!res.ok) {
        setError(
          `Fetch for ${url} returned an invalid status (${
            res.status
          }). Received: ${JSON.stringify(res)}`
        );
      }

      const jsonResult = await res.json();

      onReceived(jsonResult);

      setIsLoading(false);
    };

    fetchData().catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  };

  return { isLoading, error, performFetch, cancelFetch };
};

export default useFetch;
