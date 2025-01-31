export const isToday = (dateString: string) => {
  const givenDate = new Date(dateString); // ✅ ISO 형식 날짜 → Date 객체 변환
  const today = new Date(); // ✅ 현재 날짜 가져오기

  console.log(givenDate.getUTCFullYear(), today.getUTCFullYear());

  // ✅ 년, 월, 일을 비교하여 동일한지 확인
  return (
    givenDate.getUTCFullYear() === today.getUTCFullYear() &&
    givenDate.getUTCMonth() === today.getUTCMonth() &&
    givenDate.getUTCDate() === today.getUTCDate()
  );
};