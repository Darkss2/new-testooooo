import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "testsecret";

let products = [
  { id: 1, name: "Test Product", description: "Just testing", price: 100, stock: 10, image: "https://via.placeholder.com/150" }
];

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, SECRET);
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }

  products = req.body.products || products;
  res.status(200).json({ message: "Saved", products });
}
