jsPdfTablePlugin
================

####How to use jsPdfTablePlugin

```javascript
	
	/* install using bower */
	bower install jspdf-table-plugin
	
```
```
	(OR)
```
```
	Download the file  jspdf.plugin.table.js from this repository

```

###Docs

```javascript
	height = doc.drawTable(objectArray,configObject) 
	/* both parameters are mandatory */
```

```

jsPdfTablePlugin expects an objectArray and configObject

Each key in an object in objectArray represents a column,and the 

no of rows will be equal to objectArray length.

jsPdfTablePlugin return's the current y position of Document,for further edition of Document.


ConfigObject properties xstart ,ystart,tablestart,marginright,xOffset,yOffset.

xstart      -  	horizontal starting position for table(it works as marginleft) 

tablestart  -  	vertical starting position for table in the starting page

ystart      -  	vertical starting position for table in next pages if the records exceed present page

marginright -  	this plugin uses full page width if u you wish to decrese the width of table increase 
                marginleft value

xOffset     -  	horizontal padding in cell //Optional default value 10px(don't give larger padding values)

yOffset     -  	vetrical padding in cell // Optional default value 10px(don't give larger padding values)

doc.drawTable returns current editing position.  

if the returned value is greater than  doc.internal.pageSize.height you should 
 
add a new page for further editing

u can change  the table header fill color by changing values in drawRows Method 

table plugin uses the fontSize and fontStyle set by the user

```

####Note:-

```
xOffset and yOffset values should not be morethan 15 if it is more than this value plugin may not handle
the operation properly.

```


=======================================================================

Example code :-
===================================================================
```javascript

var data = []
    ,fontSize = 12
    ,height = 0
    ,doc
    ;
	
doc = new jsPDF('p', 'pt', 'a4', true);
doc.setFont("courier", "normal");
doc.setFontSize(fontSize);
doc.text(50,100,"hi table");

function generate() {
	for (var insert = 0; insert &lt;= 20; insert++) {
		data.push({
			"name" : "jspdf plugin",
			"version" : insert,
			"author" : "Prashanth Nelli",
			"Designation" : "AngularJs Developer"
		});
	}
	height = doc.drawTable(data, {xstart:10,ystart:10,tablestart:70,marginleft:50});
	doc.text(50, height + 20, 'hi world');
	doc.save("some-file.pdf");
};

```
==========================================================================

Converting table to JSON
==============================  
```

jsPdfTablePlugin provides tableToJson method this converts the table into json array

tableToJson(id) method accepts one argument it should be an id of a table 

usage :-

```

```javascript

var doc = new jsPDF('p','pt','a4',true);
data=doc.tableToJson(id) //returns json array

```

```

Note:- colspan feature is not supported
tableToJson method assusmes first row in the table to be the keys of the objects in jsonarray

```


####These the following Edge cases where this plugin might not work properly
```
1.If the no of  rows consists of large blocks is more.
2.xOffset and yOffset values are more than the recommended value 15

```

###Planned Features:-

##### Providing options for customizing the table in style.
##### Providing options for improving the look and feel of table


