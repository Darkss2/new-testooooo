let products = [
  { id: 1, name: "Test Product", description: "Just testing", price: 100, stock: 10, image: "https://via.placeholder.com/150" }
];

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  products = req.body.products || products;
  res.status(200).json({ message: "Saved", products });
}
