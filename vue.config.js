module.exports = {
  transpileDependencies: ["vuetify"],

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        "/",
        "/about",
        "/games",
        "/games/game",
        "/games/project",
        "/teams",
        "/teams/project",
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
