export const buildTitleRawCommand = (title: string) => {
  return `titleraw @a title {"rawtext":[{"text":"${title}"}]}`;
};

export const buildSubTitleRawCommand = (subTitle: string) => {
  return `titleraw @a subtitle {"rawtext":[{"text":"${subTitle}"}]}`;
};

export const buildActionBarRawCommand = (text: string) => {
  return `titleraw @a actionbar {"rawtext":[{"text":"${text}"}]}`;
};