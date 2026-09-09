import { TheoryQuizQuestion } from '../types';
import { level1Quizzes } from './quizzes/level1Quizzes';
import { level2Quizzes } from './quizzes/level2Quizzes';
import { level3Quizzes } from './quizzes/level3Quizzes';
import { level4Quizzes } from './quizzes/level4Quizzes';

export const theoryQuizzesByModuleId: Record<string, TheoryQuizQuestion[]> = {
  ...level1Quizzes,
  ...level2Quizzes,
  ...level3Quizzes,
  ...level4Quizzes
};
