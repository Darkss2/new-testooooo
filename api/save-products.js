let products = [];

export default function handler(req,res){
  if(req.method !== "POST") return res.status(405).end();
  products = req.body.products || [];
  res.status(200).json({ message:"Saved", products });
}
