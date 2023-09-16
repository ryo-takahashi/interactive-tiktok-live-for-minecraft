export const sanitizeCommandText = (text: string): string => {
  // 英数字と日本語はそのままで、スペース, 記号 を _ に置換する
  return text.replace(/[\s,."':;<>?@[\]{}|~`!#$%^&*()=+\\/]/g, "_");
};
