const jwt = require("jsonwebtoken");
const cuid = require("cuid");
module.exports = async function (fastify) {
  fastify.get("/", async (request, reply) => {
    const uid = cuid();
    const jwtToken = jwt.sign({}, fastify.config.JWT_SIGNKEY, {
      expiresIn: 15778800,
      algorithm: "HS256",
      audience: "test",
      issuer: "test",
      jwtid: uid,
      subject: `User:${uid}`,
      notBefore: -1000,
    });
    reply.code(200).redirect(302, `/api/v1/login/success?token=${jwtToken}`);
  });
  fastify.get("/success", async (request, reply) => {
    return reply.sendFile("bye.html");
  });
};
