const fileJson = slice (document.URL, 0,-9) + '.json';
const url = 'http://localhost:1407/cgi-bin/journal/journal-new.py';
debbyPlay.tagList =[];
debbyPlay.placeList =[];
debbyPlay.personList =[];
debbyPlay.tagsCurrent ="";
debbyPlay.placeCurrent ="";
debbyPlay.personsCurrent ="";

function register(){
	var responseObj = document.getElementById ('response');
	if (! document.getElementById ('date').value){
		responseObj.innerHTML = '<p>il manque la date</p>';
		responseObj.className = 'error';
	}
	if (! document.getElementById ('place').value){
		responseObj.innerHTML = responseObj.innerHTML + '<p>il manque le lieu</p>';
		responseObj.className = 'error';
	}

	var params = '?place=' + document.getElementById ('place').value
	+ '&persons=' + replace (document.getElementById ('persons').value, " ")
	+ '&tags=' + replace (document.getElementById ('tags').value, " ")
	+ '&date=' + document.getElementById ('date').value
	+ '&title=' + document.getElementById ('title').value
	+ '&message=' + document.getElementById ('message').value;
	params = encodeURIComponent (params);
	var urlVarying = url + params;
	var xhttp = new XMLHttpRequest();
	xhttp.open ('GET', urlVarying, false);
	xhttp.onerror = function (error){
		responseObj.innerHTML = "<p>une erreur du serveur est survenue</p><p>vérifiez s'il est allumé</p>";
		responseObj.className = 'error';
		console.log (error);
	};
	xhttp.send();
	if (xhttp.status ==200){
		if (containsText (xhttp.responseText, 'python')){
			responseObj.innerHTML = xhttp.responseText;
			responseObj.className = 'error';
		}
		else console.log (JSON.parse (xhttp.responseText));
	}
}
// gérer la sélection
function selectPlaces (place){
	debbyPlay.placeCurrent = place.toLowerCase();
	load (document.getElementById ('place'));
}
function selectPersons (person){
	debbyPlay.personsCurrent = debbyPlay.personsCurrent +', '+ person.toLowerCase();
	document.getElementById ('persons').value = debbyPlay.personsCurrent;
}
function selectTags (tag){
	debbyPlay.tagsCurrent = debbyPlay.tagsCurrent +', '+ tag.toLowerCase();
	document.getElementById ('tags').value = debbyPlay.tagsCurrent;
}
function resetPersons(){ debbyPlay.personsCurrent = document.getElementById ('persons').value; }
function resetTags(){ debbyPlay.tagsCurrent = document.getElementById ('tags').value; }
// récupérer les infos déjà enregistrées
function initData(){
	debbyPlay.days =[];
	useJson (fileJson, 'days', document.body);
	for (var d in debbyPlay.days){
		if (! containsList (debbyPlay.placeList, debbyPlay.days[d].place) && debbyPlay.days[d].place)
			debbyPlay.placeList.push (debbyPlay.days[d].place);
		for (var t in debbyPlay.days[d].tags){
			if (! containsList (debbyPlay.tagList, debbyPlay.days[d].tags[t])){
				debbyPlay.tagList.push (debbyPlay.days[d].tags[t]);
		}}
		for (var t in debbyPlay.days[d].personnes){
			if (! containsList (debbyPlay.personList, debbyPlay.days[d].personnes[t])){
				debbyPlay.personList.push (debbyPlay.days[d].personnes[t]);
	}}}
	debbyPlay.placeList.sort();
	debbyPlay.personList.sort();
	debbyPlay.tagList.sort();
	debbyPlay.tagsCurrent = debbyPlay.tagList[0];
	debbyPlay.placeCurrent = debbyPlay.placeList[0];
	debbyPlay.personsCurrent = debbyPlay.personList[0];
	console.log ('lieux:', debbyPlay.placeList);
	console.log ('personnes:', debbyPlay.personList);
	console.log ('tags:', debbyPlay.tagList);
}
function containsList (list, word){
	if (list.indexOf (word) >-1) return true;
	else return false;
}
init (document.body);
initData();
load();
createSelection ('placeList', selectPlaces, document.body);
createSelection ('personList', selectPersons, document.body);
createSelection ('tagList', selectTags, document.body);