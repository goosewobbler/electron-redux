export function isPlainObject(value: any): value is Record<any, any> {
	if (
		!(typeof value === "object" && value !== null) ||
		{}.toString.call(value) !== "[object Object]"
	) {
		return false;
	}
	if (Object.getPrototypeOf(value) === null) {
		return true;
	}
	let proto = value;
	while (Object.getPrototypeOf(proto) !== null) {
		proto = Object.getPrototypeOf(proto);
	}
	return Object.getPrototypeOf(value) === proto;
}

export function isString(value: any): value is string {
	const type = typeof value;
	return (
		type === "string" ||
		(type === "object" &&
			value != null &&
			!Array.isArray(value) &&
			{}.toString.call(value) === "[object String]")
	);
}
