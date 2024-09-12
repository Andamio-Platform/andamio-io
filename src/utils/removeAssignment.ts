export function removeAssignment(a: string) {
  if (a.startsWith("assignment")) {
    return a.substring(10);
  }
  return a;
}
