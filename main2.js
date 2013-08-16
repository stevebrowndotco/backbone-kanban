$(function () {

//Model

var Person = Backbone.Model.extend({
  validate: function(attributes) {

    if(isNaN(attributes.address.zipCode)) return "Address ZIP code must be a number!";
  },

  defaults: {
    'name': 'John Doe',
    'address': {
      'street': '21 Rodney Road',
      'city': 'Walton on Thames',
      'state': 'Surrey',
      'zipCode': 'KT12 3LE'
    }
  },

  url: '/'
});


//Collection

var People = Backbone.Collection.extend({

  model: Person

})

//View

var BaseView = Backbone.View.extend({

  el: $('#container'),

  template: null,

  events: {
    'click .inner': 'onClickInner'
  },

  onClickInner: function() {


    this.render();

  },

  initialize: function () {

    this.collection = new People();

    var self = this;

  },

  render: function(){

    this.collection.each(function(i){
      console.log(i.attributes.name, i.attributes.address);
    })

  }

})

//Initialize App

  var app = new BaseView();

})


