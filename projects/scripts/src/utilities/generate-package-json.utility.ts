import { readFile, writeFile } from 'fs/promises';
import type { PackageJson as PackageJsonContent } from '@npm/types';
import { Path } from '../declarations/path.const';

export async function generatePackageJson(): Promise<void> {
  const originalPackageJsonContent: string = await readFile(Path.Source.Library.packageJsonFile, {
    encoding: 'utf-8',
  });

  const originalContent: PackageJsonContent = JSON.parse(originalPackageJsonContent);

  const extendedContent: PackageJsonContent = {
    ...originalContent,
    browser: './index.js',
    main: './index.js',
    types: './index.d.ts',
  };

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
    'browser',
    'main',
    'types',
  ]);
  const filteredEntires: [string, unknown][] = Object.entries(extendedContent)
    .filter(([key, _value]: [string, unknown]) => keysToByPass.has(key))
    .sort(([keyA]: [string, unknown], [keyB]: [string, unknown]) => (keyA > keyB ? 1 : -1));

  const resultEntries: Record<string, unknown> = Object.fromEntries(filteredEntires);
  return writeFile(Path.Dist.Library.packageJsonFile, JSON.stringify(resultEntries), {
    encoding: 'utf-8',
  });
}
