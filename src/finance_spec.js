/* eslint-disable no-undef */

import Finance from './finance';

describe('Finance Library', () => { 
  it('should be able calculate PMT', () => {
    expect(Finance.PMT()).toBe(1);
  });
});
