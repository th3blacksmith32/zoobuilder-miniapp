let db = {};

export default function handler(req, res) {
  const { user } = req.body || {};
  if (!user) return res.status(400).json({ error:"Missing initData" });

  res.json({ ok:true, data: db[user] || null });
}
