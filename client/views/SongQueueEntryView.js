// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
var SongQueueEntryView = Backbone.View.extend({
   //contents of template rendered in tr tag, which is the container
  tagName: 'tr',

  template: _.template('<td>(<%= artist %>)</td><td><%= title %></td>'),

  events: {
    'click': function() {
      /*when song is clicked in the queue's rendered view, dequeue
      the listener is on the songQueue, in the AppModel.js
      */
      this.model.dequeue();
    }
  },

  render: function(){
    //$el represents the container 'tr', a jQuery wrapped 'tr' element
    /*Example : In the BackBone lecture @15:04, formView.el refersto <div></div>
      but formView.$el refers to [<div></div>], a Jquery container object that contains
      that 1 Dom node. This allows Jquery functions like .html() to work on the el.
      formView.$el.html('hello world') creates [<div>hello world</div>].
    */
     return this.$el.html(this.template(this.model.attributes));
  }
});
