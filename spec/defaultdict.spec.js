/* global describe, it, expect */
/* eslint prefer-arrow-callback:0, func-names:0, global-require:0, import/no-extraneous-dependencies:0 */

import install from 'jasmine-es6';

install();


describe('defaultdict', function () {
  const defaultdict = require('../lib/defaultdict').default;

  it('with integer default', function () {
    const dd = defaultdict(0);
    dd.a = 1;
    dd.b = 0;
    expect(dd.a).toEqual(1);
    expect(dd.b).toEqual(0);
    expect(dd.c).toEqual(0);
  });

  it('with function that uses property name', function () {
    const dd = defaultdict(prop => prop);
    dd.a = 42;
    expect(dd.a).toEqual(42);
    expect(dd.b).toEqual('b');
  });

  it('with null', function () {
    const dd = defaultdict(null);
    expect(dd.a).toBeNull();
  });

  it('with array', function () {
    const dd = defaultdict([]);
    expect(dd.a).toEqual([]);
    expect(dd.a === dd.b).toBeFalsy();
    dd.c.push(0);
    expect(dd.c).toEqual([0]);
  });

  it('with object', function () {
    const dd = defaultdict({ v: 42 });
    expect(dd.a.v).toEqual(42);
    dd.a.v = 0;
    expect(dd.a.v).toEqual(0);
    expect(dd.a === dd.b).toBeFalsy();
  });
});
