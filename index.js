'use strict';

const records = require( './mcc-mnc-list.json' );
const statusCodeList = require( './status-codes.json' );

function all () {
  return records;
}

function statusCodes () {
  return statusCodeList;
}

function filter ( filters ) {
  if (filters === undefined || filters === null) {
    return records;
  }

  if (typeof filters !== 'object') {
    throw new TypeError('Invalid parameter (object expected)');
  }

  let statusCode, mcc, mnc, countryCode;

  if (filters.statusCode) {
    statusCode = filters.statusCode;
    if (statusCodeList.indexOf(statusCode) === -1) {
      throw new TypeError('Invalid statusCode parameter (not found in statusCode list)');
    }
  }

  if (filters.mccmnc) {
    let mccmnc;
    if (typeof filters.mccmnc === 'string' || typeof filters.mccmnc === 'number') {
      mccmnc = String(filters.mccmnc);
    } else {
      throw new TypeError('Invalid mccmnc parameter (string expected)');
    }
    mcc = mccmnc.substr(0, 3);
    mnc = mccmnc.substr(3);
  }

  if (filters.mcc && mcc) {
    throw new TypeError('Don\'t use mccmnc and mcc parameter at once');
  }
  if (filters.mnc && mnc) {
    throw new TypeError('Don\'t use mccmnc and mnc parameter at once');
  }

  if (filters.mcc) {
    if (typeof filters.mcc === 'string' || typeof filters.mcc === 'number') {
      mcc = String(filters.mcc);
    } else {
      throw new TypeError('Invalid mcc parameter (string expected)');
    }
  }

  if (filters.mnc) {
    if (typeof filters.mnc === 'string' || typeof filters.mnc === 'number') {
      mnc = String(filters.mnc);
    } else {
      throw new TypeError('Invalid mnc parameter (string expected)');
    }
  }

  if (filters.countryCode != undefined) {
    if (typeof filters.countryCode === 'string') {
      countryCode = filters.countryCode;
    } else {
      throw new TypeError('Invalid countryCode parameter (string expected)');
    }
  }

  let result = records;

  if (statusCode) {
    result = result.filter( record => record['status'] === statusCode );
  }
  if (countryCode) {
    result = result.filter( record => record['countryCode'] === countryCode );
  }
  if (mcc) {
    result = result.filter( record => record['mcc'] === mcc );
  }
  if (mnc) {
    result = result.filter( record => record['mnc'] === mnc );
  }

  return result;
}

function find (filters) {
  // return the first element of undefined, as filter will always return an array
  return filter(filters)[0]
}

module.exports = { all, statusCodes, filter, find };
