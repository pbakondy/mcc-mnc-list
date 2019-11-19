# mcc-mnc-list

[![npm](https://img.shields.io/npm/v/mcc-mnc-list.svg)](https://www.npmjs.com/package/mcc-mnc-list)

### List of MCC and MNC codes from up-to-date Wikipedia page

Source: https://en.wikipedia.org/wiki/Mobile_country_code

## Definition

The ITU-T Recommendation E.212 defines mobile country codes as well as mobile network codes. The mobile country code consists of 3 decimal digits and the mobile network code consists of 2 or 3 decimal digits (for example: MNC of 001 is not the same as MNC of 01). The first digit of the mobile country code identifies the geographic region as follows (the digits 1 and 8 are not used):

- `0` - Test networks
- `2` - Europe
- `3` - North America and the Caribbean
- `4` - Asia and the Middle East
- `5` - Oceania
- `6` - Africa
- `7` - South and Central America
- `9` - World-wide (Satellite, Air - aboard aircraft, Maritime - aboard ships, Antarctica)

A mobile country code (MCC) is used in combination with a mobile network code (MNC) (also known as a "MCC / MNC tuple") to uniquely identify a mobile network operator (carrier) using the GSM (including GSM-R), UMTS, and LTE public land mobile networks. (*source: Wikipedia*)

## Install

```
$ npm install mcc-mnc-list
```

## Data

### `mcc-mnc-list.json`

This file contains all the records fetched from the Wikipedia page.

Structure of a single record:

```js
{
  "type": <String> - 'Test' / 'National' / 'International'
  "countryName": <String> - country name
  "countryCode": <String> - ISO 3166-1 country code
  "mcc": <String> - mobile country code
  "mnc": <String> - mobile network code
  "brand": <String|null>
  "operator": <String|null>
  "status": <String> - status code ( see status-codes.json )
  "bands": <String|null>
  "notes": <String|null>
}
```


### `status-codes.json`

List ( `Array` ) of all the different Status Codes from MCC/MNC list.



## Usage

## `.all()` : Array

Returns the full record list

## `.statusCodes()` : Array

Returns the status code list

## `.filter(filters)` : Array

Returns a filtered record list. `filters` is an object.

```js
// get all the Operational mobile networks
let filters = { statusCode: 'Operational' }

// get all the records from Hungary
let filters = { mcc: '216' }

// get a specific network item ( specified with two keys )
let filters = { mcc: '216', mnc: '30' }

// get a specific network item ( specified with a joined key )
let filters = { mccmnc: '21630' }

// get all the Operational mobile networks from Hungary
let filters = { statusCode: 'Operational', mcc: '216' }

// get all the Operational mobile networks from US countryCode
let filters = { statusCode: 'Operational', countryCode: 'US' }

// get all the records
let filters = {}
```

## `.find(filters)` : Record | undefined

Returns the value of the first record in the array that satisfies the provided filters. Otherwise ``undefined`` is returned.
Filters are identical to the filters described in ``.filter(filters)``.


## Example

```js

const mcc_mnc_list = require('mcc-mnc-list');

let records = mcc_mnc_list.all();
let statusCodes = mcc_mnc_list.statusCodes();

console.log(records.length);
// 2189

console.log(statusCodes.length);
// 12

console.log(mcc_mnc_list.filter({ mccmnc: '21630' }));
// [{
//   "type": "National",
//   "countryName": "Hungary",
//   "countryCode": "HU",
//   "mcc": "216",
//   "mnc": "30",
//   "brand": "T-Mobile",
//   "operator": "Magyar Telekom Plc",
//   "status": "Operational",
//   "bands": "GSM 900 / GSM 1800 / UMTS 2100 / LTE 800 / LTE 1800 / LTE 2600",
//   "notes": "Former WESTEL, Westel 900; MNC has the same numerical value as the area code"
// }]
```

## License

**mcc-mnc-list** is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.
