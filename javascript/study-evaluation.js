var evaluateStudy = function(abstractObj) {

	var needsHuman = true;
	var evalComplete = false;

	var evaluation = {
		studyType: "",
		evidenceLevel: "N/A",
	};

	titleConverted = abstractObj["Title"].toLowerCase();
	meshConverted = abstractObj["MeSH terms"].toLowerCase();
	pubTypeConverted = abstractObj["Publication type"].toLowerCase();

	if (evalComplete === false) {
		var evaluationObj = firstPass(titleConverted, meshConverted, pubTypeConverted, abstractObj["Abstract"]);
		evaluation.studyType = evaluationObj.studyType;
		evaluation.evidenceLevel = evaluationObj.evidenceLevel;
		evalComplete = evaluationObj.evalComplete;
		needsHuman = evaluationObj.needsHuman;
		
		// if (titleConverted === "total knee arthroplasty after a previous patellectomy.") {
		// 	console.log("1st pass "+evalComplete);
		// }
	};

	if (evalComplete === false) {
		var evaluationObj = secondPass(titleConverted, meshConverted, pubTypeConverted, abstractObj["Abstract"]);
		evaluation.studyType = evaluationObj.studyType;
		evaluation.evidenceLevel = evaluationObj.evidenceLevel;
		evalComplete = evaluationObj.evalComplete;
		needsHuman = evaluationObj.needsHuman;
		
		// if (titleConverted === "total knee arthroplasty after a previous patellectomy.") {
		// 	console.log("2nd pass "+evalComplete);
		// }
	};

	if (evalComplete === false) {
		var evaluationObj = thirdPass(titleConverted, meshConverted, pubTypeConverted, abstractObj["Abstract"]);
		evaluation.studyType = evaluationObj.studyType;
		evaluation.evidenceLevel = evaluationObj.evidenceLevel;
		evalComplete = evaluationObj.evalComplete;
		needsHuman = evaluationObj.needsHuman;
		
		// if (titleConverted === "total knee arthroplasty after a previous patellectomy.") {
		// 	console.log("3rd pass "+evalComplete);
		// }
	};

	if (needsHuman === true) {
		evaluation.studyType = "NEEDS HUMAN EVAL";
		evaluation.evidenceLevel = "NEEDS HUMAN EVAL";
	};

  return evaluation;
};

	// if (evalComplete === false) {
	// 	if (pubTypeConverted.includes("comment") || pubTypeConverted.includes("letter") || pubTypeConverted.includes("editorial")) {
	// 	  evaluation.studyType = "Letter/comment/editorial";
	//     needsHuman = false;
	//     evalComplete = true;	    
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("internship") || meshConverted.includes("residency") || meshConverted.includes("fellowship") || meshConverted.includes("graduate") || meshConverted.includes("accreditation")) {
	// 	  evaluation.studyType = "education";
	//     needsHuman = false;
	//     evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (pubTypeConverted.includes("review")) {
	// 	  if (abstractConverted.includes("systematic review") || pubTypeConverted.includes("systematic review")) {
	// 		  evaluation.studyType = "systematic review";
	// 	    evaluation.evidenceLevel = "3";
	// 	  } else if (abstractConverted.includes("meta analysis") || abstractConverted.includes("meta-analysis") || pubTypeConverted.includes("meta analysis") || pubTypeConverted.includes("meta-analysis")) {
	// 		  evaluation.studyType = "meta analysis";
	// 	    evaluation.evidenceLevel = "3";
	// 	  } else {
	// 	  	evaluation.studyType = "review";
	// 	    evaluation.evidenceLevel = "N/A";
	// 	  };
	//     needsHuman = false;
	//     evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (pubTypeConverted.includes("case reports")) {
	// 	  evaluation.studyType = "case reports";
	//     needsHuman = false;
	//     evalComplete = true;	    
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("animal") || meshConverted.includes("cadaver") || meshConverted.includes("anatom")) {
	// 	  evaluation.studyType = "animal/anatomy/cadaver";
	//     needsHuman = false;
	//     evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("survey") || meshConverted.includes("questionnaire")) {
	// 	  evaluation.studyType = "survey/questionnaire";
	//     needsHuman = false;
	//     evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (pubTypeConverted.includes("randomized controlled trial")) {
	// 	  evaluation.studyType = "randomized controlled trial";
	//     evaluation.evidenceLevel = "1";
	//     needsHuman = false;
	//     evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("case-control stud") || meshConverted.includes("case control stud")) {
	// 	  evaluation.studyType = "case control studies";
	//     evaluation.evidenceLevel = "4";
	//     needsHuman = false;
 //      evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("cross-sectional stud")) {
	// 	  evaluation.studyType = "cross-sectional studies";
	//     evaluation.evidenceLevel = "4";
	//     needsHuman = false;
 //      evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("prospective")) {
	// 	  if (abstractConverted.includes("p <") || abstractConverted.includes("p &lt;") || abstractConverted.includes("p =") || abstractConverted.includes("hazard ratio") || abstractConverted.includes("hazard") || abstractConverted.includes("odds ratio")) {
	// 		  evaluation.studyType = "prospective cohort study";
	// 	    evaluation.evidenceLevel = "2";
	// 	  } else {
	// 	  	evaluation.studyType = "prospective study w/ no cohort comparison";
	// 	    evaluation.evidenceLevel = "4";
	// 	  }; 
	//     needsHuman = false;
	//     evalComplete = true;
	//   };
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("retrospective")) {
	// 	  if (abstractConverted.includes("p <") || abstractConverted.includes("p &lt;") || abstractConverted.includes("p =") || abstractConverted.includes("hazard ratio") || abstractConverted.includes("hazard") || abstractConverted.includes("odds ratio")) {
	// 		  evaluation.studyType = "retrospective cohort study";
	// 	    evaluation.evidenceLevel = "3";
	// 	  } else {
	// 	  	evaluation.studyType = "retrospective study w/ no cohort comparison";
	// 	    evaluation.evidenceLevel = "4";
	// 	  };  
	//     needsHuman = false;
	//     evalComplete = true;
 //  	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("registr") || meshConverted.includes("database") || abstractConverted.includes("registr") || abstractConverted.includes("database")) {
	// 		if (abstractConverted.includes("p <") || abstractConverted.includes("p &lt;") || abstractConverted.includes("p =") || abstractConverted.includes("hazard ratio") || abstractConverted.includes("hazard") || abstractConverted.includes("odds ratio") || abstractConverted.includes("significant difference")){
	// 		  evaluation.studyType = "retrospective cohort study";
	// 	    evaluation.evidenceLevel = "3";
	// 	  } else {
	// 	  	evaluation.studyType = "retrospective study w/ no cohort comparison";
	// 	    evaluation.evidenceLevel = "4";
	// 		};			 
 //    needsHuman = false;
 //    evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("follow-up") || meshConverted.includes("follow up")) {
	// 	  evaluation.studyType = "prospective study";
 //      needsHuman = false;
 //      evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("treatment outcome")) {
	// 	  evaluation.studyType = "therapeutic study";
 //      needsHuman = false;
 //      evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("diagnostic") || meshConverted.includes("imaging") || meshConverted.includes("tomography") || meshConverted.includes("patholog")) {
	// 	  evaluation.studyType = "diagnostic study";
 //      needsHuman = false;
 //      evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("economy") || meshConverted.includes("cost-benefit") || abstractConverted.includes("cost")) {
	// 	  evaluation.studyType = "economic study";
 //      needsHuman = false;
 //      evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (pubTypeConverted.includes("histori") || meshConverted.includes("biography") || abstractConverted.includes("portrait")) {
	// 	  evaluation.studyType = "biography/historical study/portrait";
 //      needsHuman = false;
 //      evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("methods")) {
	// 	  if (meshConverted.includes("treatment")) {
	// 		  evaluation.studyType = "therapeutic study";
	// 		} else {
	// 			evaluation.studyType = "technique study";
	// 		};
	//     needsHuman = false;
	//     evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("education") || pubTypeConverted.includes("education") || pubTypeConverted.includes("narrative")) {
	// 		evaluation.studyType = "education";
	// 		needsHuman = false;
	// 	  evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("practice guideline")) {
	// 	  evaluation.studyType = "practice guideline";
	//     needsHuman = false;
	//     evalComplete = true;
	// 	};
	// };

	// if (evalComplete === false) {
	// 	if (meshConverted.includes("biomechanical")) {
	// 	  evaluation.studyType = "biomechanical";
	//     needsHuman = false;
	//     evalComplete = true;
	// 	};
	// };
