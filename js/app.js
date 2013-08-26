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
			console.log('thresh = '+$scope.window_thresh)
		}else if($scope.window_thresh != oldthresh){
	    	console.log('load init. thresh = '+$scope.window_thresh)
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
    // allows us to distinguish betwee norientations so we can chg class & css
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
    $scope.selected = {"name":"", "work":""};
	$scope.setSrcMain = function ($ind) {
		// get info from clicked item: src, alt
		// assign sec & alt to #imgtarget
		$scope.selected = $scope.findObjectByProperty($scope.items, 'id', $ind);
		console.log("setSrcCalled called: "+$ind);
	}
	$scope.findObjectByProperty = function($list, $propname,$propvalue) {	
		for(var i=0;i<$list.length;i++) {
		  if($list[i][$propname] == $propvalue ){
			return $list[i];
			}  
	 	}
	 	return null;
	}
	
	// init
    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 3;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    //tmp data 
	$scope.items = [
        {"id":"1","name":"anne ","field4":"http://www.dining.csus.edu/wp-content/uploads/2012/08/bkLogo.png"}, 
        {"id":"2","name":"jack ", "field4":"http://blog.seattlepi.com/thebigblog/files/2011/08/bkkingmascott.png"}, 
        {"id":"3","name":"mark ", "field4":"http://www.blogpakistan.com/wp-content/uploads/2013/07/burger-king-1.jpg"}, 
        {"id":"4","name":"rob ", "field4":"http://www.midwestern-electric.com/_images//special/bk_sign.jpg"}, 
        {"id":"5","name":"robin ", "field4":"http://www.openminds.com/images/BurgerKing-Have-It-Your-Way.gif"}, 
        {"id":"6","name":"jacynth ", "field4":"http://assets.bizjournals.com/denver/BurgerKingKingCar*304.jpg?v=1"}, 
        {"id":"7","name":"lily ", "field4":"http://www.garyssigns.com/wp-content/uploads/2010/09/Burger-King-I5-pole-sign-combined-300x200.jpg"}, 
        {"id":"8","name":"nina ", "field4":"http://cdn5.xombit.com/wp-content/blogs.dir/19/files/2012/06/burger-king-bacon-sundae.jpg"}, 
        {"id":"9","name":"fred ", "field4":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/157907_185953438108290_734169016_q.jpg"}, 
   ];

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
	
 


