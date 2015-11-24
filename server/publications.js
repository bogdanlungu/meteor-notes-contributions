if (Meteor.isServer) {
  Meteor.publish('logs', function() {
    return Logs.find( {uId: this.userId} );
  });
}
