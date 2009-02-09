
Simile Exhibit PieChart Extension

version 0.1 (February 9th, 2009)
by Eric Abouaf <firstname.lastname@gmail.com>
http://javascript.neyric.com/blog

Provide a new viewing class Simile the Exhibit using the Google Visualization API.


Demo :
------

http://neyric.com/~neyric/exhibit/piechart-extension/demo/presidents.html


References :
------------

 * Simile Exhibit: http://code.google.com/p/simile-widgets/
 * Google Visualization API: http://code.google.com/apis/visualization/documentation/gallery/piechart.html


How to use :
------------

 * Add the 2 following scripts :

	<script src="http://www.google.com/jsapi" type="text/javascript"></script>
	<script src="/path/to/piechart-extension/piechart-extension.js" type="text/javascript"></script>

 * Add the view :

	<div ex:role="view" ex:viewClass="Piechart"></div>

	you can limit the view properties :

	<div ex:role="view" 
			 ex:viewClass="Piechart"
			 ex:groupProperties="party, religion, diedInOffice"></div>
   
	or change the size :

	<div ex:role="view" 
			 ex:viewClass="Piechart"
			 ex:groupProperties="party, religion, diedInOffice"
			 ex:width="800"
			 ex:height="480"
			></div>


