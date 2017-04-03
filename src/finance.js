/* eslint-disable no-mixed-operators */
const ROUND = (val, precision) => {
  const factor = 10 ** precision;
  const tempNumber = val * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
};

const PMT = (rate, nper, pv, fv, type) => {
  let pmt = rate / (((1 + rate) ** nper) - 1) *
    -(pv * ((1 + rate) ** nper) + fv);

  if (type === 1) pmt /= (1 + rate);
  return pmt;
};

const FV = (rate, payidx, c, pv, type) => {
  if (type === 1) {
    c = c * (1 + rate); // eslint-disable-line
  }

  return -(c * (((1 + rate) ** payidx) - 1) / rate + pv * ((1 + rate) ** payidx));
};

const IPMT = (rate, payidx, nper, pv, fv, type) => {
  const pmt = PMT(rate, nper, pv, fv, type);
  let ipmt = FV(rate, payidx - 1, pmt, pv, type) * rate;
  if (type === 1) ipmt /= (1 + rate);
  return ipmt;
};

const PPMT = (rate, payidx, nper, pv, fv, type) => PMT(rate, nper, pv, fv, type) -
  IPMT(rate, payidx, nper, pv, fv, type);


const AMORTIZE = (rate, nper, pv, fv, type) => {
  const pmt = PMT(rate, nper, pv, fv, type);
  const schedule = [];

  for (let i = 0; i < nper; i++) { // eslint-disable-line no-plusplus
    const interest = ROUND(-(IPMT(rate, i, nper, pv, fv, type)), 2);
    const principal = ROUND(-(PPMT(rate, i, nper, pv, fv, type)), 2);
    const balance = ROUND(-(FV(rate, i + 1, pmt, pv, type)), 2);
    const schedObj = {
      interest,
      principal,
      balance,
    };
    schedule.push(schedObj);
  }

  return schedule;
};

const finance = {
  ROUND,
  PMT,
  FV,
  IPMT,
  PPMT,
  AMORTIZE,
};

export default finance;
