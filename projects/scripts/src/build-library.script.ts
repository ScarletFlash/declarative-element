import { cp, rm } from 'fs/promises';
import { Path } from './declarations/path.const';
import { generateBundle } from './utilities/generate-bundle.utility';
import { generatePackageJson } from './utilities/generate-package-json.utility';
import { generateReadMe } from './utilities/generate-read-me.utility';
import { generateTypings } from './utilities/generate-typings.utility';

export async function buildLibrary(): Promise<void> {
  await rm(Path.Dist.Library.directory, {
    force: true,
    recursive: true,
  });
  await generateBundle();
  await cp(Path.Source.Library.license, Path.Dist.Library.license);
  await generateReadMe();
  await generateTypings();
  await generatePackageJson();
}

Promise.resolve().then(() => buildLibrary());
