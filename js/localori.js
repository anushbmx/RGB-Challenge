window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalStorageManager() {

  this.highScore     = "highScore";
  this.gameInstrKey     = "instrState";

  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
}

LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";
  var storage = window.localStorage;

  try {
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};


// Instruction Status
LocalStorageManager.prototype.getGameInstrKey = function () {
  return this.storage.getItem(this.gameInstrKey) || 0;
};

LocalStorageManager.prototype.setGameInstrKey = function () {
  this.storage.setItem(this.gameInstrKey, 1);
};


// Game state getters/setters and clearing
LocalStorageManager.prototype.getHighScore = function () {
   return this.storage.getItem(this.highScore) || 0;
};

LocalStorageManager.prototype.setHighScore = function (Score) {
  this.storage.setItem(this.highScore, Score);
};

LocalStorageManager.prototype.clearHighScore = function () {
  this.storage.setItem(this.highScore, 0);
};
