import { z } from "zod";

// https://transform.tools/json-to-zod
export const liveConfigSchema = z.object({
  random_respawn: z.boolean(),
  trigger: z.object({
    like: z.array(
      z.object({
        rate: z.number(),
        commands: z.array(
          z.object({
            type: z.string(),
            interval_seconds: z.number(),
            commands: z.array(z.string()),
          })
        ),
      })
    ),
    chat: z.array(
      z.object({
        chat: z.string(),
        rate: z.number(),
        commands: z.array(
          z.object({
            type: z.string(),
            interval_seconds: z.number(),
            commands: z.array(z.string()),
          })
        ),
      })
    ),
    follow: z.array(
      z.object({
        rate: z.number(),
        commands: z.array(
          z.object({
            type: z.string(),
            interval_seconds: z.number(),
            commands: z.array(z.string()),
          })
        ),
      })
    ),
    share: z.array(
      z.object({
        rate: z.number(),
        commands: z.array(
          z.object({
            type: z.string(),
            interval_seconds: z.number(),
            commands: z.array(z.string()),
          })
        ),
      })
    ),
    member: z.array(
      z.object({
        rate: z.number(),
        commands: z.array(
          z.object({
            type: z.string(),
            interval_seconds: z.number(),
            commands: z.array(z.string()),
          })
        ),
      })
    ),
  }),
});
