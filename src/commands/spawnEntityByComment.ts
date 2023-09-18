import { buildGiveCommandAtPlayer } from "../helpers/buildGiveCommandAtPlayer";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";
import { SpawnCommentType } from "../types/SpawnCommentType";
import { MCItem } from "../types/MCItem";
import { buildGiveEffectCommandAtPlayer } from "../helpers/buildGiveEffectCommandAtPlayer";
import { MCEffect } from "../types/MCEffect";
import { buildSayCommand } from "../helpers/buildSayCommand";
import { sanitizeNameTagText } from "../helpers/sanitizeNameTagText";
import { buildPlaysoundCommand } from "../helpers/buildPlaysoundCommand";
import { MCSound } from "../types/MCSound";
import { buildFireworkRainSpawnCommandsAtPlayer } from "../helpers/buildFireworkRainSpawnCommandAtPlayer";

export const spawnEntityByComment = async (
  ws: WebSocket,
  nickname: string,
  comment: string
) => {
  const characters = [...comment];
  const filterd1Characters = characters.filter(
    (character) => character === SpawnCommentType._1
  );
  const filterd2Characters = characters.filter(
    (character) => character === SpawnCommentType._2
  );
  const filterd3Characters = characters.filter(
    (character) => character === SpawnCommentType._3
  );
  const filterd4Characters = characters.filter(
    (character) => character === SpawnCommentType._4
  );
  const filterd5Characters = characters.filter(
    (character) => character === SpawnCommentType._5
  );
  const filterd6Characters = characters.filter(
    (character) => character === SpawnCommentType._6
  );
  const filterd7Characters = characters.filter(
    (character) => character === SpawnCommentType._7
  );
  const filterd8Characters = characters.filter(
    (character) => character === SpawnCommentType._8
  );
  const filterd9Characters = characters.filter(
    (character) => character === SpawnCommentType._9
  );
  const filterd0Characters = characters.filter(
    (character) => character === SpawnCommentType._0
  );

  if (filterd1Characters.length > 0) {
    executeMinecraftCommand(
      ws,
      buildSayCommand(
        `${sanitizeNameTagText(nickname)}がTNTを${
          filterd1Characters.length
        }個召喚した`
      )
    );
    for await (const character of filterd1Characters) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.click));
      executeMinecraftCommand(
        ws,
        buildMobSpawnCommandAtPlayer(Mob.tnt, nickname)
      );
    }
  }

  if (filterd2Characters.length > 0) {
    executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.orb));
    executeMinecraftCommand(
      ws,
      buildSayCommand(
        `${sanitizeNameTagText(nickname)}がダイヤを${
          filterd2Characters.length
        }個与えた`
      )
    );

    executeMinecraftCommand(
      ws,
      buildGiveCommandAtPlayer(MCItem.diamond, filterd2Characters.length)
    );
  }

  if (filterd3Characters.length > 0) {
    executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.orb));
    executeMinecraftCommand(
      ws,
      buildSayCommand(
        `${sanitizeNameTagText(nickname)}が鉄インゴットを${
          filterd3Characters.length
        }個与えた`
      )
    );
    executeMinecraftCommand(
      ws,
      buildGiveCommandAtPlayer(MCItem.iron_ingot, filterd3Characters.length)
    );
  }

  if (filterd4Characters.length > 0) {
    executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.orb));
    const seconds = filterd4Characters.length * 10;
    executeMinecraftCommand(
      ws,
      buildSayCommand(
        `${sanitizeNameTagText(
          nickname
        )}がダメージ耐性効果を${seconds}秒間与えた`
      )
    );
    executeMinecraftCommand(
      ws,
      buildGiveEffectCommandAtPlayer(MCEffect.resistance, seconds, 2)
    );
  }

  if (filterd5Characters.length > 0) {
    executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.orb));
    const seconds = filterd5Characters.length * 10;
    executeMinecraftCommand(
      ws,
      buildSayCommand(
        `${sanitizeNameTagText(
          nickname
        )}が移動速度上昇効果を${seconds}秒間与えた`
      )
    );
    executeMinecraftCommand(
      ws,
      buildGiveEffectCommandAtPlayer(MCEffect.speed, seconds, 5)
    );
  }

  if (filterd6Characters.length > 0) {
    executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.orb));
    const seconds = filterd6Characters.length * 10;
    executeMinecraftCommand(
      ws,
      buildSayCommand(
        `${sanitizeNameTagText(nickname)}が低速落下効果を${seconds}秒間与えた`
      )
    );
    executeMinecraftCommand(
      ws,
      buildGiveEffectCommandAtPlayer(MCEffect.slow_falling, seconds, 1)
    );
  }

  if (filterd7Characters.length > 0) {
    executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.orb));
    executeMinecraftCommand(
      ws,
      buildSayCommand(
        `${sanitizeNameTagText(nickname)}が黒曜石を${
          filterd7Characters.length
        }個与えた`
      )
    );
    executeMinecraftCommand(
      ws,
      buildGiveCommandAtPlayer(MCItem.obsidian, filterd7Characters.length)
    );
  }

  for await (const character of filterd8Characters) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const commands = buildFireworkRainSpawnCommandsAtPlayer();
    for await (const command of commands) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      executeMinecraftCommand(ws, command);
    }
  }

  if (filterd9Characters.length > 0) {
    executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.orb));
    executeMinecraftCommand(
      ws,
      buildSayCommand(
        `${sanitizeNameTagText(nickname)}が金のりんごを${
          filterd9Characters.length
        }個与えた`
      )
    );
    executeMinecraftCommand(
      ws,
      buildGiveCommandAtPlayer(MCItem.golden_apple, filterd9Characters.length)
    );
  }

  if (filterd0Characters.length > 0) {
    executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.orb));
    executeMinecraftCommand(
      ws,
      buildSayCommand(
        `${sanitizeNameTagText(nickname)}がエンダーパールを${
          filterd0Characters.length
        }個与えた`
      )
    );
    executeMinecraftCommand(
      ws,
      buildGiveCommandAtPlayer(MCItem.ender_pearl, filterd0Characters.length)
    );
  }
};
