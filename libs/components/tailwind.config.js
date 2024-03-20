const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const globalConfig = require('../../tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...globalConfig,
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ]
};
