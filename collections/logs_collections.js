Logs = new Mongo.Collection('logs');

Logs.allow({
  update: function(userId, doc) { return ownsDocument(userId, doc); },
  remove: function(userId, doc) { return ownsDocument(userId, doc); }
});

if(Meteor.isServer){
  Meteor.methods({
    addLog: function(collectionAttributes){
       var log = _.extend(collectionAttributes, {
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
