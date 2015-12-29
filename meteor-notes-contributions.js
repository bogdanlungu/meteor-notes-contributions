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

  addFirstLog: function(note_id, content){
    Meteor.call("addFirstLog", note_id, content, function(error, result){
      if(error){
         console.log(error);
      }else{ }
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
  },

  calculateMonths: function(totalDays, translate){
    var months = [];
    var checkMonths = [];
    for(var i = 0; i < totalDays; i++){
      var theDate = this.goBack(i);
      var month = theDate.getMonth();
      var day = theDate.getDate();
      month = this.month(month);
      if((day > 15) && (checkMonths.indexOf(month) == -1)){
        var obj = {};
        obj.month = month;
        obj.translate = translate;
        checkMonths.push(month);
        months.push(obj);
        translate = translate - 65;
      }
    }
    return months;
  },

  calculateWeeks: function(weekNo, totalDays, translate){
    var weeks = [];
    var theDay = this.goBack(0);

    for(var i = 0; i < totalDays; i++){
      var theDate = this.goBack(i);
      if(theDate.getDay() == 0){
        var obj = {};
        obj.translate = translate;
        obj.weekNo = weekNo;
        obj.day = theDate;
        obj.dayBack = i;
        obj.theDate = theDate;

        weeks.push(obj);
        translate = translate - 15;
        weekNo = weekNo - 1;
      }
    }
    return weeks;
  },

  calculateDays: function(totalDays, translate){
    var lastDays = [];
    for(var i = 0; i < totalDays; i++){
      var obj = {};
      var theDate = this.goBack(i);
      var theDay = theDate.getDate();
      var day = theDate.getDate();
      var month = this.month(theDate.getMonth());
      var year = theDate.getFullYear();
      var dayOfWeek = this.dayOfWeek(theDate.getDay());
      var getTheDate = theDate.getFullYear();
      var theFinalDate = dayOfWeek + " "+month+" "+day+" "+year;

      obj.theDay = day;
      obj.displayedDate = theFinalDate;
      obj.theDate = theDate;
      obj.translate = translate;
      lastDays.push(obj);
      translate = translate - 20;
    }
    return lastDays;
  }
};
