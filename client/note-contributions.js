Template.noteContributions.helpers({
  lastDays: function(){
    var lastDays = [];
    var translate = 780;
    for(var i = 0; i < 40; i++){
      var obj = {};
      var theDate = Contributions.goBack(i);
      var theDay = theDate.getDate();
      var day = theDate.getDate();
      var month = Contributions.month(theDate.getMonth());
      var year = theDate.getFullYear();
      var dayOfWeek = Contributions.dayOfWeek(theDate.getDay());
      var getTheDate = theDate.getFullYear();
      var theFinalDate = dayOfWeek + " "+month+" "+day+" "+year;

      obj.displayedDate = theFinalDate;
      obj.theDate = theDate;
      obj.translate = translate;
      lastDays.push(obj);
      translate = translate - 20;
    }
    return lastDays;
  },

  last12Days: function(){
    var lastDays = [];
    var translate = 240;
    for(var i = 0; i < 13; i++){
      var obj = {};
      var theDate = Contributions.goBack(i);
      var theDay = theDate.getDate();
      var day = theDate.getDate();
      var month = Contributions.month(theDate.getMonth());
      var year = theDate.getFullYear();
      var dayOfWeek = Contributions.dayOfWeek(theDate.getDay());
      var getTheDate = theDate.getFullYear();
      var theFinalDate = dayOfWeek + " "+month+" "+day+" "+year;

      obj.displayedDate = theFinalDate;
      obj.theDate = theDate;
      obj.translate = translate;
      lastDays.push(obj);
      translate = translate - 20;
    }
    return lastDays;
  },

  theDate: function(){
    return Session.get("theDate");
  },

  writtenWords: function(){
    return Session.get("writtenWords");
  },

  checkContributions: function(){
    var checkContributions = Logs.find({noteId: Router.current().params._id});
    if(checkContributions){
      return true;
    }else{
      return false;
    }
  },

  written: function(){
    // set the colors
    var color = "#ccc";
    var obj = {};
    var upTo25 = "#d6e685";
    var upTo50 = "#8cc665";
    var upTo75 = "#44a340";
    var upTo100 = "#1e6823";
    var dateMorning = this.theDate;
    dateMorning.setSeconds(0);
    dateMorning.setHours(0);
    dateMorning.setMinutes(0);
    var dateMidnight = new Date(this.theDate);
    dateMidnight.setHours(23);
    dateMidnight.setMinutes(59);
    dateMidnight.setSeconds(59);
    var note_id = Router.current().params._id;
    var logDetails = Logs.find({$and: [{date: {$gt: dateMorning, $lt: dateMidnight}}, {noteId: note_id}]});
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

  theMax: function(){
    return Session.get("theMaxContribution");
  }
});

Template.noteContributions.events({

  'mouseover .contributions': function(e){
      if(e.target.localName == "rect"){
        Meteor.setTimeout(function(){
          e.target.attributes['class'].value = "dayHover";
          e.target.attributes['data-written'];
          var calculateX = e.clientX - 50;
          var calculateY = e.clientY - 50;
          calculateX = calculateX + "px";
          calculateY = calculateY + "px";
          $('#hoverDetailsContributions').css("left", calculateX);
          $('#hoverDetailsContributions').css("top", calculateY);
          $('#hoverDetailsContributions').show();
          Session.set("writtenWords", e.target.attributes['data-written'].value);
          Session.set("theDate", e.target.attributes['data-date'].value);
        }, 0);
      }
  },

  'mouseout .contributions': function(e){
      if(e.target.localName == "rect"){
        Meteor.setTimeout(function(){
          e.target.attributes['class'].value = "day";
          $('#hoverDetailsContributions').hide();
        }, 0);
      }
  }
});

Template.noteContributions.onRendered(function(){
  var theDetails = Logs.findOne({noteId: Router.current().params._id}, {sort:{wordsWritten: -1}});
  if(theDetails){
    if(theDetails.wordsWritten){
      Session.set("theMaxContribution", theDetails.wordsWritten);
    }
  }
});
