import { writeFile } from 'fs/promises';
import { EntryPointConfig, generateDtsBundle } from 'dts-bundle-generator';
import { Path } from '../declarations/path.const';

export async function generateTypings(): Promise<void> {
  const config: EntryPointConfig = {
    filePath: Path.Source.Library.libraryEntryPoint,
    output: {
      exportReferencedTypes: false,
      noBanner: true,
      inlineDeclareExternals: true,
      inlineDeclareGlobals: true,
    },
  };
  const content: string[] = generateDtsBundle([config], {
    preferredConfigPath: Path.Source.Library.tsConfig,
  });

  return writeFile(Path.Dist.Library.typings, content.join('\n'), {
    encoding: 'utf-8',
  });
}
