const fastify = require("fastify")();
const path = require("path");

const requiredDotenvSchema = {
  type: "object",
  required: ["VITE_HEY", "HEY_FASTIFY", "JWT_SIGNKEY"],
  properties: {
    VITE_HEY: {
      type: "string",
    },
    HEY_FASTIFY: {
      type: "string",
    },
    JWT_SIGNKEY: {
      type: "string",
    },
  },
};

fastify.register(require("fastify-env"), {
  schema: requiredDotenvSchema,
  dotenv: true,
});

if (process.env.NODE_ENV === "production") {
  fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "../dist/"),
  });

  fastify.setNotFoundHandler(function (request, reply) {
    reply.sendFile("index.html");
  });
} else {
  fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "/public/"),
  });
}

fastify.register(require("./app"), { prefix: "/api/v1" });

if (process.env.NODE_ENV === "production") {
  fastify.listen(3000, "0.0.0.0");
} else {
  fastify.listen(3001);
}
