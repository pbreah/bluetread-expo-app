import { useEffect, useState } from 'react'

export const useApiData = <T,>(path: string, search: string = '') => {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
        const q = `${process.env.API_URL}/${path}${search !== '' ? `?searchTerm=${encodeURIComponent(search)}` : ''}`;
        console.log(q);
          const response = await fetch(q);
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [search]);
  
    return { data, loading };
};
