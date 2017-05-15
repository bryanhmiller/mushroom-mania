app.run((FIREBASE_CONFIG) => {
  	firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("PickerCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {

	$scope.showListView = true;
	$scope.mushrooms = [];

	$scope.nonPoisonous = () => {
		$scope.showListView = true;
	};

	$scope.poisonous = () => {
		$scope.showListView = false;
	};
 	

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
		}).catch((error) => {
			console.log("get Error", error);
		});
	};

	getMushrooms();
});
