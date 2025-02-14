export const isToday = (dateString: string) => {
  const givenUTCDate = new Date(dateString);
  const nowUTCDate = new Date();

  return (
    givenUTCDate.getUTCFullYear() === nowUTCDate.getUTCFullYear() &&
    givenUTCDate.getUTCMonth() === nowUTCDate.getUTCMonth() &&
    givenUTCDate.getUTCDate() === nowUTCDate.getUTCDate()
  );
};
