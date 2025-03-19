import { z } from "zod";

export interface ValidationResult<T> {
	success: boolean;
	data?: T;
	error?: string;
}

export function validateMessage<T>(
	data: string,
	schema: z.ZodSchema<T>
): ValidationResult<T> {
	try {
		const parsedData = JSON.parse(data);
		const validatedData = schema.parse(parsedData);
		return {
			success: true,
			data: validatedData,
		};
	} catch (error) {
		// Handle JSON parse errors
		if (error instanceof SyntaxError) {
			return {
				success: false,
				error: "Invalid JSON format",
			};
		}

		// Handle Zod validation errors
		if (error instanceof z.ZodError) {
			return {
				success: false,
				error: `Validation error: ${error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ")}`,
			};
		}

		// Handle any other errors
		return {
			success: false,
			error: `Unknown error: ${error instanceof Error ? error.message : String(error)}`,
		};
	}
}
