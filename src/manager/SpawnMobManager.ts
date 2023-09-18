import { Mob } from "../types/Mob";
import { WebSocket } from "ws";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { Subject, throttle, interval } from "rxjs";

export class SpawnMobManager {
  private static _instance: SpawnMobManager;

  private currentWebSocket: WebSocket | undefined;
  spawnMobSubject: Subject<{ mob: Mob; mobNameTag: string }> = new Subject();
  private constructor() {
    this.spawnMobSubject
      .pipe(throttle(() => interval(50)))
      .subscribe(({ mob, mobNameTag }) => {
        if (this.currentWebSocket === undefined) {
          return;
        }
        executeMinecraftCommand(
          this.currentWebSocket,
          buildMobSpawnCommandAtPlayer(mob, mobNameTag)
        );
      });
  }

  public static get instance(): SpawnMobManager {
    if (!this._instance) {
      this._instance = new SpawnMobManager();
    }

    return this._instance;
  }

  public setCurrentWebSocket(ws: WebSocket) {
    this.currentWebSocket = ws;
  }
}
