module.exports = {
  transpileDependencies: ["vuetify"],

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        "/",
        "/about",
        "/games",
        "/about",
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

  devServer: {
    proxy: "http://localhost:8080"
  },

  publicPath: process.env.NODE_ENV === "production" ? "/official-site/" : "/"
};
