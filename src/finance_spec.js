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

    it('should calculate 1st 120k 1yr 5% to -500', () => {
      const ipmt2 = Finance.IPMT(0.05 / 12, 1, 12, 120000, 0, 0);
      const ipmt2Rounded = Finance.ROUND(ipmt2, 2);
      expect(ipmt2Rounded).toBe(-500);
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
      const summary = Finance.AMORTIZE(rate, nper, pv, fv, type);
      const firstSched = summary.schedule[0];
      const lastSched = summary.schedule[nper - 1];
      expect(summary.schedule.length).toBe(nper);

      expect(firstSched.interest).toBe(962.50);

      expect(summary.summary.totalPrincipal).toBe(pv);
      expect(summary.summary.totalInterest).toBe(230190);
      expect(summary.summary.totalPayment).toBe(395190);
      expect(lastSched.balance).toBe(0);
    });
  });
});
