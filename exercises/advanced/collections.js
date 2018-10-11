/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var fs = require('fs');
var Promise = require('bluebird');
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise(function(fullfill, reject) {
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        fullfill(data.split('\n')[0]);
      }
    });
  });
};
var writeFileAsync = Promise.promisify(fs.writeFile);

var readFile = function(filePath) {
  return pluckFirstLineFromFileAsync(filePath);
};
var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  // TODO
  var arr = [];
  for (var i = 0; i < filePaths.length; i++) {
    arr.push(readFile(filePaths[i]));
  }
  return Promise.all(arr).then(function(success) {
    var str = '';
    for (var i = 0; i < success.length; i++) {
      if (i === success.length - 1) {
        str += success[i];
      } else {
        str += success[i] + '\n';
      }
    }
    return writeFileAsync(writePath, str);
  });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};
