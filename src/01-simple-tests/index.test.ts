// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 155, b: 7, action: Action.Add };
    const expected = 162;
    expect(simpleCalculator(input)).toBe(expected);
  });

  test('should subtract two numbers', () => {
    const input = { a: 100, b: 44, action: Action.Subtract };
    const expected = 56;
    expect(simpleCalculator(input)).toBe(expected);
  });

  test('should multiply two numbers', () => {
    const input = { a: 55, b: 22, action: Action.Multiply };
    const expected = 1210;
    expect(simpleCalculator(input)).toBe(expected);
  });

  test('should divide two numbers', () => {
    const input = { a: 100, b: 2, action: Action.Divide };
    const expected = 50;
    expect(simpleCalculator(input)).toBe(expected);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 100, b: 3, action: Action.Exponentiate };
    const expected = 1000000;
    expect(simpleCalculator(input)).toBe(expected);
  });

  test('should return null for invalid action', () => {
    const input = { a: 'Yepp', b: true, action: 'unknown' };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: 'seven', b: 7, action: Action.Divide };
    expect(simpleCalculator(input)).toBeNull();
  });
});
