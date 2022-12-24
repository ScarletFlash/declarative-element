import { cp, readFile, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { argv } from 'process';
import { PackageJson as PackageJsonContent } from '@npm/types';
import { EntryPointConfig, generateDtsBundle } from 'dts-bundle-generator';
import { build } from 'esbuild';

const commandLineArguments: Set<string> = new Set<string>(argv);

namespace Path {
  export const dist: string = join(__dirname, 'dist');
  export const entryPoint: string = join(__dirname, 'projects', 'library', 'src', 'index.ts');
  export const typings: string = join(dist, 'index.d.ts');
  export const main: string = join(dist, 'index.js');

  export namespace TSConfig {
    export const library: string = join(__dirname, 'projects', 'library', 'tsconfig.lib.json');
  }

  export namespace ReadMe {
    const fileName: string = 'README.md';
    export const source: string = join(__dirname, fileName);
    export const bundle: string = join(dist, fileName);
  }

  export namespace License {
    const fileName: string = 'LICENSE.md';
    export const source: string = join(__dirname, fileName);
    export const bundle: string = join(dist, fileName);
  }

  export namespace PackageJson {
    const fileName: string = 'package.json';
    export const source: string = join(__dirname, fileName);
    export const bundle: string = join(dist, fileName);
  }
}

Promise.resolve()
  .then(() =>
    rm(Path.dist, {
      force: true,
      recursive: true,
    })
  )
  .then(() =>
    build({
      bundle: true,
      entryPoints: [Path.entryPoint],
      resolveExtensions: ['.ts'],
      platform: 'browser',
      format: 'esm',
      charset: 'utf8',
      minify: commandLineArguments.has('--production'),
      target: 'esnext',
      treeShaking: true,
      tsconfig: Path.TSConfig.library,
      sourcemap: false,
      legalComments: 'none',
      splitting: true,
      outdir: Path.dist,
      color: true,
      keepNames: false,
    })
  )
  .then(() => cp(Path.License.source, Path.License.bundle))
  .then(() => generateReadMe())
  .then(() => generateTypings())
  .then(() => generatePackageJson());

async function generateReadMe(): Promise<void> {
  const bundleFileContent: string = await readFile(Path.main, { encoding: 'utf-8' });
  const bundleFileSizeKB: number = Array.from(Buffer.from(bundleFileContent, 'utf-8')).length / 1024;

  const originalContent: string = await readFile(Path.ReadMe.source, { encoding: 'utf-8' });

  const resultContent: string = originalContent.replace(
    'Lightweight, simple and reliable boilerplate wrapper',
    `Lightweight (${bundleFileSizeKB.toFixed(1)}KB runtime), simple and reliable boilerplate wrapper`
  );
  return writeFile(Path.ReadMe.bundle, resultContent, {
    encoding: 'utf-8',
  });
}

async function generateTypings(): Promise<void> {
  const config: EntryPointConfig = {
    filePath: Path.entryPoint,

    output: {
      exportReferencedTypes: false,
      noBanner: true,
    },
  };
  const content: string[] = generateDtsBundle([config], {
    preferredConfigPath: Path.TSConfig.library,
  });

  return writeFile(Path.typings, content.join('\n'), {
    encoding: 'utf-8',
  });
}

async function generatePackageJson(): Promise<void> {
  const originalPackageJsonContent: string = await readFile(Path.PackageJson.source, {
    encoding: 'utf-8',
  });

  const originalContent: PackageJsonContent = JSON.parse(originalPackageJsonContent);

  const keysToByPass: Set<keyof PackageJsonContent | string> = new Set<keyof PackageJsonContent | string>([
    'name',
    'version',
    'license',
    'description',
    'repository',
    'bugs',
    'homepage',
    'author',
    'dependencies',
    'keywords',
  ]);
  const filteredEntires: [string, unknown][] = Object.entries(originalContent).filter(
    ([key, _value]: [string, unknown]) => keysToByPass.has(key)
  );

  return writeFile(Path.PackageJson.bundle, JSON.stringify(Object.fromEntries(filteredEntires)), {
    encoding: 'utf-8',
  });
}
