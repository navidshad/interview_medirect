// https://momentjs.com/
import moment from "moment";

const dailyFormat = "YYYY-MM-DD";
const hourlyFormat = "YYYY-MM-DD-HH:mm";

// console.log(moment.utc().format());
// console.log(moment.utc().format(hourlyFormat));

export default {
  "1H": () => {
    return {
      interval: "minute",
      period: 1,
      start_date: moment.utc().subtract(60, "minute").format(hourlyFormat),
      end_date: moment.utc().format(hourlyFormat),
    };
  },

  "1D": () => {
    return {
      interval: "hourly",
      period: 1,
      start_date: moment.utc().subtract(1, "day").format(hourlyFormat),
      end_date: moment.utc().format(hourlyFormat),
    };
  },

  "1W": () => {
    return {
      interval: "daily",
      period: 1,
      start_date: moment.utc().subtract(1, "week").format(dailyFormat),
      end_date: moment.utc().format(dailyFormat),
    };
  },

  "1M": () => {
    return {
      interval: "daily",
      period: 1,
      start_date: moment.utc().subtract(1, "month").format(dailyFormat),
      end_date: moment.utc().format(dailyFormat),
    };
  },

  getList() {
    return Object.keys(this).filter((i) => i !== "getList");
  },
};
