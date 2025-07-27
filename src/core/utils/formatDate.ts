import moment from "moment";

/**
 * Formatea una fecha en formato "Hace X tiempo" o "DD/MM/YYYY"
 * @param dateString Fecha en formato ISO
 */
export const formatPostDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = moment(dateString);
  const now = moment();
  if (now.diff(date, "days") < 7) return date.fromNow();
  return date.format("DD/MM/YYYY");
};
