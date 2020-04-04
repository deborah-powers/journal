const fileJson = slice (document.URL, 0,-9) + '.json';
const urlBase = 'http://localhost:1407/cgi-bin/journal/journal-new.py';

debbyPlay.tagList =[];
debbyPlay.placeList =[];
debbyPlay.personList =[];
debbyPlay.days =[];

function initJournal(){
	for (var d in debbyPlay.days){
		if (! containsList (debbyPlay.placeList, debbyPlay.days[d].place) && debbyPlay.days[d].place)
			debbyPlay.placeList.push (debbyPlay.days[d].place);
		for (var t in debbyPlay.days[d].tags){
			if (! containsList (debbyPlay.tagList, debbyPlay.days[d].tags[t]))
				debbyPlay.tagList.push (debbyPlay.days[d].tags[t]);
		}
		for (var t in debbyPlay.days[d].personnes){
			if (! containsList (debbyPlay.personList, debbyPlay.days[d].personnes[t]))
				debbyPlay.personList.push (debbyPlay.days[d].personnes[t]);
	}}
	debbyPlay.placeList.sort();
	debbyPlay.personList.sort();
	debbyPlay.tagList.sort();
	debbyPlay.placeCurrent ="";
	debbyPlay.personsCurrent ="";
	debbyPlay.tagsCurrent ="";
}
function register(){
	if (! document.getElementById ('date') || ! document.getElementById ('place')){
		document.getElementById ('response').innerHTML = '<p>il manque la date ou le lieu</p>';
		document.getElementById ('response').className = 'error';
	}
	else{
		var params = '?place=' + document.getElementById ('place').value + '&date=' + document.getElementById ('date').value
			+ '&persons=' + document.getElementById ('persons').value + '&tags=' + document.getElementById ('tags').value
			+ '&title=' + document.getElementById ('title').value + '&message=' + document.getElementById ('message').value;
		var url = urlBase + params;
		var xhttp = new XMLHttpRequest();
		xhttp.open ('GET', url, false);
		xhttp.send();
		if (xhttp.status ==200){
			var resultatJson = JSON.parse (xhttp.responseText);
			console.log (resultatJson);
			document.getElementById ('response').innerHTML = "<p>l'article a été enregistré avec succès</p>";
			document.getElementById ('response').className = 'error';
		}
	}
}
function containsList (list, word){
	if (list.indexOf (word) >-1) return true;
	else return false;
}
init (document.body);
useJson (fileJson, 'days', document.body);
initJournal();
function selectPlace (place){
	debbyPlay.placeCurrent = place.toLowerCase();
	load (document.getElementById ('place'));
}
function selectPeoples (person){
	debbyPlay.personsCurrent = debbyPlay.personsCurrent +', '+ person.toLowerCase();
	if (slice (debbyPlay.personsCurrent, 0,2) ==', ') debbyPlay.personsCurrent = slice (debbyPlay.personsCurrent, 2);
	load (document.getElementById ('persons'));
}
function selectTags (tag){
	debbyPlay.tagsCurrent = debbyPlay.tagsCurrent +', '+ tag.toLowerCase();
	if (slice (debbyPlay.tagsCurrent, 0,2) ==', ') debbyPlay.tagsCurrent = slice (debbyPlay.tagsCurrent, 2);
//	document.getElementById ('tags').value = debbyPlay.tagsCurrent;
	load (document.getElementById ('tags'));
}
load();
