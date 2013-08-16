<?php
// service

// send a list of images with some data, via json

/*
JSON:
url
thumburl
caption
*/

$urlprefix = "http://www.lucasmonaco.com/show_image.php?";
$thumburlprefix = "http://www.lucasmonaco.com/show_image.php?perc=50&max=60&img=";

if(isset($_GET['thresh'])){

	if( $_GET['thresh'] == 's'){

	$size = "perc=50&max=300&img=";

	}else if( $_GET['thresh'] == 'm'){

	$size = "perc=50&max=380&img=";

	}else if( $_GET['thresh'] == 'l'){

	$size = "perc=50&max=480&img=";

	}else if( $_GET['thresh'] == 'xl'){

	$size = "perc=50&max=560&img=";
	
	}
$urlprefix .= $size;

}


$length = (isset($_GET['length'])? $_GET['length'] : 100 ); 
$start = (isset($_GET['start'])  ? $_GET['start'] : 0 ); 


$results = array( 
	array("file"=>$urlprefix . "/gallery/art/DSC_0061_1.jpg", 
		"thumbFile"=>$thumburlprefix . "/gallery/art/DSC_0061_1.jpg", 
		"work_name"=>"Untitled #2 2013") , 
	
	array("file"=>$urlprefix . "/gallery/art/lmonaco_reverse-c_adj_web.jpg", 
		"thumbFile"=>$thumburlprefix . "/gallery/art/lmonaco_reverse-c_adj_web.jpg", 
		"work_name"=>"Untitled C 2007") , 
	
	array("file"=>$urlprefix . "/gallery/art/landscape_imp-03-1.jpg", 
		"thumbFile"=>$thumburlprefix . "/gallery/art/landscape_imp-03-1.jpg", 
		"work_name"=>"Landscape Impressions #3"),
	array( "work_id"=>"61","work_name"=>"Valley Approach - Detail","file"=>$urlprefix ."/gallery/art/large/IMG_1188-valley-detail.jpg","dateAdded"=>"2006-07-25 00:00:00","dateCreated"=>"2006-07-25 00:00:00","medium"=>"Ink On Paper","filetype"=>"Tif","filesize"=>"22.8M","dimensions"=>"40 x 60","comments"=>"Part of a group of work which uses  Los Angeles as a starting point","ItemNotes"=>"","thumbFile"=>$thumburlprefix . "/gallery/art/large/IMG_1188-valley-detail-thumb.jpg","isHidden"=>"0","download"=>"/gallery/art/large/IMG_1188-valley-detail.TIF","parent"=>"59","isADefault"=>"1","isAvailable"=>"0","inTheHandsOf"=>"" ),
	array( "work_id"=>"65","work_name"=>"LA Basin Study","file"=>$urlprefix ."/gallery/art/monaco_lucas_3.jpg","dateAdded"=>"2006-07-25 00:00:00","dateCreated"=>"2005-07-25 00:00:00","medium"=>"Ink, Gouache on Paper ","filetype"=>"jpeg","filesize"=>"1.0M","dimensions"=>"40 x 60","comments"=>"One of a series of pieces looking at the Los Angeles area, this view is from the ocean looking east. In the drawing I am using traditional visual conventions to see how much information can be absorbed without losing touch with the subject matter.","ItemNotes"=>"","thumbFile"=>$thumburlprefix . "/gallery/art/monaco_lucas_3.jpg","isHidden"=>"0","download"=>"/gallery/art/monaco_lucas_3.jpg","parent"=>"0","isADefault"=>"1","isAvailable"=>"1","inTheHandsOf"=>"" ),
	array( "work_id"=>"49","work_name"=>"Landscape Impressions #2","file"=>$urlprefix ."/gallery/art/landscape_imp-02-1.jpg","dateAdded"=>"2006-07-25 00:00:00","dateCreated"=>"2005-00-00 00:00:00","medium"=>"Acrylic and Ink on Canvas","filetype"=>"jpeg","filesize"=>"2 MB","dimensions"=>"48 x 88","comments"=>"Another view of the Bronx from the Wave Hill installation, this piece is a more synthetic, idealized view of the borough, specifically the transportation network and the many, fragmented uses of the area. It was important for me in this piece that the impressions of many places and objects should come together as a single, coherent image.","ItemNotes"=>"","thumbFile"=>$thumburlprefix  . "/gallery/art/landscape_imp-02-1.jpg","isHidden"=>"0","download"=>"/gallery/art/landscape_imp-02-1.tif","parent"=>"0","isADefault"=>"1","isAvailable"=>"1","inTheHandsOf"=>""   ),
	array( "work_id"=>"59","work_name"=>"Valley Approach","file"=>$urlprefix ."/gallery/art/large/IMG_1196-valley_copy.jpg","dateAdded"=>"2006-07-25 00:00:00","dateCreated"=>"2004-07-25 00:00:00","medium"=>"Ink On Paper","filetype"=>"jpeg","filesize"=>"18.6M","dimensions"=>"40 x 60","comments"=>"Part of a group of work which uses  Los Angeles as a starting point","ItemNotes"=>"","thumbFile"=>$thumburlprefix  . "/gallery/art/large/IMG_1196-valley_copy.jpg","isHidden"=>"0","download"=>"/gallery/art/large/IMG_1196-valley_copy.tif","parent"=>"0","isADefault"=>"1","isAvailable"=>"0","inTheHandsOf"=>"Blake Callaway from Kentler 5/06"  ),
	array( "work_id"=>"42","work_name"=>"Valley Series","file"=>$urlprefix ."/gallery/art/heavy_6-2.jpg","dateAdded"=>"2006-06-30 00:00:00","dateCreated"=>"2004-06-30 00:00:00","medium"=>"Ink On Paper","filetype"=>"jpeg","filesize"=>"961k","dimensions"=>"40 x 60","comments"=>"","ItemNotes"=>"","thumbFile"=>$thumburlprefix  . "/gallery/art/heavy_6-2.jpg","isHidden"=>"0","download"=>"","parent"=>"0","isADefault"=>"1","isAvailable"=>"0","inTheHandsOf"=>"French lady - from 65 Hope in 2004") 
	  
	  );
 


//print count($results) . " $start, $length ";

exit(json_encode(array("data"=> array_slice($results, $start, $length)) )); 
?>