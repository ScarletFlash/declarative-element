import { join } from 'path';

export namespace Path {
  const workspaceRoot: string = join(__dirname, '../../../../');
  const readMeFileName: string = 'README.md';
  const licenseFileName: string = 'LICENSE.md';
  const packageJsonFileName: string = 'package.json';

  export namespace Source {
    const libraryDirectory: string = join(workspaceRoot, 'projects', 'library');

    export const libraryEntryPoint: string = join(libraryDirectory, 'src', 'index.ts');
    export const tsConfig: string = join(libraryDirectory, 'tsconfig.lib.json');

    export const readMe: string = join(workspaceRoot, readMeFileName);
    export const license: string = join(workspaceRoot, licenseFileName);
    export const packageJsonFile: string = join(workspaceRoot, packageJsonFileName);
  }

  export namespace Dist {
    export const directory: string = join(workspaceRoot, 'dist');
    export const typings: string = join(directory, 'index.d.ts');
    export const main: string = join(directory, 'index.js');

    export const readMe: string = join(directory, readMeFileName);
    export const license: string = join(directory, licenseFileName);
    export const packageJsonFile: string = join(directory, packageJsonFileName);
  }
}
