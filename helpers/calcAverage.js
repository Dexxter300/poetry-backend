const calculateAverageVisits = (visitsForMonth, month) => {
  const currentYear = new Date().getFullYear();
  const date = new Date(currentYear, month, 0).getDate();
  const result = (visitsForMonth / date).toFixed(2);
  return result;
};

export default calculateAverageVisits;
