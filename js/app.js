//app.js
angular.module('App', ['$strap.directives'])
.controller('AppCtrl', function($scope, $http) {
	$scope.config = {
		//svcUrl: "http://www.lucasmonaco.com/gallery/service/?length=2"
		svcUrl: "X/gallery/service/"
		//"/victimizer/service/?appid=1&action=getdata" 
		// 		svcUrl: "/gallery/service/"
	}
	$scope.window_thresh = null;
	$scope.resplength = 4;
	
	
	$scope.getWidth = function() {
        return $(window).width();
    };
    
    // determine device size, update class of page.
    // update URL to call and load in new, appropriate images
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
    
    // called on page load. 
    // adds main and thumbs
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
 	 	// implement a filter on html page to avoid loading 169 images at once
 	 	$scope.hpthumbs = json.data;
 		console.log("json.data.length "+json.data.length);
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

jQuery('carousel').carousel('pause');

function ctrlRead($scope, $filter) {
    // init
    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 3;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = [
        {"id":"1","name":"anne 1","description":"description 1","field3":"field3 1","field4":"http://www.dining.csus.edu/wp-content/uploads/2012/08/bkLogo.png"}, 
        {"id":"2","name":"jack 2","description":"description 1","field3":"field3 2","field4":"http://blog.seattlepi.com/thebigblog/files/2011/08/bkkingmascott.png"}, 
        {"id":"3","name":"mark 3","description":"description 1","field3":"field3 3","field4":"http://www.blogpakistan.com/wp-content/uploads/2013/07/burger-king-1.jpg"}, 
        {"id":"4","name":"rob 4","description":"description 1","field3":"field3 4","field4":"http://www.midwestern-electric.com/_images//special/bk_sign.jpg"}, 
        {"id":"5","name":"robin 5","description":"description 1","field3":"field3 5","field4":"http://www.openminds.com/images/BurgerKing-Have-It-Your-Way.gif"}, 
        {"id":"6","name":"jacynth 6","description":"description 1","field3":"field3 6","field4":"http://assets.bizjournals.com/denver/BurgerKingKingCar*304.jpg?v=1"}, 
        {"id":"7","name":"lily 7","description":"description 1","field3":"field3 7","field4":"http://www.garyssigns.com/wp-content/uploads/2010/09/Burger-King-I5-pole-sign-combined-300x200.jpg"}, 
        {"id":"8","name":"nina 8","description":"description 1","field3":"field3 8","field4":"http://cdn5.xombit.com/wp-content/blogs.dir/19/files/2012/06/burger-king-bacon-sundae.jpg"}, 
        {"id":"9","name":"name 9","description":"nina 1","field3":"field3 9","field4":"field4 9","field5 ":"field5 9"}, 
        {"id":"10","name":"name 10","description":"description 1","field3":"field3 10","field4":"field4 10","field5 ":"field5 10"}, 
        {"id":"11","name":"name 11","description":"description 1","field3":"field3 11","field4":"field4 11","field5 ":"field5 11"}, 
        {"id":"12","name":"name 12","description":"description 1","field3":"field3 12","field4":"field4 12","field5 ":"field5 12"}, 
        {"id":"13","name":"name 13","description":"description 1","field3":"field3 13","field4":"field4 13","field5 ":"field5 13"}, 
        {"id":"14","name":"name 14","description":"description 1","field3":"field3 14","field4":"field4 14","field5 ":"field5 14"}, 
        {"id":"15","name":"name 15","description":"description 1","field3":"field3 15","field4":"field4 15","field5 ":"field5 15"}, 
        {"id":"16","name":"name 16","description":"description 1","field3":"field3 16","field4":"field4 16","field5 ":"field5 16"}, 
        {"id":"17","name":"name 17","description":"description 1","field3":"field3 17","field4":"field4 17","field5 ":"field5 17"}, 
        {"id":"18","name":"name 18","description":"description 1","field3":"field3 18","field4":"field4 18","field5 ":"field5 18"}, 
        {"id":"19","name":"name 19","description":"description 1","field3":"field3 19","field4":"field4 19","field5 ":"field5 19"}, 
        {"id":"20","name":"name 20","description":"description 1","field3":"field3 20","field4":"field4 20","field5 ":"field5 20"}
    ];

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
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
    };
    
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

    // functions have been describe process the data for display
    $scope.search();

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
};
ctrlRead.$inject = ['$scope', '$filter'];
	
 


