export default function mergeObjects(obj1: any, obj2: any) {
  const answer: { [key: string]: any } = {};
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
