
'use strict';

const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');

const WIKI_URL = 'https://en.wikipedia.org/wiki/Mobile_country_code';
const MCC_MNC_OUTPUT_FILE = path.join( __dirname, 'mcc-mnc-list.json');
const STATUS_CODES_OUTPUT_FILE = path.join( __dirname, 'status-codes.json');

function fetch () {
  jsdom.env({
    url: WIKI_URL,
    done: function (err, window) {
      if (err) throw err;
      var content = window.document.querySelector('#mw-content-text');

      if (!content.hasChildNodes()) {
        console.log('ERROR - empty content');
        return;
      }

      content = removeCiteReferences(content);

      const children = content.childNodes;
      let recordType, sectionName, countryName = null, countryCode = null;
      let records = [];
      let statusCodes = [];

      nodeList: for (let i = 0; i < children.length; i++) {
        let node = children[i];

        if (!node.textContent.trim().length) {
          // skip empty lines
          continue;
        }

        if (node.nodeName === 'H2' || node.nodeName === 'H3' || node.nodeName === 'H4') {
          recordType = 'other';
          sectionName = node.querySelector('.mw-headline').textContent.trim();

          if (sectionName === 'See also' || sectionName === 'External links') {
            break nodeList;
          }

          if (sectionName === 'National operators') {
            continue;
          }

          if (sectionName.length === 1) {
            continue;
          }

          if (sectionName === 'Test networks') {
            countryName = null;
            countryCode = null;
            recordType = 'Test';
          }

          if (sectionName.indexOf(' - ') !== -1) {
            let sectionParts = sectionName.split(' - ');
            countryName = sectionParts[0];
            countryCode = sectionParts[1];
            recordType = 'National';
          }

          if (sectionName === 'International operators') {
            countryName = null;
            countryCode = null;
            recordType = 'International';
          }

          if (recordType === 'other') {
            console.log('WARN recordType is other', node.textContent);
          }
        }

        if (node.nodeName === 'TABLE') {
          let rows = node.querySelectorAll('tr');

          for (let j = 1; j < rows.length; j++) {
            let cols = rows[j].querySelectorAll('td');

            if (cols.length < 7) {
              console.log('WARN invalid table row:', rows[j], node.textContent);
              continue;
            }

            let status = cleanup(cols[4].textContent);

            if ( status && statusCodes.indexOf( status ) === -1 ) {
              statusCodes.push( status );
            }

            records.push({
              type: recordType,
              countryName: countryName,
              countryCode: countryCode,
              mcc: cleanup(cols[0].textContent),
              mnc: cleanup(cols[1].textContent),
              brand: cleanup(cols[2].textContent),
              operator: cleanup(cols[3].textContent),
              status: status,
              bands: cleanup(cols[5].textContent),
              notes: cleanup(cols[6].textContent)
            })

          }
        }
      }

      fs.writeFile( MCC_MNC_OUTPUT_FILE, JSON.stringify( records, null, 2 ), err => {
        if ( err ) {
          throw err;
        }
        console.log( 'MCC-MNC list saved to ' + MCC_MNC_OUTPUT_FILE );
        console.log( 'Total ' + records.length + ' records' );
      });

      statusCodes.sort();

      fs.writeFile( STATUS_CODES_OUTPUT_FILE, JSON.stringify( statusCodes, null, 2 ), err => {
        if ( err ) {
          throw err;
        }
        console.log( 'Status codes saved to ' + STATUS_CODES_OUTPUT_FILE );
      });

    }
  });
}

function removeCiteReferences(nodes) {
  let links = nodes.querySelectorAll('a');
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    let href = link.getAttribute('href');
    if (href.substr(0, 10) === '#cite_note') {
      link.remove();
    }
  }

  return nodes;
}

function cleanup(str) {
  str = str.trim();
  str = removeCitationNeeded(str);
  if (str.substr(0, 1) === '[' && str.substr(-1) === ']') {
    // remove brackets-only like [7]
    str = '';
  }
  return str.length ? str : null;
}

function removeCitationNeeded(str) {
  return str.replace(/\[citation needed\]/g, '');
}

fetch();
