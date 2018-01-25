var titleGrabber = function(articleObj, hasTitle) {
	
	var title = "";
	
	for (var x in articleObj["Article"]) {
	    if (x === "ArticleTitle") {
	    	title = articleObj["Article"]["ArticleTitle"];
	 		hasTitle = true;
	    };
	};
	
	if (hasTitle === false) {
		title = "No title";
	};  

	return title;
};

var yearGrabber = function(articleObj, hasYear) {
	
	var year = 0;

	for (var x in articleObj) {
	    if (x === "DateCompleted") {
			year = articleObj["DateCompleted"]["Year"];
			hasYear = true;
	    };
  	};
    
	if (hasYear === false) {
		year = "No year";
	};  

  return year;
};

function authorGrabber(articleObj, hasAuthor) {

	var authors = {
		names: "N/A",
		firstAuthorFirstName: "N/A",
		firstAuthorFullName: "N/A",
		lastAuthorFirstName: "N/A",
		lastAuthorFullName: "N/A",
		firstAuthorAffiliation: "N/A",
		count: 0
	};

	for (var x in articleObj["Article"]) {
		if (x === "AuthorList") {
			hasAuthor = true;
			var hasMultipleAuthors = false;
			var authorListLength = articleObj["Article"]["AuthorList"]["Author"].length;
			
			//If multiple authors.
			if (authorListLength > 1) {
				hasMultipleAuthors = true;
				var authorCounter = 0;
				var authorsArray = [];
				var authorsArrayExport = [];

				for (var j = 0; j < authorListLength; j++) {

					var hasFirstName = false;
					var hasCollectiveName = false;
					var hasInitials = false;	
					var jthAuthorObj = articleObj["Article"]["AuthorList"]["Author"][j]; 

					if (j === 0) {
						for (var k in jthAuthorObj) {
							if (k === "AffiliationInfo") {
								if (jthAuthorObj[k] instanceof Array === false) {
									authors["firstAuthorAffiliation"] = jthAuthorObj[k]["Affiliation"];
								} else if (jthAuthorObj[k] instanceof Array === true) {
									authors["firstAuthorAffiliation"] = "";
									for (x in jthAuthorObj[k]) {
										authors["firstAuthorAffiliation"] += (jthAuthorObj[k][x]["Affiliation"] + " || ") 
									}
								}
							};
						};
					};
					
					for (var k in jthAuthorObj) {
						if (k === "CollectiveName") {
							hasCollectiveName = true;
							authorsArray.push(["**CONSORTIUM**", jthAuthorObj.CollectiveName]);		
						};
					};

					if (hasCollectiveName === false) {
						for (var k in jthAuthorObj) {
							if (k === "ForeName") {
								hasFirstName = true;
							};
							if (k === "Initials") {
								hasInitials = true;
							}
						};

						if (hasFirstName === true) {
							authorsArray.push([jthAuthorObj.ForeName, jthAuthorObj.LastName]);
						} else if (hasFirstName === false & hasInitials === true) {
							authorsArray.push([jthAuthorObj.Initials, jthAuthorObj.LastName]);
						} else if (hasFirstName === false & hasInitials === false) {
							authorsArray.push(["", jthAuthorObj.LastName]);
						}
					};
					authorCounter++;
				};		

				for (var i = 0; i < authorsArray.length; i++) {
					var eachAuthor = authorsArray[i].join(" ");
					eachAuthors = eachAuthor.trim();
					authorsArrayExport.push(eachAuthor);
				};
				authors.names = authorsArrayExport.join(", ");
				authors.firstAuthorFirstName = authorsArray[0][0].split(" ")[0];
				authors.firstAuthorFullName = authorsArray[0][1]+", "+authorsArray[0][0];
				if (authorsArray[authorListLength-1] === "**CONSORTIUM**") {
					authors.lastAuthorFirstName = "**CONSORTIUM** "+authorsArray[authorListLength-1][1];
					authors.lastAuthorFullName = "**CONSORTIUM**";					
				} else {
					authors.lastAuthorFirstName = authorsArray[authorListLength-1][0].split(" ")[0];
					authors.lastAuthorFullName = authorsArray[authorListLength-1][1]+", "+authorsArray[authorListLength-1][0];
				};
				authors.count = authorCounter;
			};

			//If only one author.
			if (hasMultipleAuthors === false) {
				var hasFirstName = false;
				var hasCollectiveName = false;
				var authorsArray = [];

				// console.log(articleObj.Article[0].AuthorList[0].Author[0])

				for (var x in articleObj.Article.AuthorList.Author) {
					if (x === "AffiliationInfo") {
						authors.firstAuthorAffiliation = articleObj.Article.AuthorList.Author.AffiliationInfo.Affiliation;
						if (articleObj.Article.AuthorList.Author.AffiliationInfo instanceof Array === false) {
							authors["firstAuthorAffiliation"] = articleObj.Article.AuthorList.Author.AffiliationInfo.Affiliation;
						} else if (articleObj.Article.AuthorList.Author.AffiliationInfo instanceof Array === true) {
							authors["firstAuthorAffiliation"] = "";
							for (p in articleObj.Article.AuthorList.Author.AffiliationInfo) {
								authors["firstAuthorAffiliation"] += (articleObj.Article.AuthorList.Author.AffiliationInfo[p]["Affiliation"] + " || ") 
							}
						}
					};

					if (x === "ForeName") {
						hasFirstName = true;
					};
					if (x === "CollectiveName") {
						hasCollectiveName = true;
					};
				};

				if (hasFirstName === true) {
					authorsArray = [articleObj.Article.AuthorList.Author.ForeName, articleObj.Article.AuthorList.Author.LastName];
				} else if (hasFirstName === false) {
					authorsArray = [""+articleObj.Article.AuthorList.Author.Initials, articleObj.Article.AuthorList.Author.LastName];
				};
				
				authors.names = authorsArray.join(" ");
				authors.firstAuthorFirstName = authorsArray[0].split(" ")[0];
				authors.firstAuthorFullName = authorsArray[1]+", "+authorsArray[0];
				authors.count = 1;
			};
		};
	};

	//If no author.
	if (hasAuthor === false) {
    authors.names = "No author";
  };  

  return authors;
};

