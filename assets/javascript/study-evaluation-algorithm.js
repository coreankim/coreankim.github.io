	// var testTitle = "total knee arthroplasty after a previous patellectomy."
	// var testID = 7822357

var firstPass = function (titleConverted, meshConverted, pubTypeConverted, abstractObj) {

	var abstractStringConverted = abstractObj.string.toLowerCase();
	var evaluation = {

		studyType: "",
		evidenceLevel: "N/A",
		needsHuman: true,
		evalComplete: false
	};

	if (evaluation.evalComplete === false) {
		if (pubTypeConverted.includes("comment") || pubTypeConverted.includes("letter") || pubTypeConverted.includes("editorial")) {
		  evaluation.studyType = "Letter/comment/editorial";
			evaluation.needsHuman = false;
			evaluation.evalComplete = true;	    
		};
	};

	if (evaluation.evalComplete === false) {
		if (pubTypeConverted.includes("histori")) {
		  evaluation.studyType = "biography/historical study/portrait";
      evaluation.needsHuman = false;
      evaluation.evalComplete = true;
		};
	};

	if (evaluation.evalComplete === false) {
		if (pubTypeConverted.includes("lecture")) {
		  evaluation.studyType = "lectures";
      evaluation.needsHuman = false;
      evaluation.evalComplete = true;
		};
	};

	if (evaluation.evalComplete === false) {
		if (pubTypeConverted.includes("practice guideline")) {
		  evaluation.studyType = "practice guidelines";
      evaluation.needsHuman = false;
      evaluation.evalComplete = true;
		};
	};			


	if (evaluation.evalComplete === false) {
		if (pubTypeConverted.includes("case reports")) {
		  evaluation.studyType = "case reports";
	    evaluation.needsHuman = false;
			evaluation.evalComplete = true;	     
		};
	};

	if (evaluation.evalComplete === false) {
		if (pubTypeConverted.includes("review")) {
		  if (abstractStringConverted.includes("meta analysis") || abstractStringConverted.includes("meta-analysis")) {
			  evaluation.studyType = "meta analysis";
		    evaluation.evidenceLevel = "NEEDS HUMAN GRADING";
		  } else if (abstractStringConverted.includes("systematic review") || pubTypeConverted.includes("systematic review")) {
			  evaluation.studyType = "systematic review";
		    evaluation.evidenceLevel = "NEEDS HUMAN GRADING";
		  } else {
		  	evaluation.studyType = "review";
		    evaluation.evidenceLevel = "N/A";
		  };
 	    evaluation.needsHuman = false;
			evaluation.evalComplete = true;	 
		} else if (pubTypeConverted.includes("meta analysis") || pubTypeConverted.includes("meta-analysis")) {
				evaluation.studyType = "meta-analysis";
		    evaluation.evidenceLevel = "NEEDS HUMAN GRADING";
		    evaluation.needsHuman = false;
				evaluation.evalComplete = true;
		};
	};

	if (evaluation.evalComplete === false) {
		if (pubTypeConverted.includes("randomized controlled trial")) {
		  evaluation.studyType = "randomized controlled trial";
	    evaluation.evidenceLevel = "1";
	    evaluation.needsHuman = false;
			evaluation.evalComplete = true;	 
		};
	};

	if (evaluation.evalComplete === false) {
		if (pubTypeConverted.includes("clinical trial")) {
		  if (!pubTypeConverted.includes("randomized") || !abstractStringConverted.includes("randomized")) {
		    evaluation.studyType = "clinical trial, unclear randomization";
		    evidenceLevel = "2"
		    evaluation.needsHuman = false;
				evaluation.evalComplete = true;	 
			};
		};
	};

	// if (titleConverted === testTitle) {
	// 	console.log("first pass for "+testID, "FINAL TYPE: "+evaluation.studyType, evaluation.evalComplete, meshConverted)
	// };

	return evaluation;
};

var secondPass = function (titleConverted, meshConverted, pubTypeConverted, abstractObj) {

	var abstractStringConverted = abstractObj.string.toLowerCase();
	var evaluation = {

		studyType: "",
		evidenceLevel: "N/A",
		needsHuman: true,
		evalComplete: false
	};
	
	if (evaluation.evalComplete === false) {
		if (meshConverted.includes("cross-sectional stud") || meshConverted.includes("cross sectional stud") || abstractStringConverted.includes("cross sectional stud") || abstractStringConverted.includes("case control stud")) {
	    evaluation.studyType = "cross-sectional studies";
      evaluation.evidenceLevel = "3";
	    evaluation.needsHuman = false;
			evaluation.evalComplete = true;	 
		};
	};

	if (evaluation.evalComplete === false) {
		if (meshConverted.includes("case-control stud") || meshConverted.includes("case control stud") || abstractStringConverted.includes("case-control stud") || abstractStringConverted.includes("case control stud")) {
		  evaluation.studyType = "case control studies";
	    evaluation.evidenceLevel = "3";
	    evaluation.needsHuman = false;
			evaluation.evalComplete = true;	 
		};
	};

	if (evaluation.evalComplete === false) {
		if (meshConverted.includes("biography") || meshConverted.includes("portrait")) {
		  evaluation.studyType = "biography/historical study/portrait";
      evaluation.needsHuman = false;
      evaluation.evalComplete = true;
		};
	};

	if (evaluation.evalComplete === false) {
		if (meshConverted.includes("internship") || meshConverted.includes("residency") || meshConverted.includes("fellowship") || meshConverted.includes("graduate") || meshConverted.includes("accreditation")) {
		  evaluation.studyType = "education";
	    evaluation.needsHuman = false;
	    evaluation.evalComplete = true;
		};
	};

	// if (evaluation.evalComplete === false) {
	// 	if (meshConverted.includes("prospective")) {
	// 	  if (meshConverted.includes("cohort") || titleConverted.includes("cohort")) {
		  	
	// 	  	for (i = 0; i < abstractObj.array.length; i++) {
	// 	  		if (abstractObj.array[i] === )
	// 	  	}
	// 	  	evaluation.studyType = "prospective cohort study, NLP";
	// 	    evaluation.evidenceLevel = "2";
	// 	  } 
	// 	};
	// };

	if (evaluation.evalComplete === false) {
		if (meshConverted.includes("retrospective")) {
		  if (meshConverted.includes("cohort") || titleConverted.includes("cohort") || abstractStringConverted.includes("controls") || abstractStringConverted.includes("control-group")) {
		  	evaluation.studyType = "retrospective cohort study";
		    evaluation.evidenceLevel = "3";
		  } else if (abstractStringConverted.includes("comparison") || abstractStringConverted.includes("group") || titleConverted.includes("comparison")) {
				evaluation.studyType = "retrospective cohort study";
		    evaluation.evidenceLevel = "3";
			} else if (abstractStringConverted.includes("single cohort")) {
		  	evaluation.studyType = "prospective outcome study w/ single cohort";
		    evaluation.evidenceLevel = "3"; 
			} else {
		  	evaluation.studyType = "retrospective study w/ no cohort comparison";
		  	evaluation.evidenceLevel = "4";
		  }; 
	    	evaluation.needsHuman = false;
				evaluation.evalComplete = true;	 
	  };
	};

	// if (titleConverted === testTitle) {
	// 	console.log("second pass for "+testID, "FINAL TYPE: "+evaluation.studyType, evaluation.evalComplete, meshConverted)
	// };

	return evaluation;
};

