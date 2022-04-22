export const differenceFinder = (fromTime, toTime) => {
  if (
    (fromTime?.includes('am') && toTime?.includes('am')) ||
    (fromTime?.includes('pm') && toTime?.includes('pm'))
  ) {
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
