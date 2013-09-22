//app.js
angular.module('App', ['$strap.directives', 'App.directives', , 'App.controllers'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/news', { controller: 'NewsCtrl'});
    $routeProvider.otherwise({redirectTo: '/home'});
  
  }]).controller('NewsCtrl', function(){
    console.log('In NewsCtrl');
  })
.controller('AppCtrl', function($scope, $http, $filter) {
	$scope.config = {
		//svcUrl: "http://www.lucasmonaco.com/gallery/service/?length=2"
		svcUrl: "/gallery/service/",
		imageDimensions: {
			"main":{
				"s": [50,500],
				"m": [60,620],
				"l": [70,720],
				"xl":[80,810]
				},
			"thumb":{
				"s": [20,55],
				"m": [30,85],
				"l": [40,140],
				"xl":[40,160]
				}
		}
	}
	//watches windo length so we can modify image reques
    $scope.window_thresh = null;
    //how many please
	$scope.resplength = 100;
	//on page var that maps to thumbnail UI
    $scope.hpthumbs = null;
    // 
    $scope.pgOnload = true;

	$scope.getWidth = function() {
        return $(window).width();
    };
    
    // determine device size, update class of page.
    // update URL to call and load in new, appropriate images
   	// bootstrap widths:
	$scope.$watch($scope.getWidth, function(newValue, oldValue) {

        oldthresh = $scope.window_thresh;
        // these are mapped to the valees in CSS
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
		if($scope.window_thresh == null){
			console.log('watch: thresh = '+$scope.window_thresh)

		// prevents the reload to be called on load of the page.
		}else if(($scope.window_thresh != oldthresh) && (oldthresh != null)){
	    	console.log('watch: load init. thresh = '+$scope.window_thresh + " & oldthresh="+oldthresh);
	    	oldthresh = 's';
		    $scope.imageLoadInit();
		}
	});
    
    // when window changes size re-request the images
    window.onresize = function(){
        $scope.$apply();
    }


    // called on page load. 
    // adds main and thumbs
    $scope.imageLoadInit = function(){
		// onload data req
		// using threshhold for size
		// using length for number of results
		$http({method:'GET', url: $scope.config.svcUrl + '?thresh='+$scope.window_thresh + '&length='+$scope.resplength}).
			success(function(json) {
				$scope.onSuccess(json);
				console.log('imageLoadInit Success');
		}).
		error(function(data, status, headers, config) {
			console.log('imageLoadInit Error');
			console.log('	data: '+data);
			console.log('	status: '+status);
			console.log('	config: '+config);
		
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
  	}
  	
  	$scope.onSuccess = function(json){
 	 	// map all the thumbs found to our on page display ( paginated with ctrlRead controller )
 	 	
 	 	$scope.hpthumbs = $scope.setThumbImageUrls(json.data);
 		console.log("AppCtrl onSuccess: json.data.length "+json.data.length);

 	}
	
	$scope.init = function () {
   		console.log("AppCtrl init called");
   		$scope.imageLoadInit();
	};
	
	$scope.setThumbImageUrls = function($data){

		for(var i=0;i<$data.length;i++) {
	 		$data[i].thumbFile = 	"/show_image.php?perc="+$scope.config.imageDimensions.thumb[$scope.window_thresh][0]+"&max="+$scope.config.imageDimensions.thumb[$scope.window_thresh][1]+"&img="+$data[i].thumbFile;
	 	}
		
		return $data;
	} 
	 
	
// why do i have to do this:   		
// [ '$scope', '$filter', function($scope, $filter)  doesnt seem right
//????or
//ctrlRead.$inject = ['$scope', '$filter'];
//??	
}).controller('ctrlRead', [ '$scope', '$filter', function($scope, $filter) {

    console.log('in ctrlRead . '+ $scope.hpthumbs);
    $scope.selected = {"name":"", "work":""};
	$scope.$watch('hpthumbs', function() {
		if($scope.hpthumbs){
			console.log('========= GOT DATA ==========');
			$scope.ctrlReadInit();

            if($scope.pgOnload = true){
                //display initial image
                $scope.setSrcMain($scope.hpthumbs[Math.floor((Math.random()*$scope.hpthumbs.length))].work_id);
                $scope.pgOnload = false;
            } 
		}	
	});
	// sets value of 'selected' an item on the stage
	$scope.setSrcMain = function ($ind) {
		// assign sec & alt to #imgtarget
		$scope.selected = $scope.getAppropriateImgUrl( $scope.findObjectByProperty($scope.items, 'work_id', $ind), "main" );
		//console.log("setSrcCalled : "+$ind);
        //console.log("setSrcCalled url = : "+$scope.selected.file);
	}
	
	$scope.getAppropriateImgUrl = function($myobject, $usetype){
		//http://www.lucasmonaco.com/show_image.php?perc=20&max=700&img=/gallery/art/fatburger_2007-09-29_5Detail.jpg
		if($usetype == "main"){
			//console.log("/show_image.php?perc="+$scope.config.imageDimensions.main[$scope.window_thresh][0]+"&max="+$scope.config.imageDimensions.main[$scope.window_thresh][1]+"&img="+$myobject.file)
			
			$myobject.file = 	"/show_image.php?perc="+$scope.config.imageDimensions.main[$scope.window_thresh][0]+"&max="+$scope.config.imageDimensions.main[$scope.window_thresh][1]+"&img="+$myobject.file;

		}else{
			$myobject.file = 	"/show_image.php?perc="+$scope.config.imageDimensions.thumb[$scope.window_thresh][0]+"&max="+$scope.config.imageDimensions.thumb[$scope.window_thresh][1]+"&img="+$myobject.file;
		
		}
		return $myobject;
	}
	
	// a util to help people like me
	$scope.findObjectByProperty = function($list, $propname,$propvalue) {	
	 	for(var i=0;i<$list.length;i++) {
		  if($list[i][$propname] == $propvalue ){
			//console.log("IN findObjectByProperty: FOUND  "+  $propname, $propvalue, $list[i]);
			return $list[i];
			}  
	 	}
        console.log("findObjectByProperty: nothing found for "+  $propname, $propvalue);
	 	
	 	return null;
	}
	
	// init pagnation tool
	$scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 4;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = null;
    
    $scope.ctrlReadInit = function( ){
    	$scope.items = $scope.hpthumbs;
    	console.log(' in ctrlRead . thumbs is '+ $scope.hpthumbs);
	
    	 $scope.search();
    }

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };
	
    // init the filtered items
    $scope.search = function () {
        console.log('in search')
		$scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
            // functions have been describe process the data for display

    }
    // end init
    
    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };
    
    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };


    // change sorting order
    $scope.sort_by = function(newSortingOrder) {
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;

        // icon setup
        $('th i').each(function(){
            // icon reset
            $(this).removeClass().addClass('icon-sort');
        });
        if ($scope.reverse)
            $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-up');
        else
            $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-down');
    };
} ]);
 
 
