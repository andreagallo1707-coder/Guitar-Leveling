import { TheoryModule } from '../types';
import { level1Modules } from './theoryModules/level1';
import { level2Modules } from './theoryModules/level2';
import { level3Modules } from './theoryModules/level3';
import { level4Modules } from './theoryModules/level4';

export const theoryModules: TheoryModule[] = [
  ...level1Modules,
  ...level2Modules,
  ...level3Modules,
  ...level4Modules
];
