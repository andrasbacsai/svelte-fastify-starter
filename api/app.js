module.exports = async function (fastify, opts) {
  // Private routes
  fastify.register(async function (server) {
    server.register(require("./plugins/authentication"));
    server.register(require("./v1/private/hey"), { prefix: "/hey" });
  });
  // Public routes
  fastify.register(require("./v1/verify"), { prefix: "/verify" });
  fastify.register(require("./v1/login"), {
    prefix: "/login",
  });
};
