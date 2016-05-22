var app = angular.module('starter.controllers', [])

.controller('ListCtrl', function($scope, $ionicModal) {

  console.log("hello");
    $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


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
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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
