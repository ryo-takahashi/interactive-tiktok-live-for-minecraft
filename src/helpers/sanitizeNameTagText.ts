export const sanitizeNameTagText = (text: string): string => {
  // 英数字と日本語はそのままで、スペース, 記号 を _ に置換する
  try {
    return `${text.replace(/[\s,."':;<>?@[\]{}|~`!#$%^&*()=+\\/]/g, "_")}`;
  } catch (error) {
    return "?";
  }
};
