angular.module("booted")
     .controller('submitCtrl',['$rootScope','$scope', '$http', function($rootScope,$scope,$http) {
       $scope.submit = function() {
         //if there is text
         if ($scope.text) {
           num++;
           //split the name and email
           var data = $scope.text.split(' ');

           informationToSend = {
             email: data[1], 
             id: num,
             name: data[0]
           };
         $http.post('http://localhost:3000/api/users', JSON.stringify(informationToSend));
         $scope.text = '';
         }
       };
     }]);




// }