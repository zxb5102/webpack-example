var path = require('path');
var glob = require('glob');
function getEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        // pathname = path.join(dirname, basename);
        // pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[basename] = "./" + entry;
    }
    return entries;
}
var obj = getEntry('src/*.js');
for( key in obj){
    console.log(key);
}