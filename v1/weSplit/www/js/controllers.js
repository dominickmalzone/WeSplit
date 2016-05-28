var app = angular.module('starter.controllers', [])

.controller('ListCtrl', function($scope, $ionicModal, $ionicPopup, $stateParams, $firebaseArray, $rootScope) {

  var groupRef = new Firebase("https://wesplitlist.firebaseio.com/groups");

  $scope.myGroup = "";

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.hasGroup = function(myGroup){
      if (myGroup == "")
        return false;
      else
        return true;
    }

    $scope.createGroup = function(u) {
      groupRef.child(u.groupName).set({pass: u.pass, items})       
      $scope.modal.hide();
      $scope.myGroup = u.groupName;
      var groupie = $scope.myGroup;
      $scope.theItemsRef = new Firebase("https://wesplitlist.firebaseio.com/groups/" + groupie + "/items");

      
    };

    $scope.joinGroup = function(u){
      //add loading
      groupRef.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key();

          if (key == u.groupName){
            console.log("Group Found");
            //pass confirm later
            $scope.myGroup = u.groupName;
            $scope.theItemsRef = new Firebase("https://wesplitlist.firebaseio.com/groups/" + u.groupName + "/items");
            $scope.items = $firebaseArray($scope.theItemsRef);
            return true;
          } else {
            //console.log('no match with   ' + key);
            return false;
          }
        });
      });  
    };
 
      var items = [];

      $scope.addItem = function(item){
        if($scope.myGroup){
          $scope.theItemsRef.child(item.name).set({bought: 'False'});
          item.name = "";
          $scope.items = $firebaseArray($scope.theItemsRef);
          
        } else {
            console.warn('No Group');
        }
      }

      // $scope.isBought = function(item){

      // }

})

app.controller('LoginCtrl', function($scope, $state, $ionicPopup, $rootScope, $localStorage) {
  
  $localStorage.user = "";
  //console.log("Initialize localstorage user as empty :" + $localStorage.user);
  $scope.data = {};

  $scope.signupEmail = function(){  
    var ref = new Firebase("https://wesplitlist.firebaseio.com/");
    var email = $scope.data.email;
    ref.createUser({
      email    : $scope.data.email,
      password : $scope.data.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
           $ionicPopup.alert({
             title: 'Ooops!',
             template: error
            });
      } else {
        var email = $scope.data.email;
        var id = userData.uid;
        var randNum = Math.floor((Math.random() * 10) + 1);
        console.log("Successfully created user account with uid:", userData.uid);
        var userRef = new Firebase("https://wesplitlist.firebaseio.com/users");
        userRef.push({Email: email, uid: id, num: randNum})

        $localStorage.user = userData.uid;
        $localStorage.myNum = randNum;
        console.log("User Data is :" + userData.uid);
        console.log("After signup, localstorage user is :" + $localStorage.user);
        console.log("this is ther number after login: " + $localStorage.myNum);
        $state.go('tab.dash');
      }
    });


  $scope.loginEmail = function(){
    var ref = new Firebase("https://wesplitlist.firebaseio.com");
    ref.authWithPassword({
      email    : $scope.data.email,
      password : $scope.data.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
           $ionicPopup.alert({
             title: 'Oops!',
             template: 'Incorrect login info, please try again.'
     });
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $state.go('tab.home');
      }
    });
  };

 /* $scope.updateInfo = function(){
    ref.child('users/'+ $scope.currentUser).push($scope.name); 
    console.log(userData.uid); 
    console.log("name");

  }; */


};
});

app.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

app.controller('AccountCtrl', function($scope, $localStorage) {
  $scope.settings = {
    enableFriends: true
  };
  console.log("localstorage called from Acount is:" + $localStorage.user);
  console.log("LocalStorage mynumber is : " + $localStorage.myNum);
  $scope.myId = $localStorage.user;
  $scope.myNum = $localStorage.myNum;
});
