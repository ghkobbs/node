var _ = require("underscore");

//Node require function always assumes the
//passed parameter is a:
// Core module
// File or Folder
// node_modules

var  result = _.contains([1,2,3], 4);

console.log(result);