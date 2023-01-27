export function removeSpecialCharacters(value: string) {
  return value.replace(/[^\d]+/g, "");
}
