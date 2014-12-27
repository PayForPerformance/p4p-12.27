comharApp.fixDates = function (encounterData) {
  betterDates = encounterData.map(function (data) {
    data["EncounterStartDate"] = new Date(data["EncounterStartDate"]);
    data["EncounterEndDate"] = new Date(data["EncounterEndDate"]);
    return data;
  });
  return betterDates;
};

comharApp.colorData = function () {
  var $elements = $('.elapsedDays');
  $elements.each(function(){
    if ($(this).text() > 30) {
      $(this).css("background", "#CC0000");
      $(this).css("color", "#ffffff");
    } else if ($(this).text() > 15 && $(this).text() <= 30) {
      $(this).css("background", "yellow");
    };
  });
};

comharApp.setGrid = function(container) {
  container.dxDataGrid({
    dataSource: fixedDataSet,
    columns: [
      { dataField: 'Clinician' },
      { dataField: 'PatientId' },
      { dataField: 'PatientName' },
      { dataField: 'EncounterStartDate', format: 'shortDate', allowFiltering: true},
      { dataField: 'EncounterEndDate', format: 'shortDate', allowFiltering: true},
      { dataField: 'ElapsedDays', cssClass: 'elapsedDays'}
    ], 
    columnChooser: { enabled: true },
    filterRow: { visible: true },
    pager: { visible: true },
    paging: { pageSize: 7 },
    contentReadyAction: function(e) {
    e.element.find('.dx-header-row .dx-datagrid-action-cursor')
    .on('click', function() { 
      setTimeout(function(){ 
        comharApp.colorData();
      }, 100)
    e.element.find('.dx-dropdowneditor-input-wrapper')
    .on('click', function() {
      setTimeout(function(){
        comharApp.colorData();
      }, 100)
    })
       
    });
  },
    width: function(){
      return "100%";
    }
  });
};

