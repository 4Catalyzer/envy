module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@4c/4catalyzer',
      {
        target: 'node',
      },
    ],
  ],
};
