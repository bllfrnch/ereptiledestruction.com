require('picturefill');
require('../scss/index.scss');

document.addEventListener('DOMContentLoaded', function() {
  var contact = document.querySelector('.section-contact');
  var container = contact.querySelector('span.ea');

  var h = 'hello'.split();
  var fuckoff = '\x40';
  var d ='ereptiledestruction.com'.split();
  var ea = h.join() + fuckoff + d.join();

  container.append(ea);
});
