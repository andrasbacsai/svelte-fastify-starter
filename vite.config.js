module.exports = {
  hmr: {
    port: process.env.CODESANDBOX_SSE ? "443" : "",
  },
  optimizeDeps: {
    exclude: [
      "@roxi/routify",
      "fastify-static",
      "fastify",
      "fastify-jwt",
      "dotenv",
      "jsonwebtoken",
      "fastify-env",
      "fastify-plugin",
    ],
  },
  proxy: {
    "/api": "http://127.0.0.1:3001/",
  },
};
