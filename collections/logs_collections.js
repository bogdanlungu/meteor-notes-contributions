Logs = new Mongo.Collection('logs');

Logs.allow({
  update: function(userId, doc) { return ownsDocument(userId, doc); },
  remove: function(userId, doc) { return ownsDocument(userId, doc); }
});

if(Meteor.isServer){
  Meteor.methods({
    addLog: function(note_id, content){
       var noteDetails = Notes.findOne({_id: note_id});
       if(noteDetails){
         var existingContent = noteDetails.content;
         var numberOfWordsExistingContent = Contributions.countWords(existingContent);
         var numberOfWordsUpdatedContent = Contributions.countWords(content);
         var difference = numberOfWordsUpdatedContent - numberOfWordsExistingContent;
         // console.log(numberOfWordsExistingContent);
         // console.log(numberOfWordsUpdatedContent);
         if(difference){
           var attributes = {};
           attributes.noteId = note_id;
           attributes.wordsWritten = difference;
           var log = _.extend(attributes, {
              uId: Meteor.userId(),
              date: new Date()
           });
           Logs.insert(log);
         }
       }else{
         console.log('We cannot find a note with this _id!');
       }
     },

     removeLog: function(id){
      Logs.remove({_id: id});
     },

    editLog: function(id, collectionAttributes){
      Logs.update({uId:Meteor.userId(), _id: id}, {$set: collectionAttributes});
    }
  });
}
