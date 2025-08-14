import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Enterprise School Api",
            description: "List of all enterprise school api documentation",
            version: "1.0.0",
            contact: {
                name: "Shakil Ahmad",
                email: "shakilahmad23@gmail.com"
            }
        },
        tags: [
            {
                name: "schools",
                description: "Schools APIs"
            },
            {
                name: "teachers",
                description: "Teachers APIs"
            }
        ],
        servers: [
            {
                url: process.env.SERVER,
                description: "Main School api"
            }
        ],
        components: {
            securitySchemes: {
                Bearer: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT Key authentication for API'
                },
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                    description: "Api key authentication for API"
                }
            }
        }
    },
    apis: ["./src/routes/*.ts"]
}

const swaggerSpec = swaggerJSDoc(options)
require("swagger-model-validator")(swaggerSpec)

export default swaggerSpec