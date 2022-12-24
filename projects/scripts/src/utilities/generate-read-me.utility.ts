import { readFile, writeFile } from 'fs/promises';
import { Path } from '../declarations/path.const';

export async function generateReadMe(): Promise<void> {
  const bundleFileContent: string = await readFile(Path.Dist.main, { encoding: 'utf-8' });
  const bundleFileSizeKB: number = Array.from(Buffer.from(bundleFileContent, 'utf-8')).length / 1024;

  const originalContent: string = await readFile(Path.Source.readMe, { encoding: 'utf-8' });

  const resultContent: string = originalContent.replace(
    'Lightweight, simple and reliable boilerplate wrapper',
    `Lightweight (${bundleFileSizeKB.toFixed(1)}KB runtime), simple and reliable boilerplate wrapper`
  );
  return writeFile(Path.Dist.readMe, resultContent, {
    encoding: 'utf-8',
  });
}
