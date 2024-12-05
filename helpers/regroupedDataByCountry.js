const regroupedDataByCountry = (array) => {
  return array.reduce((acc, obj) => {
    const country = obj.visitRegion;
    if (!acc[country]) {
      acc[country] = 0;
    }

    acc[country] += 1;
    return acc;
  }, {});
};

export default regroupedDataByCountry;
