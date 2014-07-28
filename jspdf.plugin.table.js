(function(jsPDFAPI) {

function insertHeader(data) {
	rObj = {}, hObj = {};
	rObj = data[0];
	for (var key in rObj) {
		hObj[key] = key;
	}
	data.splice(0, 0, hObj);
};

function initPDF(data, this) {
	dim = [50, 50, 500, 250];
	//this.rect(2, 2, 590, 830);
	columnCount = calColumnCount(data);
	rowCount = data.length;
	width = dim[2] / columnCount;
	height = dim[2] / rowCount;
	dim[3] = calrdim(data, dim);
}

jsPDFAPI.generateTable = function(table_DATA) {
	fdata = [], sdata = [];
	SplitIndex = [], cSplitIndex = [], indexHelper = 0;
	heights = [];
	//var this = new jsPDF('p', 'pt', 'a4', true);
	this.setFont("times", "normal");
	fontSize = 10;
	this.setFontSize(fontSize);
	initPDF(table_DATA, this);

	//console.log(this.internal.pageSize.height+"inner height");
	if (dim[3] > 750) {
		var jg = 0;
		cSplitIndex = SplitIndex;
		cSplitIndex.push(table_DATA.length);
		for (var ig = 0; ig < cSplitIndex.length; ig++) {
			tabledata = [];
			tabledata = table_DATA.slice(jg, cSplitIndex[ig]);
			insertHeader(tabledata);
			initPDF(tabledata, this);
			pdf(tabledata, dim, this, true, false);
			jg = cSplitIndex[ig];
			if ((ig + 1) != cSplitIndex.length) {
				this.addPage();
			}
		}
	} else {
		pdf(table_DATA, dim, this, true, false);
	}
	// this.text(50, nextStart + 20, "Hello world");
	// this.save("some-file.pdf");
};

function pdf(table, rdim, this, hControl, bControl) {
	columnCount = calColumnCount(table);
	rowCount = table.length;
	rdim[3] = calrdim(table, rdim);
	width = rdim[2] / columnCount;
	height = rdim[2] / rowCount;
	drawRows(this, rowCount, rdim, hControl);
	drawColumns(this, columnCount, rdim);
	nextStart = insertData(this, rowCount, columnCount, rdim, table, bControl);
};

function insertData(this, iR, jC, rdim, data, brControl) {
	xOffset = 10;
	yOffset = 10;
	y = rdim[1] + yOffset;
	for ( i = 0; i < iR; i++) {
		obj = data[i];
		x = rdim[0] + xOffset;
		for (var key in obj) {
			if (key.charAt(0) !== '$') {
				if (obj[key] !== null) {
					cell = obj[key].toString();
				} else {
					cell = '-';
				}
				cell = cell + '';
				if (((cell.length * fontSize) + xOffset) > (width)) {
					iTexts = (cell.length * (fontSize)) / (width * 2);
					iTexts = Math.ceil(iTexts);
					start = 0;
					end = 0;
					ih = 0;
					ech = ((brControl) && (i === 0)) ? this.setFont("times", "bold") : '';
					//ech is a dummy variable
					for ( j = 0; j < iTexts; j++) {
						end += Math.ceil((width / (Math.ceil((fontSize) - fontSize * 0.4))));
						this.text(x, y + ih, cell.substring(start, end));
						start = end;
						ih += fontSize;
					}
				} else {
					ech = ((brControl) && (i === 0)) ? this.setFont("times", "bold") : '';
					//ech is a dummy variable
					this.text(x, y, cell);
				}
				x += rdim[2] / jC;
			}
		}
		this.setFont("times", "normal");
		y += heights[i];
	}

	return y;
};

function calColumnCount(data) {
	var obj = data[0];
	var i = 0;
	for (var key in obj) {
		if (key.charAt(0) !== '$') {++i;
		}
	}
	return i;
};

function drawColumns(this, i, rdim) {
	x = rdim[0];
	y = rdim[1];
	w = rdim[2] / i;
	h = rdim[3];
	for (var j = 0; j < i; j++) {
		this.rect(x, y, w, h);
		x += w;
	}
};

function calrdim(data, rdim) {
	row = 0;
	x = rdim[0];
	y = rdim[1];
	lengths = [];
	for (var i = 0; i < data.length > 0; i++) {
		obj = data[i];
		length = 0;
		for (var key in obj) {
			if (obj[key] !== null) {
				if (length < obj[key].length) {
					lengths[row] = obj[key].length;
					length = lengths[row];
				}
			}
		}++row;
	}
	heights = [];
	for (var i = 0; i < lengths.length; i++) {
		if ((lengths[i] * (fontSize)) > height) {
			nlines = Math.ceil((lengths[i] * (fontSize)) / width);
			heights[i] = (nlines) * (fontSize / 2) + fontSize;
		} else {
			heights[i] = (fontSize + (fontSize / 2));
		}
	}
	var value = 0;
	indexHelper = 0;
	SplitIndex = [];
	for ( i = 0; i < heights.length; i++) {
		value += heights[i];
		indexHelper += heights[i];
		if (indexHelper > 700) {
			SplitIndex.push(i);
			indexHelper = 0;
		}
	}
	return value;
};

function drawRows(this, i, rdim, hrControl) {
	x = rdim[0];
	y = rdim[1];
	w = rdim[2];
	h = rdim[3] / i;
	for (var j = 0; j < i; j++) {
		if (j === 0 && hrControl) {
			this.setFillColor(182, 192, 192);
			this.rect(x, y, w, heights[j], 'F');
		} else {
			this.setDrawColor(0, 0, 0);
			this.rect(x, y, w, heights[j]);
		}
		y += heights[j];
	}
};

}(jsPDF.API));

