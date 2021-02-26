const express = require('express');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');
router.use(cors());

let numbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

// loop through numbers array to pull in all 10 files
numbers.forEach(count => {
  router.get('/', (req, res) => {
    console.log('pulling in zipcodes');
    axios({
      method: 'GET',
      url: `https://journeyblobstorage.blob.core.windows.net/sabpublic/Group${count}.csv`,
    }).then(response => {
      let zipcodes = response.data;

      // split csv into individual lines
      let lines = zipcodes.split("\n");
      let result = [];

      // separate first line into header columns
      let headers = lines[0].split(",");

      // loop through each line and split out into columns
      for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(",");

        // loop through each header column 
        // and if header column index matches line index
        // push into object
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }

      // reduce result object down to only zipcodes
      let zipcodeArr = [];
      result.forEach(el => {
        onlyZipcodes = el[Object.keys(el)[7]];
        zipcodeArr.push(onlyZipcodes);
      });

      // create a filtered arry showing only unique zipcodes and sort lowest to highest
      let filteredZipcodes = zipcodeArr.filter(function (item, pos) {
        return zipcodeArr.indexOf(item) == pos;
      });
      filteredZipcodes.sort(function (a, b) { return a - b });

      // loop through filteredZipcodes 
      // and count the number instances it occurs in zipcodeArr
      let addressesInZipcode = [];
      filteredZipcodes.forEach(el => {
        let numOfAddresses = zipcodeArr.filter(item => item === el);
        number = numOfAddresses.length;
        addressesInZipcode.push({ zipcode: el, numOfAddresses: number });
      })
      res.send(addressesInZipcode)
    }).catch(err => {
      console.log(err);
      res.sendStatus('got an error', 500);
    });
  })
})
module.exports = router;