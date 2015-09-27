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
        //}).when('/register',
        //{
        //    templateUrl: '/views/register.html',
        //    controller: 'registerCtrl'
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

// User controllers
//app.controller('registerCtrl', ['$scope', '$http', function($scope, $http){
//    $scope.submit = function() {
//        $http.post('/register', $scope.form)
//            .then(function (response) {
//                console.log(response);
//            });
//    };
//}]);

app.controller('loginCtrl', ['$scope', '$rootScope', '$http', '$location', 'authService', function($scope, $http, authService, $location, $rootScope){
    $scope.submit = function() {
        $http.post('/login', $scope.order)
            .then(function (response) {
                authService.saveToken(response.data);
                $rootScope.order = authService.getUser();
                $location.path("/admin");
            });
    };
}]);

app.controller('navCtrl', ['$scope', '$rootScope', '$location', 'authService', function($scope, authService, $location, $rootScope){
    $rootScope.order = authService.getUser();
    if($rootScope.order && $rootScope.order.phone){
        $location.path('/admin');
    }
    $scope.logout = function(){
        authService.logout();
        $rootScope.order = authService.getUser();
        $location.path("/login");
    }
}]);

// Place order
app.controller('orderCtrl', ['$scope', '$http', function($scope, $http){

    $scope.subTotal = function(total){
        var calc = [];

        $scope.total = calc;
    }

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

// Admin update orders
app.controller('adminCtrl', ['$scope', '$http', function($scope, $http){
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