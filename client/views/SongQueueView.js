// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "table",

  className: "thequeue",

  initialize: function() {
    this.collection.on("add", function(){
      //sets a property on song queue model
     this.collection.playFirst();
     this.render();
    }, this);
  },


  render: function() {
    // return this.$el;

    this.$el.children().detach();

    this.$el.html('<th>Queue</th>').append(
      this.collection.map(function(song){
        return new SongQueueEntryView({model: song}).render();
      })
    );
  
  }


});
