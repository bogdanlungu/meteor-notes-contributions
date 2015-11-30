Template.calendar.helpers({
  totalContributions: function(){
    return Logs.find({}).count();
  },

  noWords: function(){
    var words = 0;
    var contributions = Logs.find({});
    contributions.forEach(function(row){
      words = words + row.wordsWritten;
    });
    return words;
  },

  currentDate: function(){
    var startDate = new Date();
    startDate.setSeconds(0);
    startDate.setHours(0);
    startDate.setMinutes(0);
    return startDate;
  },

  previous: function(){
    var dateArray = [];
    for(var i = 0; i < 365; i++){
      dateArray.push(Contributions.goBack(i));
    }
    return dateArray;
  },

  weeks: function(){
    var weeks = [];
    var weekNo = 52;
    var translate = 780;
    var theDay = Contributions.goBack(0);

    for(var i = 0; i < 365; i++){
      var theDate = Contributions.goBack(i);
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

  days: function(){
    var array = [];
    var currentDate = new Date();
    var oldestDate = Contributions.goBack(365);
    var yCoord = 0;
    var currentDate = Contributions.goBack(0);
    var sunday = this.theDate;
    for(var i = 0; i < 7; i++){
      var obj = {};
      var nextDay = Contributions.goForward(sunday, i);
      switch(nextDay.getDay()){
        case 0:
          yCoord = 0;
        break;
        case 1:
          yCoord = 15;
        break;
        case 2:
          yCoord = 30;
        break;
        case 3:
          yCoord = 45;
        break;
        case 4:
          yCoord = 60;
        break;
        case 5:
          yCoord = 75;
        break;
        case 6:
          yCoord = 90;
        break;
      }
      obj.weekDay = nextDay;
      obj.yCoord = yCoord;
      if((nextDay <= currentDate) && (nextDay >= oldestDate)){
        array.push(obj);
      }
    }
    return array;
  },

  written: function(){
    var dateMorning = this.weekDay;
    var dateMidnight = new Date(this.weekDay);
    dateMidnight.setHours(23);
    dateMidnight.setMinutes(59);
    dateMidnight.setSeconds(59);

    var logDetails = Logs.find({date: {$gt: dateMorning, $lt: dateMidnight}});
    var words = 0;
    logDetails.forEach(function(row){
      words = words + row.wordsWritten;
    });
    return words;
  }
});
