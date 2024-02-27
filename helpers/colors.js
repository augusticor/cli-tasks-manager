const COLORS = Object.freeze({
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  black: '\x1b[30m',
  reset: '\x1b[0m',
});

/**
 * Function to colorize text
 * @param {string} text The text to colorize
 * @param {string} [color='\x1b[0m']] The color to use from the COLORS object
 * @returns {string} The colorized text
 */
function colorizeText(text, color = COLORS.reset) {
  return COLORS[color] + text + COLORS.reset;
}

export default colorizeText;