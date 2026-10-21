/** The portal address the extension talks to (set by extension/build.mjs). */
declare const __PORTAL__: string;

/** extension/build.mjs loads .css files as text (for the shadow DOM). */
declare module "*.css" {
  const text: string;
  export default text;
}
