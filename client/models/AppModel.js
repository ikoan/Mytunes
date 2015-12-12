// App.js - Defines a backbone model class for the whole app.
//called inside of index.html ---> var app = new AppModel({library: library});
var AppModel = Backbone.Model.extend({

  /*initialize --> set initial values on model; these are invoked when model is created
    params --> an object of key value pair {library: libray} 
  */
  initialize: function(params){
    //set property currentSong to instance from calling SongModel
    this.set('currentSong', new SongModel());
    //set property songQueue to instance from calling SongQueue
    this.set('songQueue', new SongQueue());

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the function (this.set('currentSong', song)) would
    end up referring to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */

    // SOLUTION LECTURE NOTE ------------------------------------------------------------
    // The question addressed below may come up during solution!
    // The listener is attached to library because a song queue doesn't yet exist when
    // the student receive the repo - them must write one! However, we want to provide a
    // working app so we have to attach the listener to the library.
    // It is more conceptually clear to listen to stop/play events from the songQueue,
    // but both solutions are equally valid for the reason listed below.
    // Should you make the change to listen on songQueue, tests will stop working!
    // ----------------------------------------------------------------------------------
    //
    // NOTE: since the song model is present in both the library and songQueue collections,
    // you can attach a listener to either and still receive the play event.
    // Some people might find it easier to conceptualize the songQueue approach.
    // HOWEVER: the tests won't pass!
    // ALSO: don't attach listeners to both otherwise you will get 2 play events!
    //
    // this.get('songQueue').on('play', function(song){
    // or
    // params.library.on('play', function(song){


    /*Listening is done on Collection, not models but the model's trigger will filter up to collection, 
      and the collection is a funnel for all model events. That's why we listen to the collection.
      In this case, params is {library:library} so params.library refers to the library collection.
      If 'play' is trigger from the song, from the collection, we can get the song from that exact model
      that triggered.
    */
    params.library.on('play', function(song){
      //set currentSong to the song that triggered the play event (look at songQueue's play info)
      this.set('currentSong', song);
      //3rd arg 'this' refers to AppModel; needed here, otherwise this.set's 'this' will refer to window
    }, this),

    /*App model listens to enqueue event; when enqueue is triggered by song, it is heard by library,
    which signals the AppModel and AppModel invokes function on songQueue, adding song to songQueue
    then song is added to the songQueue
    
    because of addition to songQueue, this will emit an add EVENT

    the SongQueueView is listening for add and remove events
    */
    params.library.on('enqueue', function(song){
      this.get('songQueue').add(song);
    }, this),

    //listener for the haltEvents trigger because there is no next song to play
    this.get('songQueue').on('haltEvents', function(){
      //set the currentSong to null
      //AppView will hear this change
      //It will get playerView to get the currentSong, which is null
      this.set('currentSong', null);
    }, this);

  //   params.library.on('dequeue', function(song){}, this)

  //   console.log(params);
  }

});
