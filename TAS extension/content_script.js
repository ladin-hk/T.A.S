// Background로 데이터 전송 및 반환을 위해 Message 전달
chrome.runtime.sendMessage( 
      {contentScriptQuery: "Filtering", endpoint:"use_model", dataToSend:(() => {

        // 서버로 전송을 위한 HTML Crawling
        let data = { text: [] }; 
        let elements_1 = Array.from(document.getElementsByClassName('usertxt ub-word')); // 댓글 
        let elements_2 = Array.from(document.getElementsByClassName('title_subject')); // 제목
        let elements_3 = Array.from(document.getElementsByClassName('gall_tit ub-word')); // 목록
        let view_box = Array.from(document.getElementsByClassName('writing_view_box')); // 내용
        let elements_4 = [];
        for (let element of view_box) {
          let view_box_texts = element.innerText;
          elements_4 = view_box_texts.split('\n');
        }
        for (let element of elements_1) {
          data.text.push(element.innerText);
        }
        for (let element of elements_2) {
          data.text.push(element.innerText);
        }
        for (let element of elements_3) {
          data.text.push(element.innerText);
        }
        for (let element of elements_4) {
          data.text.push(element);
        }   
        return data;

      })()},
      json => {

        // 필터링 적용을 위한 HTML Crawling
        let elements_1 = Array.from(document.getElementsByClassName('usertxt ub-word'));
        let elements_2 = Array.from(document.getElementsByClassName('title_subject'));
        let elements_3 = Array.from(document.getElementsByClassName('gall_tit ub-word'));
        let view_box = Array.from(document.getElementsByClassName('writing_view_box'));
        let elements_4 = [];
        for (let element of view_box) {
          let view_box_texts = element.innerText;
          elements_4 = view_box_texts.split('\n');
        }
        let elements = elements_1.concat(elements_2.concat(elements_3.concat(elements_4)));

        // 서버로부터 욕설 가능성 반환 후 필터링
        let probability = json.prob;
        for (let i = 0; i < probability.length - elements_4.length; i++) {
          if (Number(probability[i]) > 0.5) {
            elements[i].innerText = "<필터링 된 문장입니다. 사유 : 욕설>";
          }
        }
        for (let i = probability.length - elements_4.length; i < probability.length; i++) {
          if (Number(probability[i]) > 0.5) {
            document.getElementsByClassName("writing_view_box").item(0).innerHTML = document.getElementsByClassName("writing_view_box").item(0).innerHTML.replace(elements[i], "<필터링 된 문장입니다. 사유 : 욕설>");
          }
        }
      })
