export function createId(prefix = 'id'): string {
  // lightweight unique id suitable for local-only state
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}
