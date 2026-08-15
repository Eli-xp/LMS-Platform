import { z } from "zod";

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, { error: "Filename is required" }),
  contentType: z.string().min(1, { error: "Content type is required" }),
  size: z.number().min(1, { error: "Size is required" }),
});
