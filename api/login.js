import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "testsecret";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Use POST" });
    }

    // Ensure req.body is parsed
    let body = req.body;

    // If body is undefined (Vercel sometimes passes as undefined)
    if (!body) {
      let raw = "";
      await new Promise((resolve, reject) => {
        req.on("data", chunk => raw += chunk);
        req.on("end", () => resolve());
        req.on("error", err => reject(err));
      });
      body = raw ? JSON.parse(raw) : {};
    }

    const { email, password } = body;

    const allowedEmails = (process.env.ALLOWED_EMAILS || "").split(",");
    const adminPassword = process.env.ADMIN_PASSWORD || "";

    if (!allowedEmails.includes(email) || password !== adminPassword) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
