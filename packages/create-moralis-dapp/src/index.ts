#!/usr/bin/env node
import { CMDGenerator } from './CMDGenerator';

async function main() {
  return new CMDGenerator([]).run();
}
main();
