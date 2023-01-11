import type { ServiceInfo } from '/#/store';

import { defineStore } from 'pinia';

import { ONLINE_SERVICE_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';

interface ServiceState {
  serviceInfo: Nullable<ServiceInfo>;
}

export const useServiceStore = defineStore({
  id: 'online-service',
  state: (): ServiceState => ({
    serviceInfo: Persistent.getLocal(ONLINE_SERVICE_KEY),
  }),
  getters: {
    getServiceInfo(): Nullable<ServiceInfo> {
      return this.serviceInfo;
    },
  },
  actions: {
    setServiceInfo(info: ServiceInfo) {
      this.serviceInfo = Object.assign({}, this.serviceInfo, info);
      Persistent.setLocal(ONLINE_SERVICE_KEY, this.serviceInfo, true);
    },
    resetServiceInfo() {
      Persistent.removeLocal(ONLINE_SERVICE_KEY, true);
      this.serviceInfo = null;
    },
  },
});
