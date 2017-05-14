app.run((FIREBASE_CONFIG) => {
  	firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("PickerCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {

	$scope.cat = "Meow";
	$scope.navItems = [{name : "Logout"}, {name : "All Items"}, {name : "New Item"}];

	let getMushroomList = () => {
		let mushroomz = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/mushrooms.json`)
			.then((fbMushroom) => {
				let mushroomCollection = fbMushroom.data;
				Object.keys(mushroomCollection).forEach((key) => {
					mushroomCollection[key].id=key;
					mushroomz.push(mushroomCollection[key]);
			});
				resolve(mushroomz);
			}).catch((error) => {
				reject(error);
			});  
		});  
	};


	let getMushrooms = () => {
		getMushroomList()
		.then((mushroomz) => {
			$scope.mushrooms = mushroomz;
			console.log("mushroomz", mushroomz);
			console.log("$scope.mushrooms", $scope.mushrooms);
		}).catch((error) => {
			console.log("get Error", error);
		});
	};

	getItems();
});
