//app.js
angular.module('App', ['$strap.directives', 'App.directives',])
.controller('AppCtrl', function($scope, $http, $filter) {
	$scope.config = {
		//svcUrl: "http://www.lucasmonaco.com/gallery/service/?length=2"
		svcUrl: "/gallery/service/"
		//"/victimizer/service/?appid=1&action=getdata" 
		// 		svcUrl: "/gallery/service/"
	}
	//watches windo length so we can modify image reques
    $scope.window_thresh = null;
    //how many please
	$scope.resplength = 8;
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
 	 	// implement a filter on html page to avoid loading 169 images at once
 	 	$scope.hpthumbs = json.data;
 		console.log("AppCtrl onSuccess: json.data.length "+json.data.length);

 	}
	
	$scope.init = function () {
   		console.log("AppCtrl init called");
   		$scope.imageLoadInit();
	};
	
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
                $scope.setSrcMain($scope.hpthumbs[0].work_id);
                $scope.pgOnload = false;
            } 
		}	
	});
	// sets value of 'selected' an item on the stage
	$scope.setSrcMain = function ($ind) {
		// assign sec & alt to #imgtarget
		$scope.selected = $scope.findObjectByProperty($scope.items, 'work_id', $ind);
		//console.log("setSrcCalled : "+$ind);
        console.log("setSrcCalled url = : "+$scope.selected.file);
	}
	// a util to help people like me
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
    $scope.itemsPerPage = 4;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = null;
    
    $scope.ctrlReadInit = function( ){
    	$scope.items = $scope.hpthumbs;
    	console.log(' in ctrlRead . thumbs is '+ $scope.hpthumbs);
 
		/*  $scope.items = [
		        {"id":"1","name":"anne ","field4":"http://www.dining.csus.edu/wp-content/uploads/2012/08/bkLogo.png"}, 
		        {"id":"2","name":"jack ", "field4":"http://blog.seattlepi.com/thebigblog/files/2011/08/bkkingmascott.png"}, 
		        {"id":"3","name":"mark ", "field4":"http://www.blogpakistan.com/wp-content/uploads/2013/07/burger-king-1.jpg"}, 
		        {"id":"4","name":"rob ", "field4":"http://www.midwestern-electric.com/_images//special/bk_sign.jpg"}, 
		        {"id":"5","name":"robin ", "field4":"http://www.openminds.com/images/BurgerKing-Have-It-Your-Way.gif"}, 
		        {"id":"6","name":"jacynth ", "field4":"http://assets.bizjournals.com/denver/BurgerKingKingCar*304.jpg?v=1"}, 
		        {"id":"7","name":"lily ", "field4":"http://www.garyssigns.com/wp-content/uploads/2010/09/Burger-King-I5-pole-sign-combined-300x200.jpg"}, 
		        {"id":"8","name":"nina ", "field4":"http://cdn5.xombit.com/wp-content/blogs.dir/19/files/2012/06/burger-king-bacon-sundae.jpg"}, 
		        {"id":"9","name":"fred ", "field4":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/157907_185953438108290_734169016_q.jpg"}, 
		   ]; */
	
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
 
 
