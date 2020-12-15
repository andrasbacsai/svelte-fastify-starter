const fp = require("fastify-plugin");
module.exports = fp(async function (fastify, options, next) {
  fastify.register(require("fastify-jwt"), {
    secret: fastify.config.JWT_SIGNKEY,
  });
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      const { jti } = await request.jwtVerify();
      // Check if user exists in your users DB
      const found = true;
      if (found) {
        return true;
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      throw { statusCode: 401 }
    }
  });
  next();
});
