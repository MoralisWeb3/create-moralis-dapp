#!/usr/bin/env node
import { MoralisDappGenerator } from './MoralisDappGenerator';

(async () => {
  const moralisDappGenerator = new MoralisDappGenerator();
  return moralisDappGenerator.generate();
})();
