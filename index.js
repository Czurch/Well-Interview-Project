import express from "express";

const app = express();
app.use(express.text());
const port = 9000;

const freqMap = new Map();

app.post("/input", (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send("Key can not be null");
  }
  if (freqMap.has(req.body)) {
    const value = freqMap.get(req.body);
    freqMap.set(req.body, value + 1);
  } else {
    freqMap.set(req.body, 1);
  }
  console.log(`${req.body}: ${freqMap.get(req.body)}`);
  return res.send("SUCCESS");
});

app.get("/query", (req, res) => {
  if (!req.query.key) return res.status(400).send("Key can not be null");
  if (freqMap.has(req.query.key))
    return res.send(`${freqMap.get(req.query.key)}`);
  else return res.send("0");
});

app.listen(port, () => {
  console.log(`Well interview backend listening on port:${port}`);
});
