
var drug1nSample = angular.module("drug1nSample", ['ui.bootstrap', 'sampleSrv']);

var	AppCtrl	=	['$scope',	'dialogServices', 'dataServices',
function AppCtrl($scope,	dialogServices, dataServices)	{
 		
	// context ID is a configuration constant in this example
	$scope.context = 'drug1N'; 
	
	// init UI data model
	$scope.p = 
		{ Age:'35',	Sex:'M', BP:'NORMAL', Cholesterol:'NORMAL', Na:'0.697', K:'0.056' };
		
	$scope.score = function()	{
		dataServices.getScore($scope.context, $scope.p)
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

drug1nSample.controller("AppCtrl",	AppCtrl);
drug1nSample.controller("ResultsCtrl", ResultsCtrl);
drug1nSample.controller("ErrorCtrl", ErrorCtrl);


