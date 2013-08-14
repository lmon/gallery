//app.js
angular.module('App', ['$strap.directives'])
.controller('AppCtrl', function($scope, $http) {
	$scope.config = {
		//svcUrl: "http://www.lucasmonaco.com/gallery/service/?length=2"
		svcUrl: "/gallery/service/"
		//"/victimizer/service/?appid=1&action=getdata" 
	}
	// 		svcUrl: "/gallery/service/"

  	// onload data req
  	$http({method:'GET', url: $scope.config.svcUrl }).
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
  	
  	/*$scope.updateImage = function(e){
  		var elem = angular.element(e.srcElement);
       
  		console.log(elem); 
  		elem.css('width','200px');
  		console.log(elem.css()); 
  		
  		return;
		var css;
		var ratio=jQuery(this).width() / jQuery(this).height();
		var pratio=$(this).parent().width() / jQuery(this).parent().height();
		if (ratio<pratio) css={width:'auto', height:'100%'};
		else css={width:'100%', height:'auto'};
		jQuery(this).css(css);
	};*/
	
	$scope.init = function () {
   		console.log("init called")
	};

  		
}).directive('orientable', function () {       
    return {
        link: function(scope, element, attrs) {   

            element.bind("load" , function(e){ 

                // success, "onload" catched
                // now we can do specific stuff:
                if(element[0].naturalHeight > element[0].naturalWidth){
                    element.addClass("vertical");
                	console.log("is vert "+attrs['src'])
                }else{
                	element.addClass("horizontal");
                	console.log("isnt")
                }
            });

        }
    }
});;


	 jQuery('carousel').carousel('pause')
	
 


