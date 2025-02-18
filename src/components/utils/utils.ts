export const isToday = (dateString: string) => {
  const givenUTCDate = new Date(dateString);
  const nowDate = new Date();

  return (
    givenUTCDate.getUTCFullYear() === nowDate.getUTCFullYear() &&
    givenUTCDate.getUTCMonth() === nowDate.getUTCMonth() &&
    givenUTCDate.getUTCDate() === nowDate.getUTCDate()
  );
};
