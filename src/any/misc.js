/**
 * Checks if a value is an array that only contains strings. This implies a
 * non-empty array, though you may allow empty arrays to pass the check with
 * the second parameter
 * @param {*} value
 * @param {boolean} [empty=false] Whether or not empty arrays pass
 * @returns {boolean} True if value is an array that only contains strings, else false
 */
const isArrayOfStrings = function(value, empty = false) {
    if (!value) return false;
    if (!Array.isArray(value)) return false;
    if (!value.length) return Boolean(empty);
    return !value.some((element) => typeof element !== "string");
};

export { isArrayOfStrings };
