import { baseUrl, buildUrl } from './api';

const params = '/movie/123';
const queries = { language: 'en-US' };
const apiKey = process.env.tmdb_api_key;
const expectedUrl = `${baseUrl}${params}?api_key=${apiKey}&language=en-US`;

describe('fetchBaseRequest', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should build the correct url', () => {
    const result = buildUrl(params, queries);

    expect(result).toEqual(expectedUrl);
  });
});
