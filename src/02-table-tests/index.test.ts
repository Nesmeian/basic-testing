// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 155, b: 7, action: Action.Add, expected: 162 },
  { a: 100, b: 44, action: Action.Subtract, expected: 56 },
  { a: 55, b: 22, action: Action.Multiply, expected: 1210 },
  { a: 100, b: 2, action: Action.Divide, expected: 50 },
  { a: 100, b: 3, action: Action.Exponentiate, expected: 1000000 },
  { a: 'Yepp', b: true, action: 'unknown', expected: null },
  { a: 'seven', b: 7, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
