import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'agent-neo',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'bundle'
    }
  ]
};
