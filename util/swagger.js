var setupSwagger = function(app) {
    var swaggerUi = require('swagger-ui-express');
    var YAML = require('yamljs');
    var swaggerDocument = YAML.load('./swagger.yaml');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = setupSwagger;
