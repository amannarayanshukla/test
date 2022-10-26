const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});


describe("deterministicPartitionKey", () => {
  it("Returns the literal '123' when given 123 as input", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 123});
    expect(trivialKey).toBe("123");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '123' when given '123' as input", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: "123"});
    expect(trivialKey).toBe("123");
  });
});

// test cases when event present but no partitionKey
// when candidate key length greater than MAX_PARTITION_KEY_LENGTH
