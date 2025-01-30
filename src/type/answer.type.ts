export type SubquestionTypes = {
  id: number; // 서브 질문 ID
  text: string; // 서브 질문 텍스트
  answer: string; // 서브 질문에 대한 답변
  date: string; // 답변 날짜 (ISO 형식이 아닌 경우에도 문자열)
};

export type AnswerTypes = {
  question: string; // 질문 텍스트
  subquestions: SubquestionTypes[]; // 서브 질문 배열
};