var abstractGrabber = function(articleObj, hasAbstract) {

	var abstract = {
		string: "",
		array: [],
		LOE: "N/A"
	};

	for (var x in articleObj.Article) {
    if (x === "Abstract") {
    	hasAbstract = true;
    	var multipleSections = true;
      
    	if (typeof(articleObj.Article.Abstract.AbstractText) === "string") {
    	
	      var tempAbstractString = articleObj.Article.Abstract.AbstractText;
        var abstractCharArray = tempAbstractString.split(""); 
        for (i = 0; i < (abstractCharArray.length-1); i++) {
        	if (abstractCharArray[i] === ".") {
        		if (abstractCharArray[i+1].charCodeAt(0) < 32 || abstractCharArray[i+1].charCodeAt(0) > 126) {
        			abstractCharArray[i+1] = " ";
        		}; 
        	};
        };
        abstract.string = abstractCharArray.join("");
    
        var abstractArray = abstract.string.split(". ")
        for (var i = 0; i < abstractArray.length; i++) {
	    		var tempArray = abstractArray[i].split(" ");
	    		abstract.array.push(tempArray);
	    	};   
	      multipleSections = false;
      };
                    
    	if (multipleSections === true) {
      	var abstractArray = [];
      	for (var k=0; k<articleObj.Article.Abstract.AbstractText.length; k++) {                  
      		for (var z in articleObj.Article.Abstract.AbstractText[k]) {
        		if (z === "@attributes") {
          			var sectionHead = articleObj.Article.Abstract.AbstractText[k][z]["Label"];
        		};
        		if (z === "#text") {
        			var sectionContent = articleObj.Article.Abstract.AbstractText[k][z];
        			if (sectionHead.toLowerCase().includes("level of evidence")) {
        				if (sectionContent.toLowerCase().includes(" i")) {
        					abstract.LOE = "1";
        				};
        				if (sectionContent.toLowerCase().includes(" ii")) {
        					abstract.LOE = "2";
        				};
        				if (sectionContent.toLowerCase().includes(" iii")) {
        					abstract.LOE = "3";
        				};
        				if (sectionContent.toLowerCase().includes(" iv")) {
        					abstract.LOE = "4";
        				};
        				if (sectionContent.toLowerCase().includes(" v")) {
        					abstract.LOE = "5";
        				};
        				sectionContent = "";	
        			};
        		};
      		};
      		abstractArray.push(sectionHead+": "+sectionContent);
      	};
	    	abstract.string = abstractArray.join(" ");
	    	for (var i = 0; i < abstractArray.length; i++) {
	    		var tempArray = abstractArray[i].split(" ");
	    		abstract.array.push(tempArray);
	    	};   
    	};
  	};
  };   

  if (hasAbstract === false) {
      abstract.string = "No abstract";
  };
  return abstract;
};

var meshGrabber = function(articleObj, hasMesh) {
	
	var meshTerms = "";

	for (var x in articleObj) {
		if (x === "MeshHeadingList") {
			hasMesh = true;
		};
	};

	if (hasMesh === true) {
  	var meshArray = [];
		for (var i=0; i<articleObj.MeshHeadingList.MeshHeading.length; i++) {
			var mesh = "";
			for (var x in articleObj.MeshHeadingList.MeshHeading[i]) {
				if (x === "DescriptorName") {
					mesh += articleObj.MeshHeadingList.MeshHeading[i][x]["#text"];
				};
				if (x === "QualifierName") {
					mesh += ("/"+articleObj.MeshHeadingList.MeshHeading[i][x]["#text"]);
				};
			};
			meshArray.push(mesh);
		};
		meshTerms = meshArray.join(", ");
	};

	if (hasMesh === false) {
		meshTerms = "No mesh terms."
	};

	return meshTerms;
};

var pubTypeGrabber = function(articleObj, hasPubType) {

	var pubType = "";

	for (var x in articleObj.Article) {
		if (x === "PublicationTypeList") {
			hasPubType = true;
		};
	};

	if (hasPubType === true) {
		var multiplePubTypes = false;
		var pubTypeArray = [];
		
		for (var x in articleObj.Article.PublicationTypeList.PublicationType) {
			if (x === "0") {
				multiplePubTypes = true;
			};
		};
		
		if (multiplePubTypes === true) {
			for (var i=0; i<articleObj.Article.PublicationTypeList.PublicationType.length; i++) {
				pubTypeArray.push(articleObj.Article.PublicationTypeList.PublicationType[i]["#text"]);
			};
  		pubType = pubTypeArray.join(", ");
		};

		if (multiplePubTypes === false) {
			pubType = articleObj.Article.PublicationTypeList.PublicationType["#text"];
		};
	};

	if (hasPubType === false) {
		pubType = "No pub type listed."
	};

	return pubType;
};

// var pagesGrabber = function() {};