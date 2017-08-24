var questionBank = [
	
	question0 = {
		question: "Is there anklyosis/fusion of any part of the joint?",
		score: 4,
		binaryResponse: ["next", "end-with-score-change"], 
		getNextQuestion: function (integer) {
			var nextQuestion = ifNoFusion;
			return nextQuestion;
		},
		images: ["assets/images/Grade4Fused1.jpg", "assets/images/Grade4Fused3.jpg", "assets/images/Grade4Fused5.jpg"]
	},

	ifNoFusion = {
		question: "Are there bridging osteophytes (extension of bone across the joint)?",
		score: 3,
		binaryResponse: ["next", "next-with-score-change"],  
		getNextQuestion: function (integer) {
			if (integer === 0) {
				var nextQuestion = ifNoBO;
			} else if (integer === 1) {
				var nextQuestion = ifYesBO;
			}			
			return nextQuestion;
		},
		images: ["assets/images/Grade3BO1.jpg", "assets/images/Grade3BO2.jpg", "assets/images/Grade3BO3.jpg"]
	},

	ifNoBO = {
		question: "Is there severe lipping (beaking >3mm from the facet rim) with severe osteophytic reaction (irregular thickening and amassing of bone)?",
		score: 3,
		binaryResponse: ["next", "end-with-score-change"],
		getNextQuestion: function (integer) {
			var nextQuestion = ifNoSevLip;
			return nextQuestion;
		},
		images: ["assets/images/Grade3SevLip1.jpg", "assets/images/Grade3SevLip2.jpg", "assets/images/Grade3SevLip3.jpg",]
	},

	ifYesBO = {
		question: "Do the bridging osteophytes encompass more than 50% of the joint rim?",
		score: 1,
		binaryResponse: ["end", "end-with-score-change"],
		images: ["assets/images/Grade4BO.jpg", "assets/images/Grade4BO3.jpg"]
	},

	ifNoSevLip = {
		question: "Is there heaping (flat amassing of bone >2mm in thickness with >1 mm step-off) around the edges of either surface?",
		score: 2,
		binaryResponse: ["next", "next-with-score-change"],
		getNextQuestion: function (integer) {
			if (integer === 0) {
				var nextQuestion = ifNoHeap;
			} else if (integer === 1) {
				var nextQuestion = ifYesHeap;
			}
			return nextQuestion;
		},
		images: ["assets/images/Grade2Heaping1.jpg", "assets/images/Grade2Heaping2.jpg", "assets/images/Grade2Heaping3.jpg"],
	},

	ifNoHeap = {
		question: "Is there a shine on either surface (does light reflect of the surface at certain angles)?",
		score: 2,
		binaryResponse: ["next", "end-with-score-change"],
		getNextQuestion: function (integer) {
			var nextQuestion = ifNoShine;
			return nextQuestion;
		},
		images: ["assets/images/Grade2Shining4.jpg", "assets/images/Grade2Shining3.jpg", "assets/images/Grade2Shining6.jpg"]
	},

	ifYesHeap = {
		question: "Does the heaping occupy 100% of the edges of either surface?",
		score: 1,
		binaryResponse: ["end", "end-with-score-change"],
		images: ["assets/images/Grade3Heap1.jpg", "assets/images/Grade3Heap2.jpg"]
	},

	ifNoShine = {
		question: "Look at the sides of the facet rims: is there any lipping (sheetlike extensions of the joint surface) surrounding more than 50% of the rim?",
		score: 2,
		binaryResponse: ["next", "end-with-score-change"],
		getNextQuestion: function (integer) {
			var nextQuestion = ifNoMildLip50;
			return nextQuestion;
		},
		images: ["assets/images/Grade2ModLip1.jpg", "assets/images/Grade2ModLip2.jpg", "assets/images/Grade2ModLip3.jpg"]
	},

	ifNoMildLip50 = {
		question: "Does the lipping surround more than 1/8 of the facet rim?",
		score: 1,
		binaryResponse: ["next", "end-with-score-change"],
		getNextQuestion: function (integer) {
			var nextQuestion = ifNoMildLip;
			return nextQuestion;
		},
		images: ["assets/images/Grade1Lip1.jpg", "assets/images/Grade1Lip2.jpg", "assets/images/Grade1Lip3.jpg"]	
	},

	ifNoMildLip = {
		question: "Palpate the facet rims: is there any osteophyte reaction (anything pointy or sharp) at more than 50% of the rim?",
		score: 2,
		binaryResponse: ["next", "end-with-score-change"],
		getNextQuestion: function (integer) {
			var nextQuestion = ifNoPointy50;
			return nextQuestion;
		},
		images: ["assets/images/Grade2Pointy1.jpg", "assets/images/Grade2Pointy2.jpg", "assets/images/Grade2Pointy4.jpg"]
	},

	ifNoPointy50 = {
		question: "Palpate the facet rims: is there any osteophyte reaction (anything pointy or sharp) at more than 1/8 of the rim?",
		score: 1,
		binaryResponse: ["end", "end-with-score-change"],
		images: ["", "assets/images/Grade1Pointy.jpg", ""]
	},

	noArthritis = {
		images: ["assets/images/Grade0Inferior1.jpg", "assets/images/Grade0Superior1.jpg", "assets/images/Grade0Superior2.jpg"]
	}

];