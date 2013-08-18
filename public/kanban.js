$(function () {

//Model

var Story = Backbone.Model.extend({

  //Status
  // 0 = Backlog
  // 1 = Current
  // 2 = Started
  // 3 = Complete

  defaults: {
    'title': 'This is the title',
    'description': 'Description',
    'points': 0,
    'status' : 0
  },

  url: '/'

});

//Collection

var Stories = Backbone.Collection.extend({

  model: Story,

  url: '/'

});

//Story View

var StoryView = Backbone.View.extend({

  model: Story,

  template: _.template($('#story-template').html()),

  el: "<div class='story' />",

  render: function() {

    var storyAttributes = this.model.toJSON();

    this.$el.html(this.template(storyAttributes));

    return this;

  }

});

//Base View

var BaseView = Backbone.View.extend({

  el: $('#container'),

  template: _.template($('#story-list-template').html()),

  stories: new Stories(),

  events: {

    'click .inner': 'onClickInner'

  },

  initialize: function () {

    this.listenTo(this.stories, 'add', this.render);

  },

  onClickInner: function() {

    this.options.x++;

    this.addStory();

  },

  addStory: function() {

    this.story = new Story();

    this.story.set({

      title: 'This is my collection test ' + this.options.x,

      description: 'this is the description',

      status: Math.floor((Math.random()*4)),

      points: Math.floor((Math.random()*10)+1)

    })

    this.stories.add(this.story);

    this.story.on('change', this.renderStory(this.story), this);

  },

  renderStory: function (model) {

    var storyView = new StoryView({model: model});

    var currentStatus = model.get('status');

    var column = this.$('#col-0');

    switch (currentStatus) {

      case 0:
        column = this.$('#col-0');
        break;
      case 1:
        column = this.$('#col-1');
        break;
      case 2:
        column = this.$('#col-1');
        break;
      case 3:
        column = this.$('#col-2');
        break;

    }

    column.prepend(storyView.render().el);

  },

  render: function() {

  }

})

//Initialize App

  var app = new BaseView({

    'x' : 0

  });

});


