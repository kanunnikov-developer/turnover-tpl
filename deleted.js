const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deleteAllProducts() {
  const result = await prisma.product.deleteMany();
  console.log(`${result.count} продуктов было удалено.`);
}

deleteAllProducts()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });