export type QuestionProps = {
  questionId: number;
  type: string;
  content: string;
};

// 서버에서 받은 응답 데이터 구조
export type ServerResponse = {
  question: string; // 예: "What is your primary goal?"
  // subquestions: string[]; // 예: ["Are you aiming...", "What is your main motivation?"]
  subquestions: {id: number; text: string}[];
};

// React state에 저장할 데이터 구조
export type SubQuestionProps = {
  question: string; // 각 subquestion의 질문 텍스트
  responses: string[]; // 사용자가 입력할 답변 (초기엔 빈 문자열)
};
