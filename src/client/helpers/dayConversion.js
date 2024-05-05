export function convertNumToDay(dayNum) {
  const daysMap = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
  };
  return daysMap[dayNum];
}

export function convertDayToNum(dayName) {
  const daysMap = {
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
    "Sunday": 7
  };
  return daysMap[dayName];
}

