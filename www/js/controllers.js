angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};



        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        },

            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })

    .controller('HomeCtrl', function ($scope, $stateParams, $location, $state) {
        console.log("in home ctrl");
        $scope.postRide = function () {
            console.log("in post ride");
            $state.go("app.postryd")
        };

        $scope.getRide = function () {
            console.log("in post ride");
            $state.go("app.getryd")
        };
    })

    .controller('GetRideCtrl', function ($scope,$state) {
        $scope.goToMap = function(){
            $state.go("app.mapride");
        }
    })

    .controller('PostRideCtrl', function ($scope) {

    })

    .controller('MapCtrl', function($scope, $ionicLoading, $compile, LocationService) {

        $scope.markers = [];
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8

        };

        $scope.centerOnMe = function() {

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            LocationService.getLatLong().then(
                function(latLong) {
                    $scope.latLong = latLong;
                    console.log('LatLong=');
                    console.log($scope.latLong);

                    //$scope.map.setCenter(new google.maps.LatLng(latLong.lat, latLong.long));
                    $scope.map.center.latitude = $scope.latLong.lat;
                    $scope.map.center.longitude = $scope.latLong.long;
                    $scope.map.zoom = 14;

                    console.log("my lat lng" + $scope.map.center.latitude +" " + $scope.map.center.longitude);

                    $scope.$apply;
                    $ionicLoading.hide();

                },

                function(error) {
                    alert(error);
                }
            )
        };
    });