Contributions = {
  add: function(log){
    log.title = "Vasile";
    Meteor.call("addLog", log, function(error, result){
      if(error){
         NotesErrors.throwError("The category could not be saved!");
         console.log(error);
      }else{
        NotesErrors.throwNotification("The category was saved!");
      }
    });
  }
};
