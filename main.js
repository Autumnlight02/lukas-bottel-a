"use strict";
exports.__esModule = true;
var fs = require("fs");
var people = fs.readdirSync('./images');
var dataRows = [];
var _loop_1 = function (i) {
    var curr = people[i];
    var folder = fs
        .readdirSync('./images/' + curr + '/')
        .filter(function (e) { return fs.lstatSync('./images/' + curr + '/' + e).isDirectory(); })[0];
    var files = fs.readdirSync('./images/' + curr + '/' + folder);
    //   console.log(files);
    var dataRow = {
        name: curr,
        slug: curr.toLowerCase(),
        files: files
    };
    dataRows.push(dataRow);
};
for (var i = 0; i < people.length; i++) {
    _loop_1(i);
}
var finalString = "Name,Slug,Collection ID,Item ID,Created On,Updated On,Published On,multiImg1,multiImg2,multiImg3,multiImg4,multiImg5\n";
dataRows.forEach(function (e) {
    var Arrays = [];
    while (e.files.length > 25) {
        Arrays.push(e.files.splice(0, 25));
    }
    //   console.log(Arrays);
    var fireBaseString = 'Firebase';
    var str = fireBaseString;
    Arrays.forEach(function (e) {
        str += e.join(';');
        str += ',';
    });
    str = replaceAll(str, ';', ';' + fireBaseString);
    finalString += "".concat(e.name, ",").concat(e.slug, ",63a6d7659e85367cf4b74203,63a6d76d90b0ca1b34acd3c3,Sat Dec 24 2022 10:41:49 GMT+0000 (Coordinated Universal Time),Sat Dec 24 2022 10:41:49 GMT+0000 (Coordinated Universal Time),,").concat(str, "\n");
});
fs.writeFileSync('./result.csv', finalString, 'utf-8');
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
