export const differenceFinder = (fromTime, toTime) => {
  if (
    (fromTime?.includes('AM') && toTime?.includes('AM')) ||
    (fromTime?.includes('PM') && toTime?.includes('PM'))
  ) {
    if (fromTime?.includes('12') && toTime?.includes('12')) {
      return 0;
    }
    if (fromTime?.includes('12')) {
      const difference = parseInt(toTime?.substring(0, 2)) - 0;

      return difference * 100;
    }
    const difference =
      parseInt(toTime?.substring(0, 2)) - parseInt(fromTime?.substring(0, 2));
    return difference * 100;
  } else {
    const before_12 = 12 - parseInt(fromTime?.substring(0, 2));
    let after_12;
    if (toTime?.substring(0, 2) === '12') {
      after_12 = 0;
    } else {
      after_12 = parseInt(toTime?.substring(0, 2)) - 0;
    }
    return (before_12 + after_12) * 100;
  }
};
