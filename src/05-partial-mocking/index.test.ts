// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockSpy = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(mockSpy).not.toHaveBeenCalled();
    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();
    mockSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const mockSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(mockSpy).toHaveBeenCalledWith('I am not mocked');
    expect(mockSpy).toHaveBeenCalledTimes(1);
    mockSpy.mockRestore();
  });
});
