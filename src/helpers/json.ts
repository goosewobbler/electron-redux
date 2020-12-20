/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/**
 * Preserves some types like Map and Set when serializing
 */
export const freeze = (_: string, value: unknown): unknown => {
	if (value instanceof Map) {
		return {
			__hydrate_type: "__hydrate_map",
			items: Array.from(value),
		};
	} else if (value instanceof Set) {
		return {
			__hydrate_type: "__hydrate_set",
			items: Array.from(value),
		};
	}

	return value;
};

/**
 * Hydrates some types like Map and Set when deserializing
 */
export const hydrate = (_: string, value: any): any => {
	if (value != null && typeof value === "object") {
		if ("__hydrate_type" in value) {
			if (
				value.__hydrate_type === "__hydrate_map" &&
				value.items != null &&
				typeof value.items === "object"
			) {
				return new Map(value.items);
			} else if (
				value.__hydrate_type === "__hydrate_set" &&
				Array.isArray(value.items)
			) {
				return new Set(value.items);
			}
		}
	}

	return value;
};
