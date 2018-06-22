$(document).ready(function() {

  //Displays gifs corresponding to the clicked button.
  var inputObject = {
    "journalName": "",
    "startYear": "",
    "endYear": "",
    "numResults": ""
  }

  $("#search").on("click", function showResults(event) {  

    event.preventDefault();

    var exportedDataObj = {};

    inputObject["journalName"] = $("#journal-name").val();
    inputObject["startYear"] = $("#start-year-input").val().trim();
    inputObject["endYear"] = $("#end-year-input").val().trim();
    inputObject["numResults"] = $("#num-results-input").val().trim();

    var eSearchURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term="+inputObject["journalName"]+"[ta]&mindate="+inputObject["startYear"]+"&maxdate="+inputObject["endYear"]+"&retmax="+inputObject["numResults"]+"&retmode=json";

    $.getJSON(eSearchURL, function(data) {
      var ids = data.esearchresult.idlist;
      var abstractObj = {};      
      var eFetchURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id="+ids+"&rettype=abstract";
      console.log(eFetchURL)    
 
      $.get(eFetchURL, function(data) {
        var abstractObj = {};
        var articleArray = xmlToJson(data).PubmedArticleSet[1].PubmedArticle; 
        console.log(articleArray)
        console.log(articleArray.length)

        for (var i = 0; i < articleArray.length; i++) {
          var hasTitle = false;
          var hasYear = false;
          var hasAuthor = false;
          var hasAbstract = false;
          var hasMesh = false;
          var hasPubType = false;
          var article = articleArray[i].MedlineCitation;
          var articlePMID = article.PMID["#text"];
          var abstractArray = [];

          abstractObj["UID"+articlePMID] = {};
          abstractObj["UID"+articlePMID]["UID"] = articlePMID;
          abstractObj["UID"+articlePMID]["Journal"] = inputObject["journalName"];
          abstractObj["UID"+articlePMID]["Year"] = yearGrabber(article, hasYear);
          var authorInfo = authorGrabber(article, hasAuthor)
          abstractObj["UID"+articlePMID]["Authors"] = authorInfo["names"];
          // var genders = getGender(authorInfo["firstAuthorFirstName"], authorInfo["lastAuthorFirstName"]); 
          abstractObj["UID"+articlePMID]["First Author First Name"] = authorInfo["firstAuthorFirstName"];
          // abstractObj["UID"+articlePMID]["First Author Gender"] = genders[0];
          abstractObj["UID"+articlePMID]["First Author Full Name"] = authorInfo["firstAuthorFullName"];          
          abstractObj["UID"+articlePMID]["First Author Affiliation"] = authorInfo["firstAuthorAffiliation"];
          abstractObj["UID"+articlePMID]["First Author Country"] = authorInfo["firstAuthorCountry"];
          abstractObj["UID"+articlePMID]["First Author Department"] = authorInfo["firstAuthorDepartment"];
          abstractObj["UID"+articlePMID]["First Author State"] = authorInfo["firstAuthorState"];
          abstractObj["UID"+articlePMID]["Last Author First Name"] = authorInfo["lastAuthorFirstName"];
          // abstractObj["UID"+articlePMID]["Last Author Gender"] = genders[1];
          abstractObj["UID"+articlePMID]["Last Author Full Name"] = authorInfo["lastAuthorFullName"];
          abstractObj["UID"+articlePMID]["Author Count"] = authorInfo["count"];
          abstractObj["UID"+articlePMID]["Title"] = titleGrabber(article, hasTitle);
          var abstractInfo = abstractGrabber(article, hasAbstract);
          abstractObj["UID"+articlePMID]["Abstract"] = abstractInfo;
          abstractObj["UID"+articlePMID]["MeSH terms"] = meshGrabber(article, hasMesh);
          abstractObj["UID"+articlePMID]["Publication type"] = pubTypeGrabber(article, hasPubType);
          var evaluationInfo = evaluateStudy(abstractObj["UID"+articlePMID]);
          abstractObj["UID"+articlePMID]["Abstract"] = abstractInfo["string"];
          abstractObj["UID"+articlePMID]["Final study type"] = evaluationInfo["studyType"];
          abstractObj["UID"+articlePMID]["Official LOE"] = abstractInfo.LOE; 
          abstractObj["UID"+articlePMID]["Level of evidence"] = evaluationInfo.evidenceLevel;
        };

        var abstractArray = [];
        for (var x in abstractObj) {
          abstractArray.push(abstractObj[x]);
        };
        console.log(abstractArray)
        $("#msg-success").html("Articles successfully retrieved! Click 'Get CSV!' to download results. \nIn Excel, select 'Data' --> 'From Text' --> 'Delimited' --> 'Other' --> '@'")
        $("#getCsv").on("click", function(event) {
          JSONToCSVConvertor(abstractArray, "abstracts", true)
        });
      });
    });
  }); 
});   
