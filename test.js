import test from 'ava';

const mcc_mnc_list = require('./index');

test( 'all()', t => {
  t.is( typeof mcc_mnc_list.all, 'function' );
  t.truthy( Array.isArray( mcc_mnc_list.all() ) );
  t.truthy( mcc_mnc_list.all().length > 0 );
} );

test( 'statusCodes()', t => {
  t.is( typeof mcc_mnc_list.statusCodes, 'function' );
  t.truthy( Array.isArray( mcc_mnc_list.statusCodes() ) );
  t.truthy( mcc_mnc_list.statusCodes().length > 0 );
} );

test( 'filter()', t => {
  t.is( typeof mcc_mnc_list.filter, 'function' );
  t.truthy( Array.isArray( mcc_mnc_list.filter() ) );
  t.truthy( mcc_mnc_list.filter().length > 0 );
  t.truthy( mcc_mnc_list.filter({}).length > 0 );
} );

test( 'filter() not object parameter exceptions', t => {
  t.throws( function () { return mcc_mnc_list.filter(1); } );
  t.throws( function () { return mcc_mnc_list.filter(''); } );
} );

test( 'filter() statuc code', t => {
  t.truthy( Array.isArray( mcc_mnc_list.filter({ statusCode: 'Operational' }) ) );
  t.throws( function () { return mcc_mnc_list.filter({ statusCode: 'NotExistentStatusCode' }); } );
} );

test( 'filter() mcc', t => {
  t.truthy( Array.isArray( mcc_mnc_list.filter({ mcc: '216' }) ) );
  t.truthy( Array.isArray( mcc_mnc_list.filter({ mcc: 216 }) ) );
  t.throws( function () { return mcc_mnc_list.filter({ mcc: {} }); } );
} );

test( 'filter() mnc', t => {
  t.truthy( Array.isArray( mcc_mnc_list.filter({ mnc: '30' }) ) );
  t.truthy( Array.isArray( mcc_mnc_list.filter({ mnc: 30 }) ) );
  t.throws( function () { return mcc_mnc_list.filter({ mnc: {} }); } );
} );

test( 'filter() mccmnc', t => {
  t.truthy( Array.isArray( mcc_mnc_list.filter({ mccmnc: '21630' }) ) );
  t.truthy( Array.isArray( mcc_mnc_list.filter({ mccmnc: 21630 }) ) );
  t.throws( function () { return mcc_mnc_list.filter({ mccmnc: {} }); } );
  t.throws( function () { return mcc_mnc_list.filter({ mccmnc: '21630', mcc: '216' }); } );
  t.throws( function () { return mcc_mnc_list.filter({ mccmnc: '21630', mnc: '30' }); } );
} );

test( 'filter() mcc, mnc', t => {
  t.truthy( Array.isArray( mcc_mnc_list.filter({ mcc: '216', mnc: '30' }) ) );
  t.truthy( Array.isArray( mcc_mnc_list.filter({ mcc: 216, mnc: 30 }) ) );
  t.truthy( mcc_mnc_list.filter({ mcc: '216', mnc: '30' }).length === 1 );
} );
