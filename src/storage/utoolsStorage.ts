import { useStorage } from '@vueuse/core';

export function useUtoolsStorage(name: string, defaults: any): any {
  if (!window['utools']){
    return useStorage(name, defaults);
  }
  return useStorage(name, defaults, utools.dbStorage);
}
