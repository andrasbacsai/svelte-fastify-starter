module.exports = async function (fastify) {
  fastify.get("/", async (request, reply) => {
    return { data: "super secret hey" };
  });
};
