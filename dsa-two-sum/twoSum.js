function twoSum(nums, target) {
  if (!Array.isArray(nums)) {
    throw new Error("First argument must be an array.");
  }
  if (typeof target !== "number") {
    throw new Error("Second argument must be a number.");
  }

  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }

  throw new Error("No two sum solution found.");
}

// Example usage:
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // Output: [0, 1]
