"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isBetterCursorEnabled = true;
var cursorTickTime = 500;

var Browser = function Browser(name, path, cursor) {
  _classCallCheck(this, Browser);

  this.browserName = name;
  this.browserPath = path;
  this.cursorForce = cursor;
  this.rageBrowser = null;
}; // helper:


Browser.allInstances = [];

function getBrowserWithName(browserName, array) {
  if (browserName == null) return;
  var result = array.filter(function (o) {
    return o.browserName == browserName;
  });
  return result ? result[0] : null; // or undefined
}

function existsBrowserNameInArray(browserName, array) {
  if (array.some(function (item) {
    return item.browserName === browserName;
  })) {
    return true;
  } else {
    return false;
  }
}

function removeBrowserFromArray(array, browser) {
  var i = 0;

  while (i < array.length) {
    if (array[i] === browser) {
      array.splice(i, 1);
    } else {
      ++i;
    }
  }

  return array;
} // Game:


mp.game.app.createBrowser = function (browserName, browserPath, forceToCursor) {
  if (existsBrowserNameInArray(browserName, Browser.allInstances)) return;
  var browser = new Browser(browserName, browserPath, forceToCursor);
  Browser.allInstances.push(browser);
  browser.rageBrowser = mp.browsers["new"](browserPath);

  if (forceToCursor) {
    mp.gui.cursor.show(true, true);
  }
};

mp.game.app.destroyBrowser = function (browserName) {
  if (!existsBrowserNameInArray(browserName, Browser.allInstances)) return;
  var searchedBrowser = getBrowserWithName(browserName, Browser.allInstances);
  searchedBrowser.rageBrowser.destroy();
  removeBrowserFromArray(Browser.allInstances, searchedBrowser);

  if (!mp.game.app.isAnyCursorForced()) {
    mp.gui.cursor.show(false, false);
  }
};

mp.game.app.browserExists = function (browserName) {
  return existsBrowserNameInArray(browserName, Browser.allInstances);
};

mp.game.app.switchBrowser = function (browserName, newPath, forceToCursor) {
  mp.game.app.destroyBrowser(browserName);
  mp.game.app.createBrowser(browserName, newPath, forceToCursor);
};

mp.game.app.reloadBrowser = function (browserName, ignoreCache) {
  getBrowserWithName(browserName, Browser.allInstances).rageBrowser.reload(ignoreCache);
};

mp.game.app.executeClientFunction = function (browserName, codeToExecute) {
  var browser = getBrowserWithName(browserName, Browser.allInstances);
  if (browser != null) browser.rageBrowser.execute(codeToExecute);
};

mp.game.app.setCursorForced = function (browserName, force) {
  if (!existsBrowserNameInArray(browserName, Browser.allInstances)) return;
  getBrowserWithName(browserName, Browser.allInstances).cursorForce = force;
};

mp.game.app.isCursorForcedInBrowser = function (browserName) {
  if (!existsBrowserNameInArray(browserName, Browser.allInstances)) return;
  return getBrowserWithName(browserName, Browser.allInstances).cursorForce;
};

mp.game.app.isAnyCursorForced = function () {
  var isAnyCursorForced = false;

  for (var index = 0; index < Browser.allInstances.length; index++) {
    var element = Browser.allInstances[index];

    if (element.cursorForce == true) {
      isAnyCursorForced = true;
    }
  }

  return isAnyCursorForced;
};

mp.game.app.getBrowserObject = function (browserName) {
  if (!existsBrowserNameInArray(browserName, Browser.allInstances)) return;
  return getBrowserWithName(browserName, Browser.allInstances);
}; // Cursor Helper


var cursorInterval = setInterval(function () {
  if (!isBetterCursorEnabled) {
    clearInterval(cursorInterval);
    return;
  }

  if (mp.gui.cursor.visible || Browser.allInstances.length <= 0) return;

  if (mp.game.app.isAnyCursorForced() == true) {
    mp.gui.cursor.show(true, true);
  }
}, cursorTickTime);