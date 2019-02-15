export const IS_SERVER = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
