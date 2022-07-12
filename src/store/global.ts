import { defineStore } from 'pinia';
import pinia from './index';

export interface Global {
  locale: string;
  token: string | null;
}

const useGlobalStore = defineStore({
  id: 'global',
  state: (): Global => {
    return { locale: 'zh-CN', token: null };
  },
  getters: {},
  actions: {
    setLocale(locale: string) {
      this.$patch({ locale: locale });
      localStorage.locale = locale;
    }
  }
});

const watchDog = useGlobalStore(pinia);
watchDog.$subscribe((_, state: Global) => {
  localStorage.global = JSON.stringify(state);
});
if (localStorage.global) {
  watchDog.$state = JSON.parse(localStorage.global);
}

export default useGlobalStore;
