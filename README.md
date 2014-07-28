jsPdfTablePlugin
================


 jsPdfTablePlugin expects an array of objects as an input,
 
 Each key in the object represents a column, 
 
 And the no of rows will be equal to input data length
 
 
 jsPdfTablePlugin return's the current y position of Document, 
 
 for further edition of Document



Example code :-

===================================================================

<pre>
var data = []
    ,nextStart = 0
    ,fontSize = 10
    ,height = 0
    ,doc;
for (var insert = 0; insert <= 80; insert++) {
	data.push({
		"name" : "jspdf plugin",
		"version" : '1.0.0',
		"author" : "Prashanth Nelli",
		"Designation" : "AngularJs Developer"
	});
}

doc = new jsPDF('p', 'pt', 'a4', true);
doc.setFont("times", "normal");
doc.setFontSize(fontSize);
doc.text(50,100,"hi table")

/**
height = jsPdfTable(doc).drawTable(objectArray,yPosition);
**/

height = jsPdfTable(doc).drawTable(data, 300);
doc.text(50, height + 20, 'hi world');
doc.save("some-file.pdf");
	
<pre>

====================================================================
  

  


 
 
 
 
