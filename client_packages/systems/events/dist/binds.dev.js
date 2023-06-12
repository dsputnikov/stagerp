"use strict";

mp.events.add('Binds_bindE::CLIENT', function (c, name) {
  mp.keys.bind(0x45, true, function bind() {
    if (c) {
      mp.events.call(name);
    } else {
      mp.events.callRemote(name);
    }

    mp.keys.unbind(0x45, true);
  });
});
mp.events.add('Binds_unbindE::CLIENT', function () {
  mp.keys.unbind(0x45, true);
});