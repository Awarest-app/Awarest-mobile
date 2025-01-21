import {
  ageGroups,
  goalOptions,
  heardFromOptions,
  workWordsOptions,
} from './survey';

export const questions = [
  {
    title: 'What is your age group?',
    options: ageGroups,
  },
  {
    title: 'What is your goal?',
    options: goalOptions,
  },
  {
    title: 'What words can describe your work?',
    options: workWordsOptions,
  },
  {
    title: 'How did you hear about us?',
    options: heardFromOptions,
  },
];
