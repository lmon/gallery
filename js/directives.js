'use strict';

/* Directives */

angular.module('App.directives', []).
  directive('orientable', function () {       
    // allows us to distinguish betwee norientations so we can chg class & css
	return {
        link: function(scope, element, attrs) {   
            element.bind("Directive: orientable: load" , function(e){ 
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
/*  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
*/