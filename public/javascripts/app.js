var app = angular.module('pieApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.when('/',
        {
            templateUrl: '/views/index.html'
        }).when('/login',
        {
            templateUrl: '/views/login.html',
            controller: 'loginCtrl'
        }).when('/order',
        {
            templateUrl: '/views/order.html',
            controller: 'orderCtrl'
        }).when('/apple',
        {
            templateUrl: '/views/pies/apple.html'
        }).when('/chocolate',
        {
            templateUrl: '/views/pies/chocolate.html'
        }).when('/cranberry',
        {
            templateUrl: '/views/pies/cranberry.html'
        }).when('/maple',
        {
            templateUrl: '/views/pies/maple.html'
        }).when('/pear',
        {
            templateUrl: '/views/pies/pear.html'
        }).when('/pecan',
        {
            templateUrl: '/views/pies/pecan.html'
        }).when('/pumpkin',
        {
            templateUrl: '/views/pies/pumpkin.html'
        }).when('/admin',
        {
            templateUrl: 'private/views/admin.html',
            controller: 'adminCtrl'
        }).otherwise({
            redirectTo: '/views/index.html'
        });

    $httpProvider.interceptors.push('authInterceptor');
}]);

// Place order
app.controller('orderCtrl', ['$scope', '$http', function($scope, $http){
    $scope.total = 0.00;
    $scope.subTotal = function(){
        $http({
            method: 'POST',
            url: '/pie',
            data: $scope.order.pie,
            datatype: JSON
        }).then(function(res){
            console.log("Updating total:", res);
            $scope.total = res.data;
        })
    };

    $scope.createOrder = function(order){
        console.log(order);
        $http({
            method: 'POST',
            url: '/order',
            data: order,
            datatype: JSON
        }).then(function(res){
            console.log(res.data);
            $scope.order = res.data;
        })
    };

}]);

// Admin controllers - Login and update
app.controller('loginCtrl', ['$scope', '$rootScope', '$http', '$location', 'authService', function($scope, $rootScope, $http, $location, authService){
    $scope.submit = function() {
        $http.post('/login', $scope.form)
            .then(function (response) {
                authService.saveToken(response.data);
                $rootScope.order = authService.getUser();
                $location.path("/admin");
            });
    };
}]);

app.controller('adminCtrl', ['$scope', '$http', function($scope, $http){
    $scope.updateList = function(){
        $http({
            method: 'GET',
            url: '/admin/log'
        }).then(function(res){
            $scope.items = res.data;
            console.log($scope.items);
        });
        $scope.predicate = 'lastName';
        $scope.reverse = true;
        $scope.order = function(predicate){
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        }
    };

}]);

// Services for authentication
app.service('authService', ['$window', function ($window){
    this.parseJwt = function (token) {
        if (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        } else return {};
    };

    this.saveToken = function (token) {
        $window.localStorage.jwtToken = token;
        console.log('Saved token:',$window.localStorage.jwtToken);
    };

    this.getToken = function () {
        return $window.localStorage.jwtToken;
    };

    this.isAuthed = function () {
        var token = this.getToken();
        if (token) {
            var params = this.parseJwt(token);
            var notExpired = Math.round(new Date().getTime() / 1000) <= params.exp;
            if (!notExpired) {
                this.logout();
            }
            return notExpired;
        } else {
            return false;
        }
    };

    this.logout = function () {
        delete $window.localStorage.jwtToken;
    };

    // expose user as an object
    this.getUser = function () {
        return this.parseJwt(this.getToken())
    };
}]);

app.factory('authInterceptor', ['$q', '$location', 'authService', function ($q, $location, authService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (authService.isAuthed()) {
                config.headers.Authorization = 'Bearer ' + authService.getToken();
            }
            return config;
        },
        response: function (response) {

            if (response.status === 401) {

                // handle the case where the user is not authenticated
                $location.path("/login");
            }
            return response || $q.when(response);
        }, responseError: function (response) {
            if (response.status === 401) {
                $location.path("/login");

            } else {
                console.log(response);
            }
            return $q.reject(response);
        }
    };
}]);