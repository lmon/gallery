//app.js
angular.module('App', ['$strap.directives'])
.controller('AppCtrl', function($scope, $http) {
	$scope.config = {
		//svcUrl: "http://www.lucasmonaco.com/gallery/service/?length=2"
		svcUrl: "/gallery/service/"
		//"/victimizer/service/?appid=1&action=getdata" 
		// 		svcUrl: "/gallery/service/"
	}
	$scope.window_thresh = null;
	$scope.resplength = 4;
	
	$scope.getWidth = function() {
        return $(window).width();
    };
    
    // determine device size
   	// bootstrap widths:
	$scope.$watch($scope.getWidth, function(newValue, oldValue) {

        oldthresh = $scope.window_thresh;

        $scope.window_width = newValue;
        if($scope.window_width < 580){
	        $scope.window_thresh = "s";

        }else if($scope.window_width < 800){
	        $scope.window_thresh = "m";

        }else if($scope.window_width < 1024){
	        $scope.window_thresh = "l";

		}else{
		    $scope.window_thresh = "xl";
		}
		// based on the above, change the Request URL
		if($scope.window_thresh ==null){
		
		}else if($scope.window_thresh != oldthresh){
	        $scope.imageLoadInit();
		}
	});
    
    // when window changes size re-request the images
    window.onresize = function(){
        $scope.$apply();
    }
    
    $scope.imageLoadInit = function(){
		// onload data req
		// using threshhold for size
		// using length for number of results
		$http({method:'GET', url: $scope.config.svcUrl + '?thresh='+$scope.window_thresh + '&length='+$scope.resplength}).
			success(function(json) {
				$scope.onSuccess(json);
				console.log('Success');
		}).
		error(function(data, status, headers, config) {
			console.log('Error');
			console.log('	data: '+data);
			console.log('	status: '+status);
			console.log('	config: '+config);
		
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
  	}
  	$scope.onSuccess = function(json){
 	 	$scope.hpthumbs = json.data;
 	 	
		console.log("json.data.length "+json.data.length);
 	 	for(var i=0; i<json.data.length; i++ ){
 	 		//var img = new Image();
			//img.src = json.data[i].url;
			//Get the width and the height
			//console.log(json.data[i].file );
 	 	}
  	}
	
	$scope.init = function () {
   		console.log("init called");
   		$scope.imageLoadInit();
	};

  		
}).directive('orientable', function () {       
    return {
        link: function(scope, element, attrs) {   

            element.bind("load" , function(e){ 

                // success, "onload" catched
                // now we can do specific stuff:
                if(element[0].naturalHeight > element[0].naturalWidth){
                    element.addClass("vertical");
                	//console.log("is vert "+attrs['src'])
                }else{
                	element.addClass("horizontal");
                	//console.log("isnt")
                }
            });

        }
    }
});


	 jQuery('carousel').carousel('pause')
	
 


