import { argv } from 'process';
import { build } from 'esbuild';
import { Path } from '../declarations/path.const';

export async function generateBundle(): Promise<unknown> {
  const commandLineArguments: Set<string> = new Set<string>(argv);

  return build({
    bundle: true,
    entryPoints: [Path.Source.Library.libraryEntryPoint],
    resolveExtensions: ['.ts'],
    platform: 'browser',
    format: 'esm',
    charset: 'utf8',
    minify: commandLineArguments.has('--production'),
    target: 'esnext',
    treeShaking: true,
    tsconfig: Path.Source.Library.tsConfig,
    sourcemap: false,
    legalComments: 'none',
    splitting: true,
    outdir: Path.Dist.Library.directory,
    color: true,
    keepNames: false,
  });
}
