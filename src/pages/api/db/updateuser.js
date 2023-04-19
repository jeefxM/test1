import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method !== "POST") {
      res.status(405).json({ message: 'Method not allowed ' });
      return;
    }
  
    const data = JSON.parse(req.body);

  
    try {
      const savedCustomer = await prisma.user.update({
        where: {
          id: data.id
        },
        data: data
      });

      
  
      res.json(savedCustomer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Unexpected error occurred' });
    }
}
  