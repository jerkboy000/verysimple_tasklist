/**
 * Converts a timestamp to a Date object.
 *
 * @param {number} timestamp - The timestamp to be converted.
 * @returns {Date} A Date object representing the timestamp.
 * @private
 */
const convertTimestampToDate = (timestamp) => new Date(parseInt(timestamp, 10));

/**
 * Extracts date components from a Date object.
 *
 * @param {Date} date - The Date object.
 * @returns {Object} An object containing year, month, day, hours, and minutes.
 * @private
 */
const extractDateComponents = (date) => ({
    year: date.getFullYear(),
    month: String(date.getMonth() + 1).padStart(2, '0'),
    day: String(date.getDate()).padStart(2, '0'),
    hours: String(date.getHours()).padStart(2, '0'),
    minutes: String(date.getMinutes()).padStart(2, '0'),
});

/**
 * Converts a Unix timestamp to MM/DD/YYYY HH:MM:SS format.
 *
 * @param {number} timestamp - The Unix timestamp in milliseconds.
 * @returns {string} The formatted date.
 */
export const formatTimestampToDateTime = (timestamp) => {
    const date = convertTimestampToDate(timestamp);
    const { year, month, day, hours, minutes } = extractDateComponents(date);

    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};

/**
 * Converts a timestamp to a string in the format "yyyy-MM-ddThh:mm".
 *
 * @param {number} timestamp - The timestamp to be formatted.
 * @returns {string} A formatted string in the "yyyy-MM-ddThh:mm" format.
 */
export const formatTimestampToISOString = (timestamp) => {
    const date = convertTimestampToDate(timestamp);
    const { year, month, day, hours, minutes } = extractDateComponents(date);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};
