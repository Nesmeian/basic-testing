// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const money = getBankAccount(77);
    expect(money.getBalance()).toBe(77);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const money = getBankAccount(70);
    expect(() => money.withdraw(140)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const money1 = getBankAccount(100);
    const money2 = getBankAccount(0);
    expect(() => money1.transfer(120, money2)).toThrow(InsufficientFundsError);
  });
  test('should throw error when transferring to the same account', () => {
    const money = getBankAccount(100);
    expect(() => money.transfer(50, money)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const money = getBankAccount(220);
    money.deposit(100);
    expect(money.getBalance()).toBe(320);
  });

  test('should withdraw money', () => {
    const money = getBankAccount(500);
    money.withdraw(200);
    expect(money.getBalance()).toBe(300);
  });

  test('should transfer money', () => {
    const money = getBankAccount(500);
    const money2 = getBankAccount(400);
    money.transfer(100, money2);
    expect(money.getBalance()).toBe(400);
    expect(money2.getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const money = getBankAccount(100);
    const balance = await money.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
      expect(balance).toBeGreaterThanOrEqual(0);
      expect(balance).toBeLessThanOrEqual(100);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const money = getBankAccount(100);
    jest.spyOn(money, 'fetchBalance').mockResolvedValue(200);
    await money.synchronizeBalance();
    expect(money.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const money = getBankAccount(300);
    jest.spyOn(money, 'fetchBalance').mockResolvedValue(null);
    await expect(money.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
