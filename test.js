const fetch = require("isomorphic-fetch");

const inputRoute = "http://localhost:9000/input";
const queryRoute = "http://localhost:9000/query?key=";

const inputEndpoint = async (key) => {
  const req = await fetch(inputRoute, {
    method: "POST",
    body: key,
  });

  const data = await req.text();
  if (req.statusText == "OK") {
    return data;
  } else {
    return data;
  }
};

const queryEndpoint = async (key) => {
  const req = await fetch(`${queryRoute}${key ? key : ""}`, {
    method: "GET",
  });

  const data = await req.text();
  if (req.statusText == "OK") {
    //console.log(data);
    return data;
  } else {
    //console.error("Request failed:", req.status, req.statusText);
    return data;
  }
};

const multiTest = async (word, num) => {
  let times = num;
  while (times--) {
    await inputEndpoint(word);
  }
};

describe("/input endpoint", () => {
  it("should accept a string", async () => {
    await expect(inputEndpoint("testing")).resolves.toBe("SUCCESS");
  });
  it("should fail with no key", async () => {
    await expect(inputEndpoint()).resolves.toBe("Key can not be null");
  });
});

describe("/query endpoint", () => {
  it("should return a value for known keys", async () => {
    await expect(queryEndpoint("testing")).resolves.toBe("1");
  });
  it("should return zero for unknown keys", async () => {
    await expect(queryEndpoint("zero")).resolves.toBe("0");
  });
  it("should fail with no key", async () => {
    await expect(queryEndpoint()).resolves.toBe("Key can not be null");
  });
});

describe("full function", () => {
  it("should get accurate values from Map", async () => {
    let times = 5;
    while (times--) {
      inputEndpoint("fullfunction");
    }
    await expect(queryEndpoint("fullfunction")).resolves.toBe("5");
  });
  it("should handle concurrent requests", async () => {
    const promises = [];

    promises.push(multiTest("red", 110));
    promises.push(multiTest("blue", 144));
    promises.push(multiTest("green", 159));

    await Promise.all(promises);

    await expect(queryEndpoint("green")).resolves.toBe("159");
  });
});
