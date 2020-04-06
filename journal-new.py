#!/usr/bin/python3.6
# -*- coding: utf-8 -*-
import os, sys, codecs, json, cgi, cgitb

# les cors
cgitb.enable()
print ('Content-type: text/html; charset=utf-8')
print ('Access-Control-Allow-Origin: *')
print ('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS')
print ('Access-Control-Allow-Headers: Content-Type')
print ("")

# récupérer les champs du formulaire
dayDict ={
	"date": "",
	"place": "",
	"title": "",
	"tags": [],
	"peoples": [],
	"content": []
}
form = cgi.FieldStorage()
if form.getvalue ('date'): dayDict['date'] = form.getvalue ('date').replace ('-', '/')
if form.getvalue ('place'): dayDict['place'] = form.getvalue ('place')
if form.getvalue ('persons'): dayDict['peoples'] = form.getvalue ('persons').split (', ')
if form.getvalue ('tags'): dayDict['tags'] = form.getvalue ('tags').split (', ')
if form.getvalue ('title'): dayDict['title'] = form.getvalue ('title')
if form.getvalue ('message'): dayDict['content'] = form.getvalue ('message').split ('\n')

dayDict['peoples'].sort()
dayDict['tags'].sort()
dayDict['date'] = dayDict['date'].replace ('-','/')
dayJson = json.dumps (dayDict)
print (dayJson)

# écrire l'article dans le json temporaire
jsonName = os.path.dirname (os.path.abspath (__file__)) + os.sep + 'journal-new.json'

def readFile (fileName):
	text =""
	if os.path.exists (fileName):
		textBrut = open (fileName, 'rb')
		tmpByte = textBrut.read()
		encodingList =('utf-8', 'ISO-8859-1', 'ascii')
		for encoding in encodingList:
			try: text = codecs.decode (tmpByte, encoding=encoding)
			except UnicodeDecodeError: pass
			else: break;
		textBrut.close()
	return text

def writeFile (fileName, text):
	textBrut = open (fileName, 'w')
	textBrut.write (text)
	textBrut.close()

def shapeJson (jsonObj):
	dayString = str (jsonObj).replace ('], "', '],\n\t"')
	dayString = dayString.replace ('{"', '{\n\t"')
	dayString = dayString.replace (', "place', ',\n\t"place')
	dayString = dayString.replace (', "title', ',\n\t"title')
	dayString = dayString.replace (', "peoples', ',\n\t"peoples')
	dayString = dayString.replace (', "tags', ',\n\t"tags')
	dayString = dayString.replace (', "content', ',\n\t"content')
	dayString = dayString.replace ('["', '[ "')
	dayString = dayString.replace ('"]', '" ]')
	dayString = dayString.replace ('content": [ "', 'content": [\n\t\t"')
	dayString = dayString.replace ('" ]}', '"\n\t]\n}')
	dayString = dayString.replace (']}', ']\n}')
	dayString = dayString.replace ('}', '},\n')
	return dayString

articleList = readFile (jsonName)
articleList = articleList[1:]
articleList ='['+ shapeJson (dayJson) + articleList
writeFile (jsonName, articleList)
