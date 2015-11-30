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
    var translate = 15;

    for(var i = 0; i < 365; i++){
      var theDate = Contributions.goBack(i);
      if(theDate.getDay() == 0){
        var obj = {};
        obj.translate = translate;
        obj.weekNo = weekNo;

        weeks.push(obj);
        translate = translate + 15;
        weekNo = weekNo - 1;
      }
    }
    return weeks;
  },

  days: function(){
    var array = [];
    var yCoord = 0;
    for(var i = 0; i < 7; i++){
      var obj = {};
      obj.yCoord = yCoord;
      array.push(obj);
      yCoord = yCoord + 15;
    }
    return array;
  },

  written: function(){
    var dateMorning = this;
    var dateMidnight = new Date(this);
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
