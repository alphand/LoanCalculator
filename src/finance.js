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

const finance = {
  ROUND,
  PMT,
  FV,
  IPMT,
};

export default finance;
