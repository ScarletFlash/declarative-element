import { cp, rm } from 'fs/promises';
import { Path } from './declarations/path.const';
import { generateBundle } from './utilities/generate-bundle.utility';
import { generatePackageJson } from './utilities/generate-package-json.utility';
import { generateReadMe } from './utilities/generate-read-me.utility';
import { generateTypings } from './utilities/generate-typings.utility';

Promise.resolve()
  .then(() =>
    rm(Path.Dist.directory, {
      force: true,
      recursive: true,
    })
  )
  .then(() => generateBundle())
  .then(() => cp(Path.Source.license, Path.Dist.license))
  .then(() => generateReadMe())
  .then(() => generateTypings())
  .then(() => generatePackageJson());
