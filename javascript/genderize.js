var getGender = function(firstName, secondName) {

	var genderArray = ["null", "null"];

	for (var i = 0; i < namesAndGenders.length; i++) {

		if (firstName === namesAndGenders[i].name) {
			genderArray[0] = namesAndGenders[i].gender;
		};

		if (secondName === namesAndGenders[i].name) {
			genderArray[1] = namesAndGenders[i].gender;
		};
	};

	return genderArray;
};


