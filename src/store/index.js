import {
  createStore
} from 'vuex'

import pairs from './pairs';

export default createStore({
  modules: {
    pairs,
  }
})