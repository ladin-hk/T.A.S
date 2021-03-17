var keys = ["item1", "item2", "item3", "item4"];
var check1;
var check2;
var check3;
var check4;
chrome.storage.local.get(keys, function(items){
	check1 = items.item1;
	check2 = items.item2;
	check3 = items.item3;
	check4 = items.item4;
	var elements = document.getElementsByTagName("*");
	var filtering_elements = [];
	for(var i = 0; i < elements.length; i++){
		var div = elements.item(i);
		try{
			for(let node of div.childNodes){
				if(node.nodeValue != null && node.nodeValue != ' '){
					filtering_elements.push(node);
				}
			}
		}
		catch{
		}
	}
	// Background로 데이터 전송 및 반환을 위해 Message 전달
	chrome.runtime.sendMessage(
		{contentScriptQuery: "Filtering", endpoint:"use_model", dataToSend:(() => {
			// 서버로 전송을 위한 HTML Crawling
			let data = { text: [], check: [] }; 
			data.check.push(check1);
			data.check.push(check2);
			data.check.push(check3);
			data.check.push(check4);
			for(var i = 0; i < filtering_elements.length; i++){
				data.text.push(filtering_elements[i].nodeValue);
			}
			return data;
	})()},
	json => {
		// 필터링 적용을 위한 HTML Crawling
		var elements = document.getElementsByTagName("*");
		let probability = json.prob;
		for(var i = 0; i < filtering_elements.length; i++){
			if(probability[i] > 0.5){
				filtering_elements[i].nodeValue = '<필터링 된 문장입니다.>';
			}
		}
	})
});