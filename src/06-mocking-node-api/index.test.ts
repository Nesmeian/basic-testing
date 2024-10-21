import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
describe('doStuffByTimeout', () => {
  let timeout: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    timeout = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 1000);
    expect(timeout).toHaveBeenCalledWith(cb, 1000);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 1000);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let interval: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    interval = jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 1000);
    expect(interval).toHaveBeenCalledWith(cb, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 1000);
    jest.advanceTimersByTime(3000);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    const mockJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(mockJoin).toHaveBeenCalledWith(__dirname, pathToFile);
    mockJoin.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonexistent.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
    (fs.existsSync as jest.Mock).mockRestore();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';
    const mockFileContent = 'Hello, World!';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValue(Buffer.from(mockFileContent));
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(mockFileContent);
    (fs.existsSync as jest.Mock).mockRestore();
    (fs.promises.readFile as jest.Mock).mockRestore();
  });
});
