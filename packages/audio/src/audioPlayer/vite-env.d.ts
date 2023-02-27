/// <reference types="svelte" />

declare module '*.svelte' {
  // import type { SvelteComponent } from 'svelte';
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  // const component: SvelteComponent<{}>;
  // export default component;
}

type ClientProtocol = (
  arg0: string,
  arg1: Record<string, any> | '',
  arg2?: any
) => void;
declare interface Window {
  getCssStyle: () => string;
  callNativeHandler: ClientProtocol;
  registerWebHandler: ClientProtocol;
  getParam: (param: string) => string | null | undefined;
  hxmClickStat: any;
}
