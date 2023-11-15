;(function () { // eslint-disable-line no-extra-semi
  'use strict';

  // Re-use regular expressions
  var WIDONT_REGEX = /([^\s])\s+([^\s]+)\s*$/
  var DASH_REGEX = /-/g

  // Predefined replacement options
  var REPLACEMENTS = widont.replacements = {
    unicode: {
      space: '\u00a0',
      hyphen: '\u2011'
    },
    html: {
      space: '&nbsp;',
      hyphen: '&#8209;'
    },
    ascii: {
      space: '_',
      hyphen: '~'
    }
  }

  function widont(str, replacements, minWords) {
    if (typeof str !== 'string') {
      return str
    }

    switch (typeof replacements) {
      case 'object':
        if (!replacements) break
        if (replacements.space == null || replacements.hyphen == null) {
          throw new TypeError('widont: Must provide `space` & `hyphen` replacements')
        }
        break
      case 'string':
        if (!(replacements in REPLACEMENTS)) {
          throw new TypeError('widont: Unknown replacements `' + replacements + '`')
        }
        replacements = REPLACEMENTS[replacements]
        break
      default:
        replacements = REPLACEMENTS.unicode
    }

    if (minWords == null) {
      minWords = 3
    }
    if (typeof minWords === 'number' && minWords >= 2) {
      var minWordsRegex = new RegExp('\\S+(?:\\s+\\S+){' + (minWords - 1) + ',}')
      if (!minWordsRegex.test(str)) {
        return str
      }
    }

    return str.replace(WIDONT_REGEX, function widontReplacer(str, lead, word) {
      // Prefer replacing hyphens inside last word if present
      if (word.indexOf('-') >= 0) {
        return lead + ' ' + word.replace(DASH_REGEX, replacements.hyphen)
      }
      return lead + replacements.space + word
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
