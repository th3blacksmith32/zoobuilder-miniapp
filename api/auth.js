// Validate Telegram initData
import crypto from 'crypto';

export default function handler(req, res) {
  const { user } = req.body || {};
  if (!user) return res.status(400).json({ error:"Missing initData" });

  // NOTE: Replace <BOT_TOKEN>
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const secret = crypto.createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();

  try {
    const [dataPart, hash] = user.split("&hash=");
    const expected = crypto.createHmac("sha256", secret).update(dataPart).digest("hex");

    if (expected !== hash) return res.status(403).json({ error:"Invalid initData" });

    res.json({ ok:true, msg:"Auth valid" });
  } catch(e) {
    res.status(500).json({ error:"Validation failed", details:e.toString() });
  }
}
