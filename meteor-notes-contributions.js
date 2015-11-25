Contributions = {
  add: function(note_id, content){
    Meteor.call("addLog", note_id, content, function(error, result){
      if(error){
         console.log(error);
      }else{
        // console.log('The log could not be saved');
      }
    });
  },

  countWords: function(string){
    var countWords = string.split(" ").length;
    return countWords;
  },

  startToday: function(){
    var startDate = new Date();
    startDate.setSeconds(0);
    startDate.setHours(0);
    startDate.setMinutes(0);
    return startDate;
  },

  endToday: function(){
    var dateMidnight = new Date(this.startToday());
    dateMidnight.setHours(23);
    dateMidnight.setMinutes(59);
    dateMidnight.setSeconds(59);
    return dateMidnight;
  }
};
