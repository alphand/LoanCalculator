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
      const pmt = Finance.PMT(rate, nper, pv, fv, type);
      const pmtRounded = Finance.ROUND(pmt, 2);
      expect(pmtRounded).toBe(-1097.75);
    });
  });

  describe('FV Capability', () => {
    it('should be able calculate FV', () => {
      const charge = Finance.PMT(rate, nper, pv, fv, type);
      const fvVal = Finance.FV(rate, payNum, charge, pv, type);
      const fvRounded = Finance.ROUND(fvVal, 2);
      expect(fvRounded).toBe(-161526.66);
    });
  });

  describe('IPMT Capability', () => {
    it('should be able to calculate IPMT', () => {
      const ipmt = Finance.IPMT(rate, payNum, nper, pv, fv, type);
      const ipmtRounded = Finance.ROUND(ipmt, 2);
      expect(ipmtRounded).toBe(-943.14);
    });
  });

  describe('PPMT Capability', () => {
    it('should be able to calculate PPMT', () => {
      const ppmt = Finance.PPMT(rate, payNum, nper, pv, fv, type);
      const ppmtRounded = Finance.ROUND(ppmt, 2);
      expect(ppmtRounded).toBe(-154.61);
    });
  });

  describe('Amoritization Schedule', () => {
    it('it should compute amortization schedule', () => {
      const paySchedule = Finance.AMORTIZE(rate, nper, pv, fv, type);
      const lastSched = paySchedule[nper - 1];
      expect(paySchedule.length).toBe(nper);
      expect(lastSched.balance).toBe(0);
    });
  });
});
