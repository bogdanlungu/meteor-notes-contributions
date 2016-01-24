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
         existingContent = existingContent.replace(/(<([^>]+)>)/ig, " ");
         var numberOfWordsExistingContent = Contributions.countWords(existingContent);
         var numberOfWordsUpdatedContent = Contributions.countWords(content);
         var difference = numberOfWordsUpdatedContent - numberOfWordsExistingContent;
         if(parseInt(difference) > 0){
           var attributes = {};
           attributes.noteId = note_id;
           attributes.wordsWritten = difference;
           var log = _.extend(attributes, {
              uId: Meteor.userId(),
              date: new Date()
           });

           var startToday = Contributions.startToday();
           var endToday = Contributions.endToday();
           var checkLog = Logs.findOne({$and: [{date: {$gt: startToday, $lt: endToday}}, {noteId: note_id}]});
           if(checkLog){
             var newLog = {};
             newLog.wordsWritten = checkLog.wordsWritten + difference;
             Logs.update({uId:Meteor.userId(), _id: checkLog._id}, {$set: newLog});
           }else{
              Logs.insert(log);
           }
         }
       }else{
         console.log('We cannot find a note with this _id!');
       }
     },

     addFirstLog: function(note_id, content){
       var numberOfWordsUpdatedContent = Contributions.countWords(content);
       var attributes = {};
       attributes.noteId = note_id;
       attributes.wordsWritten = numberOfWordsUpdatedContent;
       var log = _.extend(attributes, {
          uId: Meteor.userId(),
          date: new Date()
       });

       Logs.insert(log);
     },

     removeLog: function(id){
      Logs.remove({_id: id});
     },

    editLog: function(id, collectionAttributes){
      Logs.update({uId:Meteor.userId(), _id: id}, {$set: collectionAttributes});
    }
  });
}
