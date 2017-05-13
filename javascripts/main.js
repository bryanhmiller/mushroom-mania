app.run((FIREBASE_CONFIG) =>{
  firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("PickerCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {

	$scope.cat = "Meow";
	$scope.navItems = [{name : "Logout"}, {name : "All Items"}, {name : "New Item"}];
});