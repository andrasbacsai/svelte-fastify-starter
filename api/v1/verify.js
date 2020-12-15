const jwt = require("jsonwebtoken");
module.exports = async function (fastify) {
  fastify.get("/", async (request, reply) => {
    const { authorization } = request.headers;
    const token = authorization.split(" ")[1];
    jwt.verify(token, fastify.config.JWT_SIGNKEY);
    // Check if user exists in your users DB
    const found = true;
    if (found) {
      reply.code(200).send({});
    } else {
      reply.code(401).send({});
    }
  });
};
