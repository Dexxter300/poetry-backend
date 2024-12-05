const uniqueVisitsCounter = (array) => {
  return array.reduce((acc, obj) => {
    const visitIp = obj.visitorIp;

    if (!acc.counter) {
      acc.counter = 0;
    }

    if (!acc[visitIp]) {
      acc[visitIp] = 1;
      acc.counter += 1;
    }

    acc[visitIp] += 1;

    return acc;
  }, {});
};

export default uniqueVisitsCounter;
