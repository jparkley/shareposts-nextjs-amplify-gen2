export const trimContent = (content: string) => {
  let trimmedContent = content.substring(0, 190);
  trimmedContent = trimmedContent.substring(0, Math.min(trimmedContent.length, trimmedContent.lastIndexOf(" ")));
  return trimmedContent;
}