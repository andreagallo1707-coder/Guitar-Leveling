import { TechniqueExercise } from '../types';
import { warmUpExercises } from './techniqueExercises/warmUpExercises';
import { alternatePickingExercises } from './techniqueExercises/alternatePickingExercises';
import { scale3NPSExercises } from './techniqueExercises/scale3NPSExercises';
import { legatoExercises } from './techniqueExercises/legatoExercises';
import { sweepPickingExercises } from './techniqueExercises/sweepPickingExercises';
import { stringSkippingExercises } from './techniqueExercises/stringSkippingExercises';
import { tappingExercises } from './techniqueExercises/tappingExercises';
import { bendingVibratoExercises } from './techniqueExercises/bendingVibratoExercises';
import { modernFusionExercises } from './techniqueExercises/modernFusionExercises';
import { jtcMantovanelliExercises } from './techniqueExercises/jtcMantovanelli';

export const exercisesData: TechniqueExercise[] = [
  ...warmUpExercises,
  ...alternatePickingExercises,
  ...scale3NPSExercises,
  ...legatoExercises,
  ...sweepPickingExercises,
  ...stringSkippingExercises,
  ...tappingExercises,
  ...bendingVibratoExercises,
  ...modernFusionExercises,
  ...jtcMantovanelliExercises
];
