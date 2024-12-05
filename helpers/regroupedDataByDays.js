const regroupedDataByDays = (array) => {
  return array.reduce((acc, obj) => {
    const date = new Date(obj.date);
    date.setHours(0, 0, 0, 0);
    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date] += 1;
    return acc;
  }, {});
};

export default regroupedDataByDays;
