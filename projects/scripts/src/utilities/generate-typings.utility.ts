import { writeFile } from 'fs/promises';
import { EntryPointConfig, generateDtsBundle } from 'dts-bundle-generator';
import { Path } from '../declarations/path.const';

export async function generateTypings(): Promise<void> {
  const config: EntryPointConfig = {
    filePath: Path.Source.libraryEntryPoint,

    output: {
      exportReferencedTypes: false,
      noBanner: true,
    },
  };
  const content: string[] = generateDtsBundle([config], {
    preferredConfigPath: Path.Source.tsConfig,
  });

  return writeFile(Path.Dist.typings, content.join('\n'), {
    encoding: 'utf-8',
  });
}
