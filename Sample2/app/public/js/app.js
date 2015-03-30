
var tsSample = angular.module("tsSample", ['ui.bootstrap', 'sampleSrv']);

var	AppCtrl	=	['$scope',	'dialogServices', 'dataServices',
function AppCtrl($scope,	dialogServices, dataServices)	{

	$scope.mIdx = 0; 		
	$scope.context = ['catalogTS', 'catalogSTS'];
	$scope.fld = ['men', 'women']; 
	$scope.modelType = ['Time Series', 'Streaming TS'];
	
	// init UI data model
	$scope.sales = [10000, 20000, 30000, 40000];
		
	$scope.score = function()	{
		dataServices.getScore($scope.context[$scope.mIdx], $scope.fld[$scope.mIdx], $scope.sales)
		.then(
			function(rtn) {
				if (rtn.status == 200){
					// success
					$scope.showResults(rtn.data);
				} else {
					//failure
					$scope.showError(rtn.data.message);
				}
			},
			function(reason) {
				$scope.showError(reason);
			}
		);
	}
		
	$scope.showResults = function(rspHeader, rspData) {
		dialogServices.resultsDlg(rspHeader, rspData).result.then();
	}
		
	$scope.showError = function(msgText) {
		dialogServices.errorDlg("Error", msgText).result.then();
	}
}]

var	ResultsCtrl = ['$scope',	'$modalInstance',	'rspHeader', 'rspData',
function ResultsCtrl($scope,	$modalInstance, rspHeader, rspData) {
	$scope.rspHeader = rspHeader;
	$scope.rspData = rspData;
	
	$scope.cancel	=	function() {
		$modalInstance.dismiss();
	}
}]

var	ErrorCtrl = ['$scope',	'$modalInstance',	'msgTitle',	'message',
function ErrorCtrl($scope,	$modalInstance,	msgTitle,	message) {

	$scope.msgTitle	=	msgTitle;
	$scope.message = message;
	
	$scope.cancel	=	function() {
		$modalInstance.dismiss();
	}
}]

tsSample.controller("AppCtrl",	AppCtrl);
tsSample.controller("ResultsCtrl", ResultsCtrl);
tsSample.controller("ErrorCtrl", ErrorCtrl);
