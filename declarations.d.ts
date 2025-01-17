// declarations.d.ts
declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}
// declare module '@env' {
//   export const GOOGLE_ID: string;
//   export const SUPABASE_URL: string;
//   export const SUPABASE_SECRET: string;
// }
