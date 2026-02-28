const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});
const fs = require('node:fs');
const path = require('node:path');
const j2s = require('joi-to-swagger');

const validatorDir = path.join(__dirname, '../src/validators');
const definitions = {};

// 1. Read all files in the validator directory
const files = fs.readdirSync(validatorDir);

files.forEach((file) => {
  if (file.endsWith('.js')) {
    const schemaPath = path.join(validatorDir, file);
    const imported = require(schemaPath);

    // 2. Identify if it's a single Joi schema or an object of schemas
    const isSingleSchema =
      imported.isJoi || typeof imported.validate === 'function';

    if (isSingleSchema) {
      // Use the filename (minus .js) as the definition name
      const name = path.parse(file).name;
      const {swagger} = j2s(imported);
      definitions[name] = swagger;
    } else if (typeof imported === 'object') {
      // Loop through multiple exports (bookSchema, bookUpdateSchema, etc.)
      Object.entries(imported).forEach(([key, schema]) => {
        if (schema.isJoi || typeof schema.validate === 'function') {
          const {swagger} = j2s(schema);
          definitions[key] = swagger;
        }
      });
    }
  }
});

const doc = {
  'info': {
    title: 'Book-Store Backend API',
    description: 'Documentation for our Express/MongoDB backend'
  },
  'host': '127.0.0.1:8888/api',
  'schemes': ['http'],
  // Add this section:
  'components': {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  '@definitions': definitions
};

const outputFile = '../docs/swagger-output.json';
const endpointsFiles = ['../src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
