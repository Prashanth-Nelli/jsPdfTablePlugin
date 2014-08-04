jsPdfTablePlugin
================


jsPdfTablePlugin expects an array of objects and an object specifyingrequired table positioning values as an input,

Each key in the object represents a column,and the no of rows will be equal to input data length,

jsPdfTablePlugin return's the current y position of Document,for further edition of Document.


height = doc.drawTable(objectArray,object); both parameters are mandatory 

object properties xstart ,ystart,tablestart,marginleft,xOffset,yOffset.

xstart      -  horizontal starting position for table 

tablestart  -  vertical starting position for table in the starting page

ystart      -  vertical starting position for table in next pages if the records exceed present page

marginleft  -  this plugin uses full page width if u you wish to decrese the width of table increase marginleft value

xOffset     -  horizontal padding in cell //Optional default value 10px

yOffset     -  vetrical padding in cell // Optional default value 10px

doc.drawTable returns current editing position.  

if the returned valueis doc.internal.pageSize.height you should 
 
add a new page for further editing

u style the table header fill color by changing values in drawRows Method 

table plugin uses the fontSize and fontStyle set by the user


Example code :-

===================================================================

<pre>
var data = [],fontSize = 12, height = 0,doc;
doc = new jsPDF('p', 'pt', 'a4', true);
doc.setFont("courier", "normal");
doc.setFontSize(fontSize);
doc.text(50,100,"hi table");
function generate() {
for (var insert = 0; insert &lt= 20; insert++) {
	data.push({
		"name" : "jspdf plugin",
		"version" : insert,
		"author" : "Prashanth Nelli",
		"Designation" : "AngularJs Developer king is king so king also king"
	});
}
height = doc.drawTable(data, {xstart:10,ystart:10,tablestart:70,marginleft:50});
doc.text(50, height + 20, 'hi world');
doc.save("some-file.pdf");
};
<pre>

Converting table to JSON
==============================  

jsPdfTablePlugin provides tableToJson method this converts the table into json array

tableToJson(id) method accepts one argument it should be an id of a table 

usage :-
<pre>
	var doc = new jsPDF('p','pt','a4',true);
	data=doc.tableToJson(id) //returns json array
</pre>
Note:- colspan feature is not supported
tableToJson method assusmes first row in the table to be the keys of the objects in jsonarray
