export function formatQuota(mb) {
  if (!mb) return null;

  if (mb === 9999999) return "Unlimited";

  if (mb >= 1024) {
    return `${Math.ceil(mb / 1024)} GB`;
  }

  return `${Math.ceil(mb)} MB`;
}