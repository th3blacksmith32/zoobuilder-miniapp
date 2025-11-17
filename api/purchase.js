export default function handler(req, res) {
  const { item, user } = req.body || {};
  if (!user) return res.status(400).json({ error:"Missing initData" });

  // mock verification
  res.json({ ok:true, purchased:item, msg:"Pretend payment processed" });
}
