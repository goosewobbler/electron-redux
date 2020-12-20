import { preventDoubleInitialization } from "./misc";

test("calling preventDoubleInitialization twice throws", () => {
	jest.spyOn(console, "error").mockImplementation(jest.fn());

	expect(preventDoubleInitialization).not.toThrowError();
	expect(preventDoubleInitialization).toThrowError();
	expect(console.error).toBeCalled();
});
