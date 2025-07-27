export const formatNumber = (num: number): string => {
  if (num < 10000) return num.toString();
  if (num < 1000000) return Math.floor(num / 1000) + "k";
  return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
};
