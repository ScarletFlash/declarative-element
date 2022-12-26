import { buildDemo } from './build-demo.script';
import { buildLibrary } from './build-library.script';

export async function buildAll(): Promise<void> {
  await buildLibrary();
  await buildDemo();
}

Promise.resolve().then(() => buildAll());
