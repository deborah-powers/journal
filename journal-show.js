const fileJson = slice (document.URL, 0,-10) + '.json';
debbyPlay.tagList =[];
debbyPlay.placeList =[];
debbyPlay.personList =[];
debbyPlay.years =[ 'tous', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020' ];
debbyPlay.days =[];
var allDays =[];
var yearCurrent = 'tous';
var placeCurrent = 'tous';
var tagCurrent = 'tous';
var personCurent = 'tous';

function initJournal(){
	for (var d in debbyPlay.days){
		allDays.push (debbyPlay.days[d]);
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
	debbyPlay.placeList.unshift ('tous');
	debbyPlay.personList.sort();
	debbyPlay.personList.unshift ('tous');
	debbyPlay.tagList.sort();
	debbyPlay.tagList.unshift ('tous');
	console.log ('lieux:', debbyPlay.placeList);
	console.log ('personnes:', debbyPlay.personList);
	console.log ('tags:', debbyPlay.tagList);
	console.log ('jours:', debbyPlay.days);
}
function containsList (list, word){
	if (list.indexOf (word) >-1) return true;
	else return false;
}
init (document.body);
useJson (fileJson, 'days', document.body);
initJournal();
load();
createSelection ('personList', selectPeoples, document.getElementsByTagName ('section')[0]);
createSelection ('placeList', selectPlaces, document.getElementsByTagName ('section')[0]);
createSelection ('tagList', selectTags, document.getElementsByTagName ('section')[0]);
createCarousel ('years', selectYears, document.getElementsByTagName ('section')[0]);

function selectYears (year){ yearCurrent = year; }
function selectPlaces (place){ placeCurrent = place.toLowerCase(); }
function selectPeoples (person){ personCurent = person.toLowerCase(); }
function selectTags (tag){ tagCurrent = tag.toLowerCase(); }
function selectDays(){
	console.log (placeCurrent, yearCurrent, personCurent, tagCurrent);
	debbyPlay.days =[];
	if (yearCurrent == 'tous' && placeCurrent == 'tous' && personCurent == 'tous' && tagCurrent == 'tous')
		for (var j in allDays) debbyPlay.days.push (allDays[j]);
	// sélection sur un seul élément sur les quatre
	else if (yearCurrent == 'tous' && placeCurrent == 'tous' && personCurent == 'tous'){
		for (var j in allDays){
			if (containsList (allDays[j].tags, tagCurrent)) debbyPlay.days.push (allDays[j]);
	}}
	else if (yearCurrent == 'tous' && tagCurrent == 'tous' && personCurent == 'tous'){
		for (var j in allDays){
			if (allDays[j].place == placeCurrent) debbyPlay.days.push (allDays[j]);
	}}
	else if (placeCurrent == 'tous' && tagCurrent == 'tous' && personCurent == 'tous'){
		for (var j in allDays){
			if (containsText (allDays[j].date, yearCurrent +'/')) debbyPlay.days.push (allDays[j]);
	}}
	else if (yearCurrent == 'tous' && placeCurrent == 'tous' && tagCurrent == 'tous'){
		for (var j in allDays){
			if (containsList (allDays[j].personnes, personCurent)) debbyPlay.days.push (allDays[j]);
	}}
	// sélection sur deux éléments
	else if (yearCurrent == 'tous' && placeCurrent == 'tous'){
		for (var j in allDays){
			if (containsList (allDays[j].tags, tagCurrent) && containsList (allDays[j].personnes, personCurent))
				debbyPlay.days.push (allDays[j]);
	}}
	else if (yearCurrent == 'tous' && tagCurrent == 'tous'){
		for (var j in allDays){
			if (allDays[j].place == placeCurrent && containsList (allDays[j].personnes, personCurent))
				debbyPlay.days.push (allDays[j]);
	}}
	else if (yearCurrent == 'tous' && personCurent == 'tous'){
		for (var j in allDays){
			if (allDays[j].place == placeCurrent && containsList (allDays[j].tags, tagCurrent))
				debbyPlay.days.push (allDays[j]);
	}}
	else if (tagCurrent == 'tous' && placeCurrent == 'tous'){
		for (var j in allDays){
			if (containsText (allDays[j].date, yearCurrent +'/') && containsList (allDays[j].personnes, personCurent))
				debbyPlay.days.push (allDays[j]);
	}}
	else if (tagCurrent == 'tous' && personCurent == 'tous'){
		for (var j in allDays){
			if (containsText (allDays[j].date, yearCurrent +'/') && allDays[j].place == placeCurrent)
				debbyPlay.days.push (allDays[j]);
	}}
	else if (placeCurrent == 'tous' && personCurent == 'tous'){
		for (var j in allDays){
			if (containsText (allDays[j].date, yearCurrent +'/') && containsList (allDays[j].tags, tagCurrent))
				debbyPlay.days.push (allDays[j]);
	}}
	// sélection sur trois éléments
	else if (placeCurrent == 'tous'){
		for (var j in allDays){
			if (containsText (allDays[j].date, yearCurrent +'/') && containsList (allDays[j].tags, tagCurrent)
				&& containsList (allDays[j].personnes, personCurent)) debbyPlay.days.push (allDays[j]);
	}}
	else if (yearCurrent == 'tous'){
		for (var j in allDays){
			if (allDays[j].place == placeCurrent && containsList (allDays[j].tags, tagCurrent)
				&& containsList (allDays[j].personnes, personCurent)) debbyPlay.days.push (allDays[j]);
	}}
	else if (personCurent == 'tous'){
		for (var j in allDays){
			if (containsText (allDays[j].date, yearCurrent +'/') && containsList (allDays[j].tags, tagCurrent)
				&& allDays[j].place == placeCurrent) debbyPlay.days.push (allDays[j]);
	}}
	else if (tagCurrent == 'tous'){
		for (var j in allDays){
			if (containsText (allDays[j].date, yearCurrent +'/') && containsList (allDays[j].personnes, personCurent)
				&& allDays[j].place == placeCurrent) debbyPlay.days.push (allDays[j]);
	}}
	// sélection sur tous les éléments
	else{
		for (var j in allDays){
			if (containsText (allDays[j].date, yearCurrent +'/') && allDays[j].place == placeCurrent && containsList (allDays[j].tags, tagCurrent) && containsList (allDays[j].personnes, personCurent)) debbyPlay.days.push (allDays[j]);
	}}
	var containerDays = document.getElementsByTagName ('section')[1];
	load (containerDays);
}