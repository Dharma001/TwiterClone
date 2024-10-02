const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '../prisma/models');
const schemaPath = path.join(__dirname, '../prisma/schema.prisma');

const dataSource = `
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
`;

const mergeSchemas = async () => {
  let models = '';

  const files = fs.readdirSync(modelsDir);

  files.forEach((file) => {
    const filePath = path.join(modelsDir, file);
    const modelContent = fs.readFileSync(filePath, 'utf8');
    models += modelContent + '\n';
  });

  const finalSchema = `${dataSource}\n${models}`;
  fs.writeFileSync(schemaPath, finalSchema);

  console.log('Schema merged successfully!');
};

mergeSchemas();
