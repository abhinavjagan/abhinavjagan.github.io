/**
 * Resolves a path to `public/` using Vite's `import.meta.env.BASE_URL` (trailing slash).
 * @param {string} path - e.g. "assets/docs/x.pdf" or "/assets/docs/x.pdf"
 */
export function publicUrl(path) {
  const p = path.replace(/^\/+/, "");
  let b = import.meta.env.BASE_URL;
  if (b == null || b === "") b = "/";
  if (!b.endsWith("/")) b = `${b}/`;
  return `${b}${p}`;
}
