module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        modules: 'commonjs',
        useBuiltIns: false,
        targets: 'last 1 Chrome major version',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: process.env.BABEL_ENV !== "production",
      },
    ],
  ],
};
