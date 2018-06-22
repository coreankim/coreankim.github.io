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
     $("#msg-success").html("<h2>Compiling search...</h2>") 


    var exportedDataObj = {};

    inputObject["journalName"] = $("#journal-name").val();
    inputObject["startYear"] = $("#start-year-input").val().trim();
    inputObject["endYear"] = $("#end-year-input").val().trim();
    inputObject["numResults"] = $("#num-results-input").val().trim();

    var eSearchURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term="+inputObject["journalName"]+"[ta]&mindate="+inputObject["startYear"]+"&maxdate="+inputObject["endYear"]+"&retmax="+inputObject["numResults"]+"&retmode=json";

    $.getJSON(eSearchURL, function(data) {
      var ids = data.esearchresult.idlist;
      var api_key = "4b56eadb481364e6c610fea520300a094108"
      var abstractObj = {};      
      var eFetchURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id="+ids+"&rettype=abstract&api_key="+api_key;
      console.log(eFetchURL)    
 
      $.get(eFetchURL, function(data) {
        var abstractObj = {};
        var articleArray = xmlToJson(data).PubmedArticleSet[1].PubmedArticle; 
        // console.log(articleArray)
        // console.log(articleArray.length)

        for (var i = 0; i < articleArray.length; i++) {
          var hasTitle = false;
          var hasYear = false;
          var hasPage = false;
          var hasAuthor = false;
          var hasAbstract = false;
          var hasMesh = false;
          var hasPubType = false;
          var hasDOI = false;
          var hasPII = false;
          var article = articleArray[i].MedlineCitation;
          var articlePMID = article.PMID["#text"];
          var ArticleIDList = articleArray[i]["PubmedData"]["ArticleIdList"]["ArticleId"]
          var abstractArray = [];

          abstractObj["UID"+articlePMID] = {};
          abstractObj["UID"+articlePMID]["UID"] = articlePMID;
          abstractObj["UID"+articlePMID]["DOI"] = articleIDGrabber(ArticleIDList, hasPII, hasDOI)["DOI"]
          abstractObj["UID"+articlePMID]["PII"] = articleIDGrabber(ArticleIDList, hasPII, hasDOI)["PII"]
          abstractObj["UID"+articlePMID]["Journal"] = inputObject["journalName"];
          var dateInfo = yearGrabber(article, inputObject["startYear"].split("/")[0], hasYear)
          abstractObj["UID"+articlePMID]["Year"] = dateInfo["year"];
          abstractObj["UID"+articlePMID]["Full date"] = dateInfo["month"] + "/" + dateInfo["day"] + "/" + dateInfo["year"]
          var authorInfo = authorGrabber(article, hasAuthor);
          abstractObj["UID"+articlePMID]["Authors"] = authorInfo["names"];
          abstractObj["UID"+articlePMID]["First Author Affiliation"] = authorInfo["firstAuthorAffiliation"];
          abstractObj["UID"+articlePMID]["Author Count"] = authorInfo["count"];
          abstractObj["UID"+articlePMID]["Pagination"] = paginationGrabber(article, hasPage);
          abstractObj["UID"+articlePMID]["Title"] = titleGrabber(article, hasTitle);
          var abstractInfo = abstractGrabber(article, hasAbstract);
          abstractObj["UID"+articlePMID]["Abstract"] = abstractInfo;
          abstractObj["UID"+articlePMID]["MeSH terms"] = meshGrabber(article, hasMesh);
          abstractObj["UID"+articlePMID]["Publication type"] = pubTypeGrabber(article, hasPubType);
          abstractObj["UID"+articlePMID]["Abstract"] = abstractInfo["string"];
          abstractObj["UID"+articlePMID]["Abstract, char"] = abstractInfo["array"];
          abstractObj["UID"+articlePMID]["Official LOE"] = abstractInfo["LOE"]; 
        };

        var abstractArray = [];
        for (var x in abstractObj) {
          abstractArray.push(abstractObj[x]);
        };
        console.log(abstractArray)
        $("#msg-success").append("<h2><p>Articles successfully retrieved! Click 'Get CSV!'' to download results in CSV form.</p><p>To view data, in Excel click Data --> From Text, then type in @ for the delimiter.</p>")
        $("#getCsv").on("click", function(event) {
          JSONToCSVConvertor(abstractArray, "abstracts", true)
        });
      });
    });
  }); 
});   
