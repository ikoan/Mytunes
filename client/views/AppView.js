// AppView.js - Defines a backbone view class for the whole music app.
/*
  called inside of index.html ---> var appView = new AppView({model: app});
  app refers to AppModel ---> var app = new AppModel({library: library}); 
  thus, AppView can reach into AppModel and get values from it  
*/
var AppView = Backbone.View.extend({
  /*most initilize functions do not have any arguments. In this case, we need it because
  below, new PlayerView({model: this.model...}); Backbone knows what model is.
  */
  initialize: function(params){
    //calls PlayerView and sets a new model property to AppModel's currentSong
    this.playerView = new PlayerView({model: this.model.get('currentSong')});

    console.log(this.playerView);
    //when {collection: ... } is passed in, model gains a collection (ie. model.collection);
    //calls LibraryView and sets a new collection property to AppModel's library
    this.libraryView = new LibraryView({collection: this.model.get('library')});

    console.log(this.libraryView);

    //calls SongQueueView and sets another collection property to AppModel's songQueue?
    this.queueView = new SongQueueView({collection: this.model.get('songQueue')});

    console.log(this.queueView);

    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(model.get('currentSong'));
    }, this);
  },

  //renders the Dom nodes
  render: function(){
    return this.$el.html([
      this.playerView.$el,
      this.libraryView.$el,
      this.queueView.$el
    ]);
  }

});
