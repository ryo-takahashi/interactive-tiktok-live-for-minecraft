const Mob = {
  pillager: "pillager",
  ravager: "ravager",
  warden: "warden",
  tnt: "tnt",
  golem: "iron_golem",
};

export type Mob = (typeof Mob)[keyof typeof Mob];
