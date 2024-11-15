import type { BuilderOptions } from '@angular-devkit/build-angular';

export const builderOptions: Partial<BuilderOptions> = {
  allowedCommonJsDependencies: [
    'quill'
  ]
};
