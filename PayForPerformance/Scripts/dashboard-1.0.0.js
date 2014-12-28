/// <reference path="dashboardApi-1.0.0.js" />
// JavaScript source code

$(function () {

  $(document).bind('mobileinit', function () {
    $.mobile.selectmenu.prototype.options.nativeMenu = false;
  });

  $(".fiscalYearListItem").click(function () {
    var test = this;
    $('.fiscalYearLabel').text($(this).text());
    $('#fiscalYearPopup').popup("close");

  });

  var baseUrl = window.location.protocol + '//' + window.location.hostname + "/";
  var sourceUrl = "/Scripts/encounterDetail.js";
  var summaryUrl = "/Scripts/summary.js";
  var summarySourceUrl = baseUrl + "PayForPerformanceWebApi/api/summary"
  var encounterDetailSourceUrl = baseUrl + "PayForPerformanceWebApi/api/encounterDetail"
    try {
        $.getJSON(summaryUrl, function (summaryData) {
            $('#tcm-01-01').on('click', function () {
                setTimeout(function () { //Delay until chart container is visible in DOM. 
                    comharApp.dxChart.tcmChart01($('#chart2-TCM-01-01'), summaryData)
                }, 1);

                comharApp.highCharts.tcmChart0102($('#chart-TCM-01-02'), summaryData);
            });

            $('#tcm-02-01').click(function () {
                comharApp.highCharts.tcmChart0201($('#chart-TCM-02-01'), summaryData);
            });

            $('#tcm-03-01').on('click', function () {
                comharApp.highCharts.tcmChart0301($('#chart-TCM-03-01'), summaryData);
            });
            $('#tcm-04-01').on('click', function () {
                comharApp.highCharts.tcmChart0401($('#chart-TCM-04-01'), summaryData);
            });
        });
    }
    catch (err)
    {
        console.log(err);
    }


    $.getJSON(sourceUrl, function (encounterData) {
      fixedDataSet = comharApp.fixDates(encounterData);
      comharApp.setGrid($('#gridContainer'));
    
      setTimeout(function(){ //Color Data Initially
        comharApp.colorData();
      }, 1000);
    
      $('.dx-pages').click(function (){ //Set Event Listener for Pagination
      
      setTimeout(function() {
        comharApp.colorData();
      }, 50);
    });
    $('#download-CSV').click(function() {
     
      var jsonString = JSON.stringify(encounterData);
      var csvString = csvConverter.convertCSV(jsonString);
      if (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) {  // Determine if client is IE11
         
        var blob = new Blob([csvString],{
        type: "text/csv;charset=utf-8;"
        });
        window.navigator.msSaveBlob(blob, "tcm-01.csv");

      } else {

        window.open("data:text/csv;charset=utf-8," + escape(csvString));
     }
    });
    $('#download-CSV').click(function(event){
      var jsonString = JSON.stringify(encounterData);
      var csvString = csvConverter.convertCSV(jsonString);
      if (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) {  // Determine if client is IE11
         
        var blob = new Blob([csvString],{
        type: "text/csv;charset=utf-8;"
        });
        window.navigator.msSaveBlob(blob, "tcm-01.csv");

      } else {

        window.open("data:text/csv;charset=utf-8," + escape(csvString));
     }
    });
    
    $('.dx-datagrid-action-cursor').on('click', function(){
       setTimeout(function() {
        comharApp.colorData();
      }, 50);
    })
  }).fail(function(err) {
    console.log("error");
  });
});