var thirdPass = function (titleConverted, meshConverted, pubTypeConverted, abstractObj) {

	var abstractStringConverted = abstractObj.string.toLowerCase();
	var evaluation = {

		studyType: "",
		evidenceLevel: "N/A",
		needsHuman: true,
		evalComplete: false
	};

	if (evaluation.evalComplete === false) {
		if (abstractStringConverted.includes("no abstract")) {
		  evaluation.studyType = "No abstract: expert opinion, case report, editorials.";
	    evaluation.needsHuman = false;
	    evaluation.evalComplete = true;
		};
	};	

	if (evaluation.evalComplete === false) {
		if (meshConverted.includes("registr") || meshConverted.includes("database") || abstractStringConverted.includes("registr") || abstractStringConverted.includes("database") || abstractStringConverted.includes("retrospective")) {
		  if (abstractStringConverted.includes("cohort") || meshConverted.includes("cohort") || titleConverted.includes("cohort") || abstractStringConverted.includes("controls") || abstractStringConverted.includes("control-group")) {
		  	evaluation.studyType = "retrospective cohort study";
		    evaluation.evidenceLevel = "3";
		  } else if (abstractStringConverted.includes("comparison") || abstractStringConverted.includes("group") || abstractStringConverted.includes("compare") || titleConverted.includes("comparison")) {
				evaluation.studyType = "retrospective cohort study";
		    evaluation.evidenceLevel = "3";
			} else {
		  	evaluation.studyType = "retrospective study w/ no cohort comparison";
		  	evaluation.evidenceLevel = "4";
		  }; 
	    evaluation.needsHuman = false;
	    evaluation.evalComplete = true;
		};
	};

	if (evaluation.evalComplete === false) {
		if (meshConverted.includes("biomechanical")) {
		  evaluation.studyType = "biomechanical";
	    evaluation.needsHuman = false;
	    evaluation.evalComplete = true;
		};
	};

	if (evaluation.evalComplete === false) {
		if (meshConverted.includes("animal") || meshConverted.includes("cadaver") || meshConverted.includes("anatom") || meshConverted.includes("biomechanical")) {
		  evaluation.studyType = "animal/anatomy/biomechanical/cadaver";
	    evaluation.needsHuman = false;
	    evaluation.evalComplete = true;
		};
	};

	if (evaluation.evalComplete === false) {
		if (meshConverted.includes("follow-up") || abstractStringConverted.includes("follow-up")) {
		   if (meshConverted.includes("cohort") || titleConverted.includes("cohort") || abstractStringConverted.includes("controls") || abstractStringConverted.includes("control-group")) {
		  	evaluation.studyType = "prospective cohort study";
		    evaluation.evidenceLevel = "2";
		  } else if (abstractStringConverted.includes("comparison") || abstractStringConverted.includes("group") || abstractStringConverted.includes("compare") || titleConverted.includes("comparison")) {
				evaluation.studyType = "prospective cohort study";
		    evaluation.evidenceLevel = "2";
		  } else if (abstractStringConverted.includes("single cohort")) {
		  	evaluation.studyType = "prospective outcome study w/ single cohort";
		    evaluation.evidenceLevel = "3";
		  } else {
		  	evaluation.studyType = "prospective study w/ no cohort comparison";
		  	evaluation.evidenceLevel = "4";
		  }; 
	    evaluation.needsHuman = false;
	    evaluation.evalComplete = true;
		};
	};

	if (evaluation.evalComplete === false) {
		if (meshConverted.includes("economy") || meshConverted.includes("cost-benefit") || meshConverted.includes("economic")) {
		  evaluation.studyType = "economic study";
      evaluation.needsHuman = false;
			evaluation.evalComplete = true;	 
		};
	};

	// if (titleConverted === testTitle) {
	// 	console.log("third pass for "+testID, "FINAL TYPE: "+evaluation.studyType, evaluation.evalComplete, meshConverted)
	// };

	return evaluation;
};