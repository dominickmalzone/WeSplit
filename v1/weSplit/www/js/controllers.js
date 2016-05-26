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

      //console.log("this is the items:  " + $scope.theItemsRef);
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

$scope.showPopup = function() {
  $scope.data = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="theGroup.groupName">',
      title: 'Join Group',
      subTitle: 'Your friend will know the name!',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Join</b>',
          type: 'button-positive',
          onTap: $scope.joinGroup = function(u){
            
          }
        }
      ]
    });
}


})

app.controller('LoginCtrl', function($scope, $state, $ionicPopup, $rootScope) {

  $scope.data = {};
  //$scope.currentUser = StorageService.getAll();
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
        console.log("Successfully created user account with uid:", userData.uid);
        var userRef = new Firebase("https://wesplitlist.firebaseio.com/users");
        userRef.push({Email: email, uid: id})
        $scope.currentUser = userData//add email later        
        console.log($scope.currentUser);
        $state.go('tab.dash');
      }
    });
    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    //    event.preventDefault();  
    //     if (toState.name == 'signup' && $localStorage.get($scope.currentUser)) {
    //       $state.go('tab.home')
    //     }
    // });      
/*        $scope.setLocal = function($localstorage){
        $localStorage.set('currentUser',userData.uid);
        console.log(localstorage.get('currentUser'));
        };
/*/


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

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
