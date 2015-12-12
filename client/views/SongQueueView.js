// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "table",

  initialize: function() {
    //listener on song queue song collection for any adds
    this.collection.on('add', function(){
      //when trigger is heard, render the element
      this.render();
    }, this);
    //listener on song queue song collection for any removals
    this.collection.on('remove', function(){
      //when trigger is heard, render the element
      this.render();
    }, this);
  },

  render: function() {
    // return this.$el;
    this.$el.children().detach();

    this.$el.html('<th>Queue</th>').append(
      this.collection.map(function(song){
        //call SongQueueEntryView when event listener executes
        return new SongQueueEntryView({model: song}).render();
      })
    );
  }
});
