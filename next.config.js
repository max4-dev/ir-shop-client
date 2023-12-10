module.exports = {
  assetPrefix: './',
  images: {
    domains: [],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
