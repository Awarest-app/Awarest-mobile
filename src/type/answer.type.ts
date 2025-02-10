export type SubquestionTypes = {
  id: number;
  text: string;
  answer: string;
  date: string;
};

export type AnswerTypes = {
  question: string;
  subquestions: SubquestionTypes[];
};
