// Reference Scripts/app/controller.js

describe('comharCtrl', function() {
  var $httpBackend;
  beforeEach(module('ComharNGApp'));

  var $controller;


  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));
    
  describe('Loading JSON', function() {
    it('Loads KPI JSON with a Title', function() {
      var $scope = {};
      var controller = $controller('comharCtrl', { $scope : $scope });
      $httpBackend.expectGET('Scripts/KPIInfo.js').respond({
        "P4PInfoId":1, 
        "ProgramName":"TCM", 
        "KpiId": "TCM-01-01:",
        "Heading": "Rationale", 
        "Text" : "To measure the continuity of service provided to CBH-funded TCM and ACT members."
      });
      $httpBackend.flush();
      expect($scope.data.Heading).toEqual("Rationale");
      
    });
   
    it('Loads Program JSON', function() {
      var $scope = {};
      var controller = $controller('programCtrl', { $scope : $scope });
      $httpBackend.expectGET('Scripts/program.js').respond({
      "ProgramId":5,"ProgramName":"TCM","ProgramAlias":"ETCM"
      });
      $httpBackend.flush();
      expect($scope.programs.ProgramName).toEqual("TCM");
    });
  });
});

describe('dateCtrl', function(){
  beforeEach(module('ComharNGApp'));

  var $controller, $scope, $rootScope;


  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;

  }));

  describe('Setting The Right Program Date', function() {
    it('Sets the proper year given the index', function() {
      var controller = $controller('dateCtrl', {$scope : $rootScope});
      console.log($rootScope)
      
      expect($rootScope.selected).toEqual("2012");
    });
  });
});