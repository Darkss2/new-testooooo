import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const SECRET = process.env.JWT_SECRET || "testsecret";

  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);

    const { email, password } = body;

    const allowedEmails = (process.env.ALLOWED_EMAILS || "").split(",");
    const adminPassword = process.env.ADMIN_PASSWORD || "";

    if (!allowedEmails.includes(email) || password !== adminPassword) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
