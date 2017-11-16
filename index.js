;(function () { // eslint-disable-line no-extra-semi
  'use strict';

  // Re-use regular expressions
  var WIDONT_REGEX = /([^\s])\s+([^\s]+)\s*$/
  var DASH_REGEX = /-/g

  // Replace with the non-breaking versions of each character by default
  widont.space = '\u00a0'
  widont.hyphen = '\u2011'

  function widont(str, space, hyphen) {
    if (typeof str !== 'string') {
      return str
    }

    // Default values
    if (space == null) space = widont.space
    if (hyphen == null) hyphen = widont.hyphen

    return str.replace(WIDONT_REGEX, function widontReplacer(str, lead, word) {
      // Prefer replacing hyphens inside last word if present
      if (word.indexOf('-') >= 0) {
        return lead + ' ' + word.replace(DASH_REGEX,  hyphen)
      }
      return lead + space + word
    })
  }

  if (typeof module !== 'undefined' && module.exports) {
    widont.default = widont
    module.exports = widont
  } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define('widont', [], function() { return widont })
  } else {
    window.widont = widont
  }
}());
