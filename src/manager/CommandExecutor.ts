import { WebSocket } from "ws";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { Subject, throttle, interval } from "rxjs";

export class CommandExecutor {
  private static _instance: CommandExecutor;

  private currentWebSocket: WebSocket | undefined;
  throttleSubject: Subject<string> = new Subject();

  private constructor() {
    this.throttleSubject
      .pipe(throttle(() => interval(100)))
      .subscribe((command) => {
        if (this.currentWebSocket === undefined) {
          return;
        }
        executeMinecraftCommand(this.currentWebSocket, command);
      });
  }

  public static get instance(): CommandExecutor {
    if (!this._instance) {
      this._instance = new CommandExecutor();
    }

    return this._instance;
  }

  public setCurrentWebSocket(ws: WebSocket) {
    this.currentWebSocket = ws;
  }

  public execute(command: string) {
    if (!this.currentWebSocket) {
      console.error("websocket is undefined");
      return;
    }
    executeMinecraftCommand(this.currentWebSocket, command);
  }
}
