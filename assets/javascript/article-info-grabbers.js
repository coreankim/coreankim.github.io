var titleGrabber = function(articleObj, hasTitle) {
	
	var title = "";
	
	for (var x in articleObj.Article) {
    if (x === "ArticleTitle") {
    	title = articleObj.Article.ArticleTitle;
      hasTitle = true;
    };
	};
	
	if (hasTitle === false) {
		title = "No title";
	};  

	return title;
};

var yearGrabber = function(articleObj, hasTitle) {
	
	var year = 0;

	for (var x in articleObj) {
    if (x === "DateCreated") {
			year = articleObj.DateCreated.Year;
			hasYear = true;
    };
  };
    
  if (hasYear === false) {
		year = "No year";
  };  

  return year;
};

var authorGrabber = function(articleObj, hasAuthor) {
	
	var authors = {
		names: "",
		count: 0
	};

	for (var x in articleObj.Article) {
		if (x === "AuthorList") {
			hasAuthor = true;
			var multipleAuthors = true;
			for (var y in articleObj.Article.AuthorList.Author) {
				if (y === "LastName") {
					authors.names = articleObj.Article.AuthorList.Author.ForeName+" "+articleObj.Article.AuthorList.Author.LastName;
					multipleAuthors = false;
					authors.count = 1;
				};
			};
	        
			if (multipleAuthors === true) {
				var authorCounter = 0;
				var authorsArray = [];
				for (var j=0; j<articleObj.Article.AuthorList.Author.length; j++) {
					authorsArray.push(articleObj.Article.AuthorList.Author[j].ForeName+" "+articleObj.Article.AuthorList.Author[j].LastName);
					authorCounter++;
				};
				authors.names = authorsArray.join(", ");
				authors.count = authorCounter;
			};
		};
	}
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

  console.log(abstract)
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