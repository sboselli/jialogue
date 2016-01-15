
window.onload = function() {
// define constants
var COLORS = ['Red', 'Green', 'Blue'];
var CARS = ['Audi', 'BMW', 'Tesla', 'Volkswagen'];

// define <p> component
var P = frzr.View.extend({
  el: 'p',
  init: function (data) {
    if (data) this.update(data);
  },
  update: function (data) {
    this.setText(data);
  }
});

// define <option> component
var Option = frzr.View.extend({
  el: 'option',
  update: function (data) {
    // set disabled attr, value attr and text
    this.setAttr('disabled', data.disabled);
    this.setAttr('value', data.value);
    this.setText(data.text);
  }
});

// define <select> component
var Select = frzr.View.extend({
  el: 'select',
  init: function () {
    // create ViewList for options
    this.options = new frzr.ViewList({
      View: Option
    });
    // add 'change' listener
    this.addListener('change', this.change);
    this.addChild(this.options);
  },
  change: function (e) {
    this.trigger('change', this.el.value);
  },
  update: function (data) {
    // when you update <select>, inform all <option>
    this.options.update([{value: '', text: 'Choose:', disabled: true}].concat(data.options));
    // also set value
    this.setAttr('value', data.value);
  }
});

// wrap <body>
var body = new frzr.View({
  el: document.body
});

// create two <select> elements
var select = new Select();
var select2 = new Select();

// add values to first <select>
select.update({
  value: 'cars',
  options: ['Cars', 'Colors'].map(parseOptions)
});

// init second <select> values
changeOptions('cars');

// add selects to the DOM
body.setChildren([select, select2]);

// change values of the second <select> based on the first <select>
function changeOptions (type) {
  select2.update({
  value: '',
  options: (type === 'cars' ? CARS : COLORS).map(parseOptions)
});
}

// notice changes of the first <select>
select.on('change', function (value) {
  changeOptions(value);
  body.addAfter(new P('Choosing ' + value), select2);
});

// notice changes of the second <select>
select2.on('change', function (value) {
  body.addAfter(new P('Changed to ' + value), select2);
});

// just a helper turning values to lowercase
function parseOptions (item) {
  return {
    value: item.toLowerCase(),
    text: item
  }
}

}