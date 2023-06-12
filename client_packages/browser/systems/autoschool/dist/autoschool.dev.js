"use strict";

var Autoschool = new Vue({
  el: '#autoschool',
  data: {
    active: false
  },
  methods: {
    examA: function examA() {
      mp.trigger('House_buyHouse::CLIENT');
    },
    examB: function examB() {
      mp.trigger('House_openHouse::CLIENT');
      this.ifLocked = 1;
    },
    examC: function examC() {
      mp.trigger('House_openHouse::CLIENT');
      this.ifLocked = 1;
    },
    examD: function examD() {
      mp.trigger('House_openHouse::CLIENT');
      this.ifLocked = 1;
    }
  },
  mounted: function mounted() {
    var _this = this;

    mp.events.add('Autoschool_showWindow::CEF', function (type, bool) {
      _this.active = bool;

      if (type == 1) {
        _this.activeMain = bool;
      }

      if (type == 2) {
        _this.acitveExits = bool;
      }
    });
  }
});