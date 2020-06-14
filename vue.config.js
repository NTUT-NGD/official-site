module.exports = {
  transpileDependencies: ["vuetify"],

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        "/",
        "/about",
        "/games",
        "/games/pingpong",
        "/games/lomo",
        "/teams",
        "/calendar",
        "/contact",
        "/join"
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  },

  publicPath: process.env.NODE_ENV === "production" ? "/official-site/" : "/"
};
