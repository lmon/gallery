<?php
// service

// send a list of images with some data, via json

/*
JSON:
url
thumburl
caption
*/
$urlprefix = "http://www.lucasmonaco.com/show_image.php?perc=50&max=500&img=";
$thumburlprefix = "http://www.lucasmonaco.com/show_image.php?perc=50&max=60&img=";

$value = array("data"=>array( 
	array("file"=>$urlprefix . "/gallery/art/DSC_0061_1.jpg", 
		"thumbFile"=>$thumburlprefix . "/gallery/art/DSC_0061_1.jpg", 
		"work_name"=>"Untitled #2 2013") , 
	
	array("file"=>$urlprefix . "/gallery/art/lmonaco_reverse-c_adj_web.jpg", 
		"thumbFile"=>$thumburlprefix . "/gallery/art/lmonaco_reverse-c_adj_web.jpg", 
		"work_name"=>"Untitled C 2007") , 
	
	array("file"=>$urlprefix . "/gallery/art/landscape_imp-03-1.jpg", 
		"thumbFile"=>$thumburlprefix . "/gallery/art/landscape_imp-03-1.jpg", 
		"work_name"=>"Landscape Impressions #3")  
	) );
exit(json_encode($value));

?>