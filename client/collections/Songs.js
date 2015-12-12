/*  Songs.js - Defines a backbone collection class for songs.
    Index.html called Songs so there is a collection of songs created
    var library = new Songs(songData);
  
  It is an object with key called 'models' with 4 children objects.
  Each child has an attribute with song's info (keys are artist, title. url).
  To access each model by INDEX, we can use 'at'. Example: collection.at(index)
*/

var Songs = Backbone.Collection.extend({

  model: SongModel

});