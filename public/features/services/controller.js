angular.module('app', []);
angular.module('app').controller('bootcampCtrl', function($scope, $http) {

	//** These methods are for you to use in your Angular Front End Forms **

	//Go to http://localhost:3000/mainComments to view the data

	//Use mongo to view the database. You can type show dbs to see the database

	//Creates a new comment - you may use this in your angular front end
	$scope.create = function() {
		$http.post('/mainComments', $scope.comments) //make http post request to the server
		.success(function(response) {
			$scope.all();
		});
	};

	// Passes the data to the mainComments array
	$scope.rendermainComments = function(response) {
		$scope.mainComments = response;
	};

	// Removes the comment from the database
	$scope.remove = function(id) {
		$http.delete('/mainComments/' + id)
		.success(function(response) {
			$scope.all(); //after remove from database you retrieve all data again from the database
		}); 
	};

	// Selects the comment from the database
	$scope.select = function(id) {
		$http.get('/mainComments/' + id)
		.success(function(response) {
			$scope.comments = response;
		});
	};

	// Displays all of the comments from the database
	$scope.all = function() { //get all on demand
		$http.get('/mainComments')
		.success($scope.rendermainComments);
	};

	$scope.all(); 

});
