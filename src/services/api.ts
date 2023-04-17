const BASE_URL = "https://hn.algolia.com/api/v1";

export const fetchPosts = (page: number) => {
  const url = `${BASE_URL}/search_by_date?tags=story&page=${page}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.hits) //api data is present in hits property
    .catch((error) => {
      console.error(error);
      return [];
    });
};
