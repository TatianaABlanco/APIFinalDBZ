import { useEffect, useState } from "react";

const initialUrl = import.meta.env.VITE_DRAGON_BALL_API_LIST || 'https://dragonball-api.com/api/characters?limit=10';

const useDragonBallAPI = () => {
  const [characters, setCharacters] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [isFiltered, setIsFiltered] = useState(false); 

  const fetchCharacters = async (targetUrl) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(targetUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      setCharacters(data.items || data || []);
      setPaginationLinks(data.links || {});
    } catch (err) {
      console.error("Error fetching characters: ", err);
      setError(err);
      setCharacters([]);
      setPaginationLinks({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(url);
  }, [url]);

  const onPrevious = () => {
    if (paginationLinks.previous) setUrl(paginationLinks.previous);
  };

  const onNext = () => {
    if (paginationLinks.next) setUrl(paginationLinks.next);
  };

  const searchCharacters = (query) => {
    const trimmed = query.trim();
    if (!trimmed) {
      resetCharacters();
      return;
    }

    const searchUrl = `https://dragonball-api.com/api/characters?name=${encodeURIComponent(trimmed)}`;
    setUrl(searchUrl);
    setIsFiltered(true); 
  };

  const resetCharacters = () => {
    setUrl(initialUrl);
    setIsFiltered(false);
  };

  return {
    characters,
    paginationLinks,
    loading,
    error,
    onPrevious,
    onNext,
    searchCharacters,
    resetCharacters, 
    isFiltered 
  };
};

export default useDragonBallAPI;
