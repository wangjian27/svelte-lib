/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.svelte' {
  // @ts-ignore
  import type { SvelteComponent } from 'svelte';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: SvelteComponent<{}>;
  // @ts-ignore
  export default component;
}
declare namespace svelte.JSX {
  // @ts-ignore
  interface HTMLAttributes {
    'webkit-playsinline'?: any;
    dplayerKeyCode?: boolean;
    'true-value'?: any;
    'false-value': number | string | boolean;
  }
}
declare interface HTMLElement {
  webkitRequestFullScreen: (options?: FullscreenOptions) => Promise<void>;
}
interface ErrInfo {
  //错误名称或地址，没有可传'-'
  name?: string;
  //错误信息
  message?: string;
  //错误堆栈信息
  stack?: string;
}
interface Options extends ErrInfo {
  // 类型
  category: 'js';
  // 级别
  grade: 'Error';
}
declare interface Window {
  ClientMonitor: {
    reportFrameErrors: (arg0: Options, arg1?: ErrInfo) => void;
  };
  feMonitor: {
    send: (arg0: string, arg1: string, arg2: string) => void;
  };
  _thsclog: (arg0: { name: string; ver: string }) => void;
}
