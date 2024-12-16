import { z } from "zod";

export function validateMessage<T>(data: string, schema: z.ZodSchema<T>): T {
  const parsedData = JSON.parse(data);
  return schema.parse(parsedData);
}
