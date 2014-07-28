jsPdfTablePlugin
================

How to use jsPdfTablePlugin
==========================


Example code :-

<pre>
for (var insert = 0; insert <= 80; insert++) {
					data.push({
						"name" : "pdf plugin is best",
						"valueq" : insert,
						"valuew" : insert,
						"valuer" : 1,
						"taste" : "source"
					});
};

var doc = new jsPDF('p', 'pt', 'a4', true);
doc.setFont("times", "normal");
fontSize = 10;
doc.setFontSize(fontSize);
var h = jsPdfTable(doc).drawTable($scope.data,300);
doc.text(50,h+20,'hi world');
doc.save("some-file.pdf");
	
<pre>

<p>
  
 jsPdfTablePlugin expects an array of objects as an input,
 
 Each key in the object represents a column, 
 
 And the no of rows will be equal to input data length
 
 
 jsPdfTablePlugin return's the current y position of Document, 
 
 for further edition of Document
  
</p>


 
 
 
 
