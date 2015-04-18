Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {
  Session.set('openNewInfo', false);
  Template.body.helpers({
      messages: function(){
          return Messages.find({});
      }
  });

  Template.createOne.helpers({
      openBox: function(){
          return Session.get('openNewInfo');
      }
  });

  Template.createButton.helpers({
      openBox: function(){
          return Session.get('openNewInfo');
      }
  });

  Template.body.events({
      'submit .submit-info': function(e){
          var text = e.target.text.value;
          var place = e.target.place.value;

          Messages.insert({
              info: text,
              place: place,
              createdAt: new Date()
          });

          e.target.text.value = '';
          e.target.place.value = '';

          return false;
      },
      'click .open-new': function(e){
          Session.set('openNewInfo', true);
      },
      'click .cancel-new': function(e){
          Session.set('openNewInfo', false);
      }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
