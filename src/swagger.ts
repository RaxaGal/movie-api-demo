import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
const port = 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie API',
      version: '1.0.0',
    },
  },
  apis: ['./docs/openapi.yaml'], // Update with your OpenAPI specification file path
};

const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
