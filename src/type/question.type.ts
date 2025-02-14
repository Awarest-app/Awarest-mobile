export type Questiontypes = {
  questionId: number;
  type: string;
  content: string;
};

export type ServerResponse = {
  question: string;
  subquestions: {id: number; text: string}[];
};

export type AnswerSubquestionTypes = {
  question: string;
  responses: string[];
};
