// SongQueue.js - Defines a backbone model class for the song queue. 
//SongQueue is a collection not model.

/*
  SongQueue is a subclass(?) created from Songs. I can further extend Songs here 
  with additional properties. Here, 'extend' sets up a prototype chain to Songs. 
  Extend does the work... no need to write a constructor or prototype, etc.

  SongQueue collection is being listened by SongQueueView
  It can contain different methods for each song

*/
var SongQueue = Songs.extend({

  initialize: function(){
    //songQueue will listen to the add event from the AppModel
    //then it will invoke its own enqueue function
    this.on('add', this.enqueue, this);
    //listens to dequeue event from AppModel and will invoke its own dequeue function
    this.on('dequeue', this.dequeue, this);
    this.on('ended', this.playNext, this);

  },

  //when songqeueue's own enqueue function is invoked
  enqueue: function(song){
    //if the song added is the first and only song
    if(this.length === 1){
      //it will play the first song
      this.playFirst();
    }
    //otherwise nothing will happen
  },

  //when songqeueue's own dequeue function is invoked
  dequeue: function(song){
    //if song clicked on is not the first song playing
    if(song !== this.at(0)){
      //the song is removed
      this.remove(song);
    } else {
      this.playNext();
    }
  },

  //play the first song
  playFirst: function(){
    //songqueue will play the first song, which that song will sent a play trigger out
    //that play event trigger will be heard by the App Model 
    //the play event can be heard from the songQueue or the library because they're the same collection
    //in this app, the choice is to listen from the library (check App Model for the listener)
    this.at(0).play();
  },

  //play the next songs
  playNext: function(){
    //remove the song from the list
    this.shift();
    //if there is more than one song
    if( this.length >= 1 ){
      //play the next first song
      this.playFirst();
    } else {
      //halt chain of events
      this.trigger('haltEvents');
    }
  }
});
