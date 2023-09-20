export interface LiveConfig {
  random_respawn: boolean;
  trigger: Trigger;
}

export interface Trigger {
  like: Follow[];
  chat: Chat[];
  follow: Follow[];
  share: Share[];
  member: Member[];
}

export interface Chat {
  chat: string;
  rate: number;
  commands: Command[];
}

export interface Command {
  type: CommandType;
  interval_seconds: number;
  commands: string[];
}

export enum CommandType {
  Once = "once",
  Repeat = "repeat",
}

export interface Follow {
  rate: number;
  commands: Command[];
}

export interface Share {
  rate: number;
  commands: Command[];
}

export interface Member {
  rate: number;
  commands: Command[];
}
