const { destructureArgs } = require("../helpers");

/**
 * Adds up an array of numbers.
 *
 * @param {array} numbers - The array of numbers to be added.
 * @returns {number} The sum of the numbers.
 */
function add(numbers) {
  return numbers.reduce((a, b) => +a + +b, 0);
}

/**
 * Subtracts the numbers in the array.
 * @param {array} numbers - The array of numbers to subtract.
 * @returns {number} - The result of subtracting the numbers.
 */
function subtract(numbers) {
  return numbers.reduce((a, b) => +a - +b);
}

/**
 * Multiplies an array of numbers.
 *
 * @param {array} numbers - The array of numbers to multiply.
 * @returns {number} The product of the numbers.
 */
function multiply(numbers) {
  return numbers.reduce((a, b) => +a * +b);
}

/**
 * Divides an array of numbers.
 *
 * @param {array} numbers - The array of numbers to be divided.
 * @returns {number} - The result of dividing the numbers.
 */
function divide(numbers) {
  return numbers.reduce((a, b) => +a / +b);
}

/**
 * Calculates the power of numbers.
 * @param {array} numbers - The numbers to calculate the power of.
 * @returns {number} The result of the power calculation.
 */
function pow(numbers) {
  return numbers.reduce((a, b) => Math.pow(+a, +b));
}

/**
 * Calculates the square root of each number in the given array.
 * @param {array} numbers - The array of numbers to calculate the square root for.
 * @returns {array} - The array of square roots.
 */
function sqrt(numbers) {
  return numbers.reduce((a, b) => Math.sqrt(+a));
}

/**
 * Calculates the logarithm of an array of numbers.
 * @param {array} numbers - The array of numbers to calculate the logarithm for.
 * @returns {number} The result of the logarithm calculation.
 */
function log(numbers) {
  return numbers.reduce((a, b) => Math.log(+a));
}

function handleCapabilityMethod(methodName, args) {
  const [arg1, arg2] = destructureArgs(args);

  switch (methodName) {
    case "add":
      return add([arg1, arg2]);
    case "subtract":
      return subtract([arg1, arg2]);
    case "multiply":
      return multiply([arg1, arg2]);
    case "divide":
      return divide([arg1, arg2]);
    case "pow":
      return pow([arg1, arg2]);
    case "sqrt":
      return sqrt([arg1, arg2]);
    case "log":
      return log([arg1, arg2]);
    default:
      throw new Error("Invalid operation");
  }
}

module.exports = {
  handleCapabilityMethod,
};
