/* eslint-disable no-undef */
import Finance from './finance';

describe('Finance Library', () => {
  const rate = 0.07 / 12;
  const pv = 165000;
  const nper = 30 * 12;
  const type = 0;
  const fv = 0;
  const payNum = 24;

  describe('PMT Capability', () => {
    it('should be able calculate PMT', () => {
      expect(Finance.ROUND(Finance.PMT(rate, nper, pv, fv, type), 2)).toBe(-1097.75);
    });
  });

  describe('FV Capability', () => {
    it('should be able calculate FV', () => {
      const charge = Finance.PMT(rate, nper, pv, fv, type);
      expect(Finance.ROUND(Finance.FV(rate, payNum, charge, pv, type), 2)).toBe(-161526.66);
    });
  });
});
