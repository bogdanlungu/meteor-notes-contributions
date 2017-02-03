Router.route('/calendar', { name: 'calendar' });

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('accessDenied');
  } else {
    this.next();
  }
}, { only: 'calendar' });
