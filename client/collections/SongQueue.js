// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('add', function(){
      if(this.length < 2){
          this.playFirst();
        }
      });
    this.on('remove' , this.playFirst);
    this.on('dequeue',this.dequeue);

  },

  dequeue:function(){  
    this.shift();
  },

  playFirst: function(){
    if(this.length > 0){
    this.at(0).play();
    }
  }

 });



