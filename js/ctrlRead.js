//
angular.module('App.controllers', []).
  controller('ctrlRead', [ '$scope', '$filter', function($scope, $filter) {
    console.log('in ctrlRead . '+ $scope.hpthumbs);

    console.log('in preInit . scope is '+ $scope);
    $scope.selected = {"name":"", "work":""};

	$scope.$watch('hpthumbs', function() {
		if($scope.hpthumbs){
				    console.log('========= GOT DATA ==========');
			$scope.ctrlReadInit();
		}	
	});
	// sets value of 'selected' an item on the stage
	$scope.setSrcMain = function ($ind) {
		// assign sec & alt to #imgtarget
		$scope.selected = $scope.findObjectByProperty($scope.items, 'id', $ind);
		console.log("setSrcCalled called: "+$ind);
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
    $scope.itemsPerPage = 3;
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
} );