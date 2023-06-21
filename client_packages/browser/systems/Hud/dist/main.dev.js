"use strict";

var HUD = new Vue({
  el: '#HUD_main',
  data: {
    active: false,
    server: {
      online: 99,
      login: 'daun',
      time: '1',
      date: ''
    },
    money: 52,
    bank: 1222222,
    tweenedNumber: 0,
    //
    notify: {
      notifys: [],
      error_color: '#F63E16',
      succes_color: '#68CA00',
      info_color: 'linear-gradient(89.96deg, #FFE600 0.04%, rgba(201, 181, 0, 0.05) 99.5%)'
    },
    locationPosition: {
      top: 500,
      left: 130,
      location: '',
      zone: ''
    },
    hints: [{
      key: 'F7',
      text: 'Скрыть худ'
    }, {
      key: 'F2',
      text: 'Показать/Скрыть курсор'
    }, {
      key: 'I',
      text: 'Инвентарь'
    }, {
      key: 'N',
      text: 'Голосовой чат'
    }],
    usebutton: {
      active: false,
      button: 'E',
      text: 'Используйте для взаимодействия'
    },
    greenzone: {
      active: false
    },
    redzone: {
      active: false
    }
  },
  methods: {
    updateTime: function updateTime() {
      var data = new Date();
      var hour = data.getUTCHours() + 3;
      var minute = data.getMinutes();
      if (hour < 10) hour = "0" + hour;
      if (minute < 10) minute = "0" + minute;
      this.server.time = "".concat(hour, ":").concat(minute);
    },
    updateDate: function updateDate() {
      var data = new Date();
      var day = data.getDate();
      var month = data.getMonth() + 1;
      var year = data.getUTCFullYear();
      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;
      this.server.date = "".concat(day, ".").concat(month, ".").concat(year);
    },
    addNotify: function addNotify(type, text, time) {
      var $this = this;

      if (type == 1) {
        this.notify.notifys.push({
          type: 1,
          top: 'Успешно',
          color: this.notify.succes_color,
          text: text
        });
      } else if (type == 2) {
        this.notify.notifys.push({
          type: 2,
          top: 'Ошибка',
          color: this.notify.error_color,
          text: text
        });
      } else if (type == 3) {
        this.notify.notifys.push({
          type: 2,
          top: 'Информация',
          color: this.notify.info_color,
          text: text
        });
      } // Удаление


      setTimeout(function () {
        $this.notify.notifys.pop();
      }, time);
    }
  },
  mounted: function mounted() {
    setInterval(this.updateTime, 1000);
    this.updateDate(); // this.usebutton.active = true;
  },
  computed: {
    animatedNumber: function animatedNumber() {
      return this.tweenedNumber.toFixed(0);
    }
  },
  watch: {
    money: function money(newValue) {
      gsap.to(this.$data, {
        duration: 3,
        tweenedNumber: newValue
      });
    }
  }
});
mp.events.add('HUD_updateLocation::CEF', function (top, left, location, zone) {
  HUD.locationPosition.top = top;
  HUD.locationPosition.left = left;
  HUD.locationPosition.location = location;
  HUD.locationPosition.zone = zone;
});
mp.events.add('HUD_addNotification::CEF', function (type, text, time) {
  HUD.addNotify(type, text, time);
});