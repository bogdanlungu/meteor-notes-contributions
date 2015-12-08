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
    var weekNo = 52;
    var translate = 780;
    var totalDays = 365;
    return Contributions.calculateWeeks(weekNo, totalDays, translate);
  },

  weeksMobile: function(){
    var weekNo = 16;
    var translate = 240;
    var totalDays = 112;
    return Contributions.calculateWeeks(weekNo, totalDays, translate);
  },

  months: function(){
    var totalDays = 365;
    var translate = 750;
    return Contributions.calculateMonths(totalDays, translate);
  },

  monthsMobile: function(){
    var totalDays = 112;
    var translate = 210;
    return Contributions.calculateMonths(totalDays, translate);
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
      var day = nextDay.getDate();
      var month = Contributions.month(nextDay.getMonth());
      var year = nextDay.getFullYear();
      var dayOfWeek = Contributions.dayOfWeek(nextDay.getDay());
      var getTheDate = nextDay.getFullYear();
      var theFinalDate = dayOfWeek + " "+month+" "+day+" "+year;
      obj.displayedDate = theFinalDate;
      obj.yCoord = yCoord;
      if((nextDay <= currentDate) && (nextDay >= oldestDate)){
        array.push(obj);
      }
    }
    return array;
  },

  written: function(){
    // set the colors
    var color = "#ccc";
    var obj = {};
    var upTo25 = "#d6e685";
    var upTo50 = "#8cc665";
    var upTo75 = "#44a340";
    var upTo100 = "#1e6823";
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
    var theMaxContribution = parseFloat(Session.get("theMaxContribution"));
    var percentage = parseFloat((words / theMaxContribution) * 100);
    switch(true){
      case (percentage < 25):
        color = upTo25;
      break;
      case ((percentage >= 25) && (percentage < 50)):
        color = upTo50;
      break;
      case ((percentage >= 50) && (percentage < 75)):
        color = upTo75;
      break;
      case (percentage >= 75):
        color = upTo100;
      break;
    }
    obj.words = words;
    obj.theColor = color;
    return obj;
  },

  writtenWords: function(){
    return Session.get("writtenWords");
  },

  theDate: function(){
    return Session.get("theDate");
  },

  theMax: function(){
    return Session.get("theMaxContribution");
  }
});

Template.calendar.onRendered(function(){
  var theDetails = Logs.findOne({}, {sort:{wordsWritten: -1}});
  if(theDetails.wordsWritten){
    Session.set("theMaxContribution", theDetails.wordsWritten);
  }
});

Template.calendar.events({

  'mouseover .calendar': function(e){
      if(e.target.localName == "rect"){
        Meteor.setTimeout(function(){
          e.target.attributes['class'].value = "dayHover";
          e.target.attributes['data-written'];
          var calculateX = e.clientX - 50;
          var calculateY = e.clientY - 50;
          calculateX = calculateX + "px";
          calculateY = calculateY + "px";
          $('#hoverDetails').css("left", calculateX);
          $('#hoverDetails').css("top", calculateY);
          $('#hoverDetails').show();
          Session.set("writtenWords", e.target.attributes['data-written'].value);
          Session.set("theDate", e.target.attributes['data-date'].value);
        }, 0);
      }
  },

  'mouseout .calendar': function(e){
      if(e.target.localName == "rect"){
        Meteor.setTimeout(function(){
          e.target.attributes['class'].value = "day";
          $('#hoverDetails').hide();
        }, 0);
      }
  }
});
