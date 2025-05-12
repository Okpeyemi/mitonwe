// next.config.js
const path = require("path");

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "three/examples/jsm": path.resolve(
        __dirname,
        "node_modules/three/examples/jsm"
      ),
    };
    return config;
  },
  // Permet d’utiliser les web components sans erreur SSR
  experimental: {
    externalDir: true,
  },
};
