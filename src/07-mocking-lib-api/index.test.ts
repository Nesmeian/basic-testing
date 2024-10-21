import axios from 'axios';
import { throttledGetDataFromApi } from './index';
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));
jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  let mockAxiosCreate: jest.Mock;
  let mockAxiosGet: jest.Mock;

  beforeEach(() => {
    mockAxiosGet = jest.fn().mockResolvedValue({ data: {} });
    mockAxiosCreate = jest.fn(() => ({ get: mockAxiosGet }));
    (axios.create as jest.Mock) = mockAxiosCreate;

    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('test');
    expect(mockAxiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = 'test';
    await throttledGetDataFromApi(relativePath);
    expect(mockAxiosGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = { message: 'Success' };
    mockAxiosGet.mockResolvedValue({ data: mockData });

    const result = await throttledGetDataFromApi('test');
    expect(result).toEqual(mockData);
  });
});
