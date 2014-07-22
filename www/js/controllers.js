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
            $scope.showAlert = function() {
                console.log("inside popup")
                var alertPopup = $ionicPopup.alert({
                    title: 'Don\'t eat that!',
                    template: 'It might taste good'
                });
                alertPopup.then(function (res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            };
            $state.go("app.postryd")


        $scope.getRide = function () {
            $state.go("app.getryd")
        };
    })

    .controller('GetRideCtrl', function ($scope,$state) {
        $scope.goToMap = function(){
            $state.go("app.mapride");
        }
    })

    .controller('PostRideCtrl', function ($scope,$ionicPopup) {

        $scope.showAlert = function() {
            console.log("inside popup")
            var alertPopup = $ionicPopup.alert({
                title: 'Don\'t eat that!',
                template: 'It might taste good'
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };
        $scope.ridePosted = function(){

        }

    })

    .controller('MapCtrl', function($scope, $ionicLoading, $compile, LocationService) {
        $scope.cssDestDiv = true;
        $scope.cssSrcDiv = false;
        $scope.markers = [];
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8,
            events: {
                tilesloaded: function (map) {
                    $scope.$apply(function () {
                        $scope.mapInstance = map;
                    });
                }
            }

        };

        function srcCustomMarker(latlng, map, imageSrc) {
            this.latlng_ = latlng;
            this.imageSrc = imageSrc;
            // Once the LatLng and text are set, add the overlay to the map.  This will
            // trigger a call to panes_changed which should in turn call draw.
            this.setMap(map);
        }

        srcCustomMarker.prototype = new google.maps.OverlayView();

        srcCustomMarker.prototype.draw = function () {
            // Check if the div has been created.
            var div = this.div_;
            if (!div) {
                // Create a overlay text DIV
                div = this.div_ = document.createElement('div');
                // Create the DIV representing our CustomMarker

                div.className = "srcCustomMarker";
                console.log(div.className);

                var img = document.createElement("img");
                img.src = this.imageSrc;
                div.appendChild(img);
                google.maps.event.addDomListener(div,"click",function(event){
                    //alert("clicked");
                });

                // Then add the overlay to the DOM
                var panes = this.getPanes();
                panes.overlayImage.appendChild(div);
            }

            // Position the overlay
            var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
            if (point) {
                div.style.left = point.x + 'px';
                div.style.top = point.y + 'px';
            }
        };

        srcCustomMarker.prototype.remove = function () {
            // Check if the overlay was on the map and needs to be removed.
            if (this.div_) {
                this.div_.parentNode.removeChild(this.div_);
                this.div_ = null;
            }
        };

        srcCustomMarker.prototype.getPosition = function () {
            return this.latlng_;
        };

        function destCustomMarker(latlng, map, imageSrc) {
            this.latlng_ = latlng;
            this.imageSrc = imageSrc;
            // Once the LatLng and text are set, add the overlay to the map.  This will
            // trigger a call to panes_changed which should in turn call draw.
            this.setMap(map);
        }

        destCustomMarker.prototype = new google.maps.OverlayView();

        destCustomMarker.prototype.draw = function () {
            // Check if the div has been created.
            var div = this.div_;
            if (!div) {
                // Create a overlay text DIV
                div = this.div_ = document.createElement('div');
                // Create the DIV representing our CustomMarker
                div.className = "destCustomMarker";
                console.log(div.className);

                var img = document.createElement("img");
                img.src = this.imageSrc;
                div.appendChild(img);
                google.maps.event.addDomListener(div,"click",function(event){
                    //alert("clicked");
                });

                // Then add the overlay to the DOM
                var panes = this.getPanes();
                panes.overlayImage.appendChild(div);
            }

            // Position the overlay
            var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
            if (point) {
                div.style.left = point.x + 'px';
                div.style.top = point.y + 'px';
            }
        };

        destCustomMarker.prototype.remove = function () {
            // Check if the overlay was on the map and needs to be removed.
            if (this.div_) {
                this.div_.parentNode.removeChild(this.div_);
                this.div_ = null;
            }
        };

        destCustomMarker.prototype.getPosition = function () {
            return this.latlng_;
        };

        var markerData = []

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

                markerData.push({
                    "srcpos": [
                        37.323105,
                        -121.911999
                    ],
                    "destpos": [
                        37.404703,
                        -122.049989
                    ],
                    "profileImage": "https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xap1/t1.0-9/1013397_10151735912974579_250286447_n.jpg"
                });

                //console.log(JSON.stringify(markerData));



                for(var i=0;i<markerData.length;i++){
                    $scope.cssDestDiv = true;
                    new destCustomMarker(new google.maps.LatLng(markerData[i].destpos[0],markerData[i].destpos[1]), $scope.mapInstance,  markerData[i].profileImage);
                }

                for(var i=0;i<markerData.length;i++){
                    $scope.cssDestDiv = false;
                    new srcCustomMarker(new google.maps.LatLng(markerData[i].srcpos[0],markerData[i].srcpos[1]), $scope.mapInstance,  markerData[i].profileImage);

                }

                $scope.$apply;
                $ionicLoading.hide();

            },

            function(error) {
                alert(error);
            }
        )

        $scope.centerOnMe = function() {


        };
    });