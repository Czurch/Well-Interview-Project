import express from "express";
import Database from "better-sqlite3";
import cache from "memory-cache";

const app = express();
app.use(express.text());
const port = 9000;

const db = new Database("freqMap.db");

db.prepare(
  "CREATE TABLE IF NOT EXISTS freqMap (key TEXT PRIMARY KEY, value INTEGER)"
).run();

app.post("/input", (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send("Key can not be null");
  }

  const keyString = req.body.toString();
  const inputStatement = db.prepare(
    "INSERT OR REPLACE INTO freqMap (key, value) VALUES (?, COALESCE((SELECT value FROM freqMap WHERE key = ?), 0) + 1)"
  );

  inputStatement.run(`${keyString}`, `${keyString}`);
  console.log(`${keyString}`);

  //Invalidate cache for this key
  cache.del(keyString);

  return res.send("SUCCESS");
});

app.get("/query", (req, res) => {
  if (!req.query.key) return res.status(400).send("Key can not be null");

  const cachedValue = cache.get(req.query.key);
  if (cachedValue !== null) {
    //If in cache don't hit the DB
    return res.send(cachedValue.toString());
  }

  const queryStatment = db.prepare("SELECT value FROM freqMap WHERE key = ?");
  const keyString = req.query.key.toString();
  const row = queryStatment.get(`${keyString}`);

  if (row) {
    return res.send(row.value.toString());
  } else {
    return res.send("0");
  }
});

app.listen(port, () => {
  console.log(`Well interview backend listening on port:${port}`);
});
