export const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = process.env.tmdb_api_key;

export const buildUrl = (
  params: string,
  queries: { [key: string]: string } = {},
) => {
  const queryParams = new URLSearchParams({ api_key: apiKey, ...queries });
  return `${baseUrl}${params}?${queryParams.toString()}`;
};
