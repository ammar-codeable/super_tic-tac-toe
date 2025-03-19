import { z } from "zod";

export interface ValidationResult<T> {
	success: boolean;
	data?: T;
	error?: string;
}

export function validateMessage<T>(data: string, schema: z.ZodSchema<T>): T {
	try {
		const parsedData = JSON.parse(data);
		return schema.parse(parsedData);
	} catch (error) {
		if (error instanceof SyntaxError) {
			console.error("Invalid JSON format:", error.message);
		} else if (error instanceof z.ZodError) {
			console.error(
				"Validation error:",
				error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ")
			);
		} else {
			console.error(
				"Unknown error:",
				error instanceof Error ? error.message : String(error)
			);
		}

		throw error;
	}
}
