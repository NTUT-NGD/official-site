module.exports = {
  transpileDependencies: ["vuetify"],

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: ["/"],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  },

  publicPath: process.env.NODE_ENV === "production" ? "/official-site/" : "/"
};
