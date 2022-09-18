let prettyMilliseconds;
import("pretty-ms").then(p => prettyMilliseconds = p.default);

module.exports = {
    /**
     * @param {number} duration
     * @returns {string}
     */
    async format(duration) {
        return prettyMilliseconds(duration, { verbose: true, secondsDecimalDigits: 0});
    }
}   