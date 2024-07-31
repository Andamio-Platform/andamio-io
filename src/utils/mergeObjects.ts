export default function mergeObjects<T, U>(obj1: T, obj2: U) {
  const answer: Record<string, any> = {};
  for (const key in obj1) {
    if (answer[key] === undefined || answer[key] === null)
      answer[key] = obj1[key];
  }
  for (const key in obj2) {
    if (answer[key] === undefined || answer[key] === null)
      answer[key] = obj2[key];
  }
  return answer;
}
