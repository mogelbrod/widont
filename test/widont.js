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

  it('uses named replacements', function() {
    assert.equal(
      widont('I get HTML entities instead', 'html'),
      'I get HTML entities&nbsp;instead'
    )

    assert.equal(
      widont('I get HTML entities-instead', 'html'),
      'I get HTML entities&#8209;instead'
    )
  })

  it('uses custom replacements', function() {
    assert.equal(
      widont('I get custom spaces', {space: '!!', hyphen: '??'}),
      'I get custom!!spaces'
    )
  })

  it('throws TypeError for unknown named replacements', function() {
    assert.throws(widont.bind(null, 'a b', ''), TypeError)
    assert.throws(widont.bind(null, 'a b', 'unknown'), TypeError)
  })

  it('throws TypeError for incomplete replacements objects', function() {
    assert.throws(widont.bind(null, 'a b', {}), TypeError)
    assert.throws(widont.bind(null, 'a b', {space: '!'}), TypeError)
    assert.throws(widont.bind(null, 'a b', {hyphen: '!'}), TypeError)
  })

  it('doesn\'t touch strings with fewer than two words by default', function() {
    [
      '  ',
      'hello ',
      ' goodbye '
    ].forEach(function(x) {
      assert.equal(widont(x), x)
    })
  })

  it('respects `minWords` argument', function() {
    [
      'hello world',
      'Wow! Impressive',
      'Many   spaces'
    ].forEach(function(x) {
      assert.equal(widont(x, 'ascii', 3), x)
    })
    assert.equal(widont('aaa bbb ccc', 'ascii', 3), 'aaa bbb_ccc')
    assert.equal(widont('aaa bbb ccc ddd', 'ascii', 4), 'aaa bbb ccc_ddd')
  })

  it('returns empty strings as is', function() {
    assert.equal(widont(''), '')
  })

  it('returns non-strings as is', function() {
    [undefined, null, 8, [], [1], {}].forEach(function(x) {
      assert.equal(widont(x), x)
    })
  })

  it('exports named replacements', function() {
    assert.equal(typeof widont.replacements, 'object')
  })
})
