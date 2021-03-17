// Checkbox 변수 저장
var items = {item1: false, item2: false, item3: false, item4: false};
chrome.storage.local.set(items, function(){
	console.log("save complete!");
});

// Content_script로부터 메시지를 받을 시 서버와 통신
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.contentScriptQuery == "Filtering") {

      // 서버로 데이터 전송 및 반환
      var url = "http://localhost:5000/" + encodeURIComponent(request.endpoint);
      fetch(url, { 
        method: 'POST',
        mode: 'cors', 
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request.dataToSend)
      })
        .then(response => response.json())
        .then(json => sendResponse(json))
        .catch(error => console.log(error))
      return true;
    }
  });