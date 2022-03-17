const {
  dataTypeError,
  addTwoNumbers,
  subtractTwoNumbers,
  greetRoyalFamily,
  notARoyalMemberError,
  divisibleBy5,
  sortNumbersAscOrDesc,
} = require('./functions');

describe('addTwoNumbers', () => {
  it('adds two numbers together', () => {
    expect(addTwoNumbers(1, 2)).toBe(3);
    expect(addTwoNumbers(1.5, 2)).toBe(3.5);
    expect(addTwoNumbers(1005, 29)).toBe(1034);
  });

  it('returns an error message if incorrect data types are passed', () => {
    expect(addTwoNumbers(1, '1')).toBe(dataTypeError);
    expect(addTwoNumbers(11, {})).toBe(dataTypeError);
    expect(addTwoNumbers([], {})).toBe(dataTypeError);
  });
});

describe('subtractTwoNumbers', () => {
  it('subtracts second number from first', () => {
    expect(subtractTwoNumbers(3, 1)).toBe(2);
    expect(subtractTwoNumbers(27, 7)).toBe(20);
    expect(subtractTwoNumbers(5.5, 3.5)).toBe(2);
  });

  it('returns an error message if incorrect data types are passed', () => {
    expect(subtractTwoNumbers(1, '1')).toBe(dataTypeError);
    expect(subtractTwoNumbers(11, {})).toBe(dataTypeError);
    expect(subtractTwoNumbers([], {})).toBe(dataTypeError);
  });
});

xdescribe('greetRoyalFamily', () => {
  it('greets royal family members', () => {
    expect(greetRoyalFamily('Elizabeth')).toBe('Hello Queen Elizabeth');
    expect(greetRoyalFamily('Philip')).toBe('Hello Prince Philip');
    expect(greetRoyalFamily('Charles')).toBe(
      'Hello Prince Charles, Prince of Wales'
    );
    expect(greetRoyalFamily('Anne')).toBe('Hello Princess Anne, hows it goin?');
    expect(greetRoyalFamily('Edward')).toBe('Hello Prince Edward');
    expect(greetRoyalFamily('Dianna')).toBe('Hello Princess Dianna');
    expect(greetRoyalFamily('Camilla')).toBe('Hello Camilla');
    expect(greetRoyalFamily('Catherine')).toBe('Hello Catherine');
    expect(greetRoyalFamily('Harry')).toBe('Hello Harry, hows america?');
    expect(greetRoyalFamily('William')).toBe('Hello William, hows harry?');
    expect(greetRoyalFamily('Meghan')).toBe('Hello Meghan, hows hollywood?');
  });

  it('returns an error message if the name is not a royal member', () => {
    expect(greetRoyalFamily('Fred')).toBe(notARoyalMemberError);
    expect(greetRoyalFamily('Larry')).toBe(notARoyalMemberError);
    expect(greetRoyalFamily('Grace')).toBe(notARoyalMemberError);
    expect(greetRoyalFamily('Bob')).toBe(notARoyalMemberError);
  });
});

xdescribe('divisibleBy5', () => {
  it('should return true if the number is divisible by 5', () => {
    expect(divisibleBy5(15)).toBe(true);
    expect(divisibleBy5(45)).toBe(true);
    expect(divisibleBy5(5)).toBe(true);
  });

  it('should return false if the number is not divisible by 5', () => {
    expect(divisibleBy5(7)).toBe(false);
    expect(divisibleBy5(13)).toBe(false);
    expect(divisibleBy5(29)).toBe(false);
  });
});

xdescribe('sortNumbersAscOrDesc', () => {
  it('should take an array of numbers and a sort order - if asc it should return a sorted asc array', () => {
    expect(sortNumbersAscOrDesc([3, 11, 5, 29], 'asc')).toStrictEqual([
      3, 5, 11, 29,
    ]);
  });
  it('should take an array of numbers and a sort order - if desc it should return a sorted desc array', () => {
    expect(sortNumbersAscOrDesc([3, 11, 5, 29], 'desc')).toStrictEqual([
      29, 11, 5, 3,
    ]);
  });
});
