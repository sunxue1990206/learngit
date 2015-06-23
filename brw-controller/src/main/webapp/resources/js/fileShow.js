var fileShow = function(){
	this.file_show = function(divId){
		var subType = divId.split("_");
		var fileL = $('#fileL').val();
		var fileList =  eval('(' + fileL + ')');
		var listSize = fileList.length;
		var a = 0;
		$('#'+divId).append("<ul id='"+subType[0]+"' class='picList'></ul>");
		var fileArray = new Array();
		var html;
		for(i = 0;i<listSize;i++){
			if(fileList[i].businessSubtype.value == subType[1]){
				fileArray[a] = fileList[i];
				a++;
				if(a%4 == 0){
					html="<li class='clearfix'>";
					for(var j=0;j<4;j++){
						html=html+"<div class='pic fl'><a id='img01' href=''><img src= '"
							+fileArray[j].filePath
							+"' /><span class='filter5'>"+fileArray[j].description+"</span></a></div>";
					}
					html = html+'</li>';
					$('#'+subType[0]).append(html);
					a=0;
					fileArray.length=0;
				}
			}
		}
		if(fileArray.length!=0){
			html="";
			html="<li class='clearfix'>";
			for(var j=0;j<fileArray.length;j++){
				html=html+"<div class='pic fl'><a id='img01' href=''><img src= '"
					+fileArray[j].filePath
					+"' /><span class='filter5'>"+fileArray[j].description+"</span></a></div>";
			}
			html = html+'</li>';
			$('#'+subType[0]).append(html);
		}
		$('#'+divId).append("");
	}
}
