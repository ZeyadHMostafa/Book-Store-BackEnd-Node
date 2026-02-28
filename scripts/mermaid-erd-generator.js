const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose');

// 1. Load all models
const modelsPath = path.join(__dirname, '../src/models');
fs.readdirSync(modelsPath).forEach((file) => {
  if (file.endsWith('.js') && file !== 'index.js') {
    require(path.join(modelsPath, file));
  }
});

let entities = '';
let relationships = '';

// Helper to find a Model Name by its Schema object
const getModelNameBySchema = (schema) => {
  const found = Object.values(mongoose.models).find((m) => m.schema === schema);
  return found ? found.modelName.toUpperCase() : null;
};

Object.values(mongoose.models).forEach((model) => {
  const name = model.modelName.toUpperCase();
  // Heuristic: If it has no _id, it's an embedded subdoc
  // const isEmbedded = !Object.keys(model.schema.paths).includes('_id');

  // Use a comment inside the brackets for Mermaid compatibility
  entities += `    ${name} {\n`;

  Object.keys(model.schema.paths).forEach((pathName) => {
    if (['__v', 'createdAt', 'updatedAt'].includes(pathName)) return;

    const path = model.schema.paths[pathName];
    const type = path.instance;
    const cleanPath = pathName.replace(/\./g, '_').replace(/^_id$/g, 'id');

    entities += `        ${type} ${cleanPath}\n`;

    // 1. Standard References (ObjectId with 'ref')
    const ref = path.options.ref || (path.caster && path.caster.options.ref);
    if (ref) {
      const isUnique = path.options.unique;
      const isArray = type === 'Array';
      const rel = isUnique && !isArray ? '||--||' : '}o--||';
      relationships += `    ${name} ${rel} ${ref.toUpperCase()} : "refs"\n`;
    }

    // 2. Embedded Relationships (Arrays of Schemas)
    // We look at path.schema (for single subdocs) or path.caster.schema (for arrays)
    const subSchema = path.schema || (path.caster && path.caster.schema);
    if (subSchema) {
      const subName = getModelNameBySchema(subSchema);
      if (subName) {
        relationships += `    ${name} ||--o{ ${subName} : "contains"\n`;
      }
    }
  });

  entities += '    }\n';
});

const finalMermaid = `erDiagram\n${relationships}${entities}`;
fs.writeFileSync('docs/schema.mmd', finalMermaid);
console.log('ERD generated successfuly');
