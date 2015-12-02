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
  },

  goBack: function(days){
    // go back with a number of days
    var theDate = new Date();
    theDate.setSeconds(0);
    theDate.setHours(0);
    theDate.setMinutes(0);
    theDate.setDate(theDate.getDate() - days);
    return theDate;
  },

  goForward: function(date, days){
    var theDate = new Date(date);
    theDate.setSeconds(0);
    theDate.setHours(0);
    theDate.setMinutes(0);
    theDate.setDate(theDate.getDate() + days);
    return theDate;
  },

  dayOfWeek: function(day){
    switch(day){
      case 0:
        return "Sun";
      break;
      case 1:
        return "Mon";
      break;
      case 2:
        return "Tue";
      break;
      case 3:
        return "Wed";
      break;
      case 4:
        return "Thu";
      break;
      case 5:
        return "Fri";
      break;
      case 6:
        return "Sat";
      break;
    }
  },

  month: function(month){
    switch(month){
      case 0:
        return "Jan";
      break;
      case 1:
        return "Feb";
      break;
      case 2:
        return "Mar";
      break;
      case 3:
        return "Apr";
      break;
      case 4:
        return "May";
      break;
      case 5:
        return "Jun";
      break;
      case 6:
        return "Jul";
      break;
      case 7:
        return "Aug";
      break;
      case 8:
        return "Sep";
      break;
      case 9:
        return "Oct";
      break;
      case 10:
        return "Nov";
      break;
      case 11:
        return "Dec";
      break;
    }
  }
};
