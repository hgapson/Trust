type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean>;

function flatten(values: ClassValue, result: string[]) {
  if (!values) return;
  if (typeof values === "string" || typeof values === "number") {
    if (String(values).trim()) {
      result.push(String(values).trim());
    }
    return;
  }
  if (Array.isArray(values)) {
    for (const value of values) {
      flatten(value, result);
    }
    return;
  }
  if (typeof values === "object") {
    for (const [key, value] of Object.entries(values)) {
      if (value) {
        result.push(key);
      }
    }
  }
}

export function cn(...inputs: ClassValue[]) {
  const result: string[] = [];
  for (const input of inputs) {
    flatten(input, result);
  }
  return result.join(" ");
}
