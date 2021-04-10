var keys = ["item1", "item2", "item3"];
var check1;
var check2;
var check3;
chrome.storage.local.get(keys, function(items){
	check1 = items.item1;
	check2 = items.item2;
	check3 = items.item3;
	document.getElementById("test1").checked = check1;
	document.getElementById("test2").checked = check2;
	document.getElementById("test3").checked = check3;
});

function ChangeVar1(){
	if (document.getElementById("test1").checked){
		chrome.storage.local.set({item1: true}, function(){});
	}
	else{
		chrome.storage.local.set({item1: false}, function(){});
	}
}

function ChangeVar2(){
	if (document.getElementById("test2").checked){
		chrome.storage.local.set({item2: true}, function(){});
	}
	else{
		chrome.storage.local.set({item2: false}, function(){});
	}
}

function ChangeVar3(){
	if (document.getElementById("test3").checked){
		chrome.storage.local.set({item3: true}, function(){});
	}
	else{
		chrome.storage.local.set({item3: false}, function(){});
	}
}

document.getElementById("test1").addEventListener('click', ChangeVar1);
document.getElementById("test2").addEventListener('click', ChangeVar2);
document.getElementById("test3").addEventListener('click', ChangeVar3);

