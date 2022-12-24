import { readFile, writeFile } from 'fs/promises';
import { PackageJson as PackageJsonContent } from '@npm/types';
import { Path } from '../declarations/path.const';

export async function generatePackageJson(): Promise<void> {
  const originalPackageJsonContent: string = await readFile(Path.Source.packageJsonFile, {
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

  return writeFile(Path.Dist.packageJsonFile, JSON.stringify(Object.fromEntries(filteredEntires)), {
    encoding: 'utf-8',
  });
}
