/// <reference types="react-scripts" />

declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

interface Bit {
  data: Array<0 | 1>
  type: 'Buffer'
}
