let db = {}; // in-memory demo DB

export default function handler(req, res) {
  const { coins, animals, user } = req.body || {};
  if (!user) return res.status(400).json({ error:"Missing initData" });

  db[user] = { coins, animals };
  res.json({ ok:true, saved: db[user] });
}
