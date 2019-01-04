var fs = require('fs');
var path = require('path');
var events = require('events');
var slackbot = require('./slackbot');

var ROOT_DIST_FOLDER = '/dist/v2/';
var MARKETS = ['nenb-no', 'necbe-nl', 'necbe-fr', 'necnl'];
var SMART_SEARCH_WIDGET_ROOT_PATH = 'dist/ssw/';
var STATS_FILE = 'stats.json';
var ASSETS_FILE = 'cachebuster.json';
var JENKINS_MASTER_FOLDER = '/home/jenkins/workspace/_smart-search-widget_master';
var IS_MASTER_BUILD = __dirname.indexOf(JENKINS_MASTER_FOLDER) !== -1;
var DIST_FOLDERS = MARKETS.map(market => ROOT_DIST_FOLDER + market + '/');

var processedMarkets = [];
var mergedAssetInfo = {};
var eventEmitter = new events.EventEmitter();

var processedMarketHandler = (file) => {
  processedMarkets.push(file);
  if (processedMarkets.length === MARKETS.length) {
    setTimeout(() => {
      processedMarkets = [];
      mergeMarketBundles();
    }, 1000);
  }
};

var saveMergedAssetFileHandler = (market) => {
  processedMarkets.push(market);
  if (processedMarkets.length === MARKETS.length) {
    saveMergedMarketBundles();
  }
};

eventEmitter.on('processed', processedMarketHandler);
eventEmitter.on('save', saveMergedAssetFileHandler);

DIST_FOLDERS.forEach(currentFolder => {
  if (fs.existsSync(path.join(__dirname, currentFolder, STATS_FILE))) {
    console.log(path.join(__dirname, currentFolder, STATS_FILE));
    fs.readFile(path.join(__dirname, currentFolder, STATS_FILE), 'UTF-8', function (err, jsonFile) {
      if (err) throw err;

      var newJson = {};
      var jsonContent = JSON.parse(jsonFile);
      var baseURL = jsonContent.publicPath;

      if (jsonContent.assetsByChunkName) {
        newJson.main = baseURL + prepareBundle(jsonContent.assetsByChunkName.main, currentFolder);
        newJson.polyfills = baseURL + prepareBundle(jsonContent.assetsByChunkName.polyfills, currentFolder);
        newJson.styles = baseURL + prepareBundle(jsonContent.assetsByChunkName.styles, currentFolder);
        newJson.inline = baseURL + prepareBundle(jsonContent.assetsByChunkName.runtime, currentFolder, "inline");
      }

      fs.writeFile(path.join(__dirname, currentFolder, ASSETS_FILE), JSON.stringify(newJson, null, '  '), function (err) {
        if (err) throw err;

        console.log('Created file: "' + ASSETS_FILE + '" on ' + currentFolder + ' folder');
        eventEmitter.emit('processed', currentFolder + ASSETS_FILE);

        if (IS_MASTER_BUILD) {
          slackbot.send(':heavy_check_mark: ' + ASSETS_FILE + ' created successfully on ' + currentFolder, newJson);
        }
      });

    });
  } else {
    console.log('Warning! ' + STATS_FILE + ' does not exist on ' + path.join(__dirname, currentFolder));
    eventEmitter.emit('processed', currentFolder);
  }

});

var mergeMarketBundles = () => {
  var contJson;
  MARKETS.forEach(market => {
    var localAssetFile = path.join(__dirname, ROOT_DIST_FOLDER + market + '/', ASSETS_FILE);
    if (fs.existsSync(localAssetFile)) {
      fs.readFile(localAssetFile, 'UTF-8', function (err, jsonFile) {
        if (err) throw err;

        contJson = JSON.parse(jsonFile);
        Object.keys(contJson).forEach((key) => {
          mergedAssetInfo[SMART_SEARCH_WIDGET_ROOT_PATH + market +'/'+ key] = contJson[key];
        });
        eventEmitter.emit('save', market);
      });
    }
    else {
      console.log('Warning! The asset file for "' + market + '" does not exist.');
      eventEmitter.emit('save', market);
    }
  });
};

var saveMergedMarketBundles = () => {
  fs.writeFile(path.join(__dirname, ROOT_DIST_FOLDER, ASSETS_FILE), JSON.stringify(mergedAssetInfo, null, '  '), function (err) {
    if (err) throw err;
    console.log('Created merged file: "' + ASSETS_FILE + '" on ' + ROOT_DIST_FOLDER + ' folder');
  });
};

var prepareBundle = (fileName, distFolder, newName) => {
  const [ name, hash, ext ] = fileName.split('.');

  const result = [newName || name, hash, 'bundle', ext].join('.');

  fs.renameSync(
    path.join(__dirname, distFolder, fileName),
    path.join(__dirname, distFolder, result)
  );

  return result;
};
