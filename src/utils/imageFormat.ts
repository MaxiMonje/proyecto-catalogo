// utils/imageFormat.ts
export const normalizePrice = (s: string) => {
  const x = s.trim().replace(",", ".");
  const [i, d = ""] = x.split(".");
  const ii = i.replace(/^0+(?=\d)/, "") || "0";
  const dd = (d + "00").slice(0, 2);
  return `${ii}.${dd}`;
};

export const normalizeQuantity = (s: string) => {
  const x = s.trim().replace(/\D/g, "");
  return (x || "0").replace(/^0+(?=\d)/, "") || "0";
};
