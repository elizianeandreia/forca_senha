import test from 'node:test'
import assert from 'node:assert/strict'
import { analyzePassword } from '../src/utils/analyzePassword.js'

test('empty password returns neutral analysis', () => {
  const result = analyzePassword('')

  assert.equal(result.score, 0)
  assert.equal(result.level, 'idle')
  assert.equal(result.criteria.length, false)
})

test('common sequential password is classified as critical', () => {
  const result = analyzePassword('123456')

  assert.ok(result.score < 25)
  assert.equal(result.level, 'critical')
  assert.equal(result.flags.hasSequence, true)
  assert.equal(result.flags.isCommon, true)
})

test('long repeated password is penalized despite meeting several criteria', () => {
  const result = analyzePassword('AAAAAAAAAAAA1!')

  assert.equal(result.flags.hasRepeats, true)
  assert.ok(result.score < 70)
})

test('diverse long password reaches excellent classification', () => {
  const result = analyzePassword('N7!vQ2#pL9@xR4$k')

  assert.ok(result.score >= 85)
  assert.equal(result.level, 'excellent')
  assert.equal(result.flags.hasSequence, false)
  assert.equal(result.flags.hasRepeats, false)
  assert.equal(result.criteria.length, true)
  assert.equal(result.criteria.uppercase, true)
  assert.equal(result.criteria.lowercase, true)
  assert.equal(result.criteria.number, true)
  assert.equal(result.criteria.symbol, true)
})
