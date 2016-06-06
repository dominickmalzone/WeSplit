var app = angular.module('starter.controllers', [])

.controller('ListCtrl', function($scope, $ionicModal, $ionicPopup, focus, $stateParams, $firebaseArray, $rootScope, $localStorage) {

  var groupRef = new Firebase("https://wesplitlist.firebaseio.com/groups");

  $scope.myGroup = "";



    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.focusInput = function() {
      $scope.focuss = true;
      focus('myInput');
      // if($scope.focuss == true){
      //   console.log('Focus scope is true, do it');
        // focus('#myInput');
      // }
      
    };

    $scope.tapOff = function(){
      console.log("Tap off was clicked");
      $scope.focuss = false;
    }

    $scope.hasGroup = function(myGroup){
      if ($localStorage.myGroup == undefined)
        return false;
      else
        return true;
    }

    $scope.createGroup = function(u) {
      var entry = u.groupName.replace(/\s/g, '');
      u.groupName = entry;
      groupRef.child(u.groupName).set({pass: u.pass, items})       
      $scope.modal.hide();
      $scope.myGroup = u.groupName;
      $localStorage.myGroup = u.groupName
      var groupie = $scope.myGroup;
      $scope.theItemsRef = new Firebase("https://wesplitlist.firebaseio.com/groups/" + groupie + "/items");
      
    };

    if ($localStorage.myGroup == undefined){
      console.log("Theres no group in ls");
    } else {
      //console.log("Group from local storage found");
      $scope.theItemsRef = new Firebase("https://wesplitlist.firebaseio.com/groups/" + $localStorage.myGroup + "/items");
      $scope.items = $firebaseArray($scope.theItemsRef);
      $scope.myGroup = $localStorage.myGroup;
    }

    $scope.joinGroup = function(u){
      //add loading
      var entry = u.groupName.replace(/\s/g, '');
      u.groupName = entry;
      groupRef.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key();

          if (key == u.groupName){
            console.log("Group Found");
            //pass confirm later
            $scope.myGroup = u.groupName;
            $localStorage.myGroup = u.groupName;
            $scope.theItemsRef = new Firebase("https://wesplitlist.firebaseio.com/groups/" + u.groupName + "/items");
            $scope.items = $firebaseArray($scope.theItemsRef);
            return true;
          } else {
            console.log('no match with   ' + key);
            return false;
          }
        });
      });  
    };
 
    var members = [];
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;

    var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

    var today = dd+'/'+mm+'/'+yyyy;
    
    
  console.log("test to set nynm");
    $scope.addUserToGroup = function(u){
      $localStorage.myNum = 2;
      $scope.myGroupMembersRef = new Firebase("https://wesplitlist.firebaseio.com/groups/" + $localStorage.myGroup +"/members");
      $scope.myGroupMembersRef.child(u.memberName).set({Joined: today, uid: $localStorage.user, num: $localStorage.myNum});       
      $scope.myName = u.memberName;
      console.log(u.memberName);
      $localStorage.usersName = u.memberName;
      console.log("added name to group");
    }

    // $scope.thisUserRef = $scope.myGroupMembersRef +"/"+ $scope.myName;
    // console.log($scope.thisUserRef);
    
    // thisUserRef.on("value", function(snapshot) {
    //   console.log(snapshot.val());
    // }, function (errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });

    $scope.addedName = function(myName){
      if ($localStorage.usersName == undefined)
        return false;
      else
        return true;
    }


      var items = [];

      $scope.addItem = function(item){
        if($scope.myGroup){
          $scope.theItemsRef.child(item.name).set({bought: 'False'});
          item.name = "";
          $scope.items = $firebaseArray($scope.theItemsRef);
          //focus('myInput'); causing keyboard bug
        } else {
            console.warn('No Group');
        }
      }

      // $scope.isBought = function(item){

      // }

      //show insert div
      // cordova.plugins.Keyboard.show();
      //add item,
      //set to empty
      //cancel closes then hide div and keyboard

})

app.controller('LoginCtrl', function($scope, $state, $ionicPopup, $rootScope, $localStorage) {
  
  $localStorage.user = "";
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

app.controller('AccountCtrl', function($scope, $state, $localStorage, $ionicPopover, $ionicPopup, $firebaseArray) {

      $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.popover = popover;
      });

        $scope.openPopover = function($event) {
          $scope.popover.show($event);
        };
        
        $scope.closePopover = function() {
          $scope.popover.hide();
        };

        $scope.$on('$destroy', function() {
          $scope.popover.remove();
        });

          $scope.logout = function(){
            $localStorage.user = "";
            $localStorage.myNum = "";
            $localStorage.myGroup = undefined;
            $localStorage.usersName = undefined;
            console.log("User Logged out"); //lol\
            $state.go('login');
          }


           $scope.showConfirm = function() {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Logout Confirm',
               template: 'Are you sure you want to logout?'
             });

             confirmPopup.then(function(res) {
               if(res) {
                 $scope.logout();
                 $scope.popover.remove();
               } else {
                 console.log('User clicked cancel');
               }
             });
           };
  //local $torage 4 lyfe B-)
  var memRef = new Firebase("https://wesplitlist.firebaseio.com/groups/" + $localStorage.myGroup +"/members");
  $scope.myId = $localStorage.user;
  $scope.myNum = $localStorage.myNum;
  $scope.myName = $localStorage.usersName;
  $scope.myMembers = $firebaseArray(memRef);
});
