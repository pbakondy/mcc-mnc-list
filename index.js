#!/usr/bin/env node

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

  let statusCode, mcc, mnc, countryName, brand;

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

    if (filters.countryName) {
        if (typeof filters.countryName === 'string' || typeof filters.countryName === 'number') {
            countryName = String(filters.countryName);
        } else {
            throw new TypeError('Invalid country name parameter (string expected)');
        }
    }

    if (filters.brand) {
        if (typeof filters.brand === 'string' || typeof filters.brand === 'number') {
            brand = String(filters.brand);
        } else {
            throw new TypeError('Invalid brand parameter (string expected)');
        }
    }

  if (filters.mnc) {
    if (typeof filters.mnc === 'string' || typeof filters.mnc === 'number') {
      mnc = String(filters.mnc);
    } else {
      throw new TypeError('Invalid mnc parameter (string expected)');
    }
  }

  let result = records;

  if (statusCode) {
    result = result.filter( record => record['status'] === statusCode );
  }
  if (mcc) {
    result = result.filter( record => record['mcc'] === mcc );
  }
  if (mnc) {
    result = result.filter( record => record['mnc'] === mnc );
  }
  if (countryName) {
        result = result.filter( record => record['countryName'] === countryName );
  }
  if (brand) {
        result = result.filter( record => record['brand'] === brand );
  }

  return result;
}

module.exports = { all, statusCodes, filter };
