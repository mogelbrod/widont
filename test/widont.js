/* eslint-env node, mocha */
var assert = require('assert')
var widont = require('..')

describe('widont', function() {
  it('converts last space of a string', function() {
    assert.equal(
      widont('I dream of a world without widows'),
      'I dream of a world without\u00a0widows'
    )
  })

  it('converts hyphens when last word contains them', function() {
    assert.equal(
      widont('I like words with hyphens that stick-together'),
      'I like words with hyphens that stick\u2011together'
    )
  })

  it('respects optional space argument', function() {
    assert.equal(
      widont('I get HTML entities instead', '&nbsp;', '&#8209;'),
      'I get HTML entities&nbsp;instead'
    )
  })

  it('respects optional hyphen argument', function() {
    assert.equal(
      widont('I get HTML entities-instead', '&nbsp;', '&#8209;'),
      'I get HTML entities&#8209;instead'
    )
  })

  it('doesn\'t touch strings with less than two words', function() {
    [
      '  ',
      'hello ',
      ' goodbye '
    ].forEach(function(x) {
      assert.equal(widont(x), x)
    })
  })

  it('returns empty strings as is', function() {
    assert.equal(widont(''), '')
  })

  it('returns non-strings as is', function() {
    [undefined, null, 8, [], [1], {}].forEach(function(x) {
      assert.equal(widont(x), x)
    })
  })

  it('exports space constant', function() {
    assert.ok(widont.space)
  })

  it('exports hyphen constant', function() {
    assert.ok(widont.hyphen)
  })
})
