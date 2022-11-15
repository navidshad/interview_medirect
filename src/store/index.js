import { createStore } from "vuex";

import pairs from "./pairs";
import chart from "./chart";

export default createStore({
  modules: {
    pairs,
    chart,
  },
});
