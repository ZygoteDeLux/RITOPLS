
var button1;
var baseurl1 = "https://eun1.api.riotgames.com/lol/summoner/v3/summoners/by-name/";
var baseurl2 = "https://eun1.api.riotgames.com/lol/league/v3/positions/by-summoner/";

var baseurl3 = "https://eun1.api.riotgames.com/lol/match/v3/matchlists/by-account/";
var baseurl4 = "https://eun1.api.riotgames.com/lol/match/v3/matches/";
var champId = "champion=107";
var season = "&season=11&";
var keyToTheCastle = "api_key=RGAPI-1e4ebf81-35cb-46a3-9b30-b692899d7052";


var sumStats;
var rankStats;
var matchStats;
var input1;
var stats = [];


function setup() {
	createCanvas(600, 400);
	

	
	button1 = createButton("getData");
	button1.mousePressed(getData);
	button1.position(100, 200);
	input1 = createInput("enter sum name");
	input1.position(50, 100);

}

function draw() {
	background(1);
	fill(230);
	
	/*

	if(rankStats !== undefined){
		textSize(21);
		text("sumName: " + stats[0].name, 200, 200);
		text("SumId: " + stats[0].id, 200, 220);
		text("Sum lvl: " + stats[0].summonerLevel, 200, 240);

	if(stats[1][0] !== undefined){
		text("rank: " + stats[1][0].tier + " " + stats[1][0].rank, 200, 260);
		text("wr: " + round((stats[1][0].wins/(stats[1][0].wins + stats[1][0].losses)*100)) + "%"	, 200, 280);
	}
	}

	


	if(stats[2] !== undefined){
		textSize(21);
		text("sumName: " + stats[2].name, 200, 300);
		text("SumId: " + stats[2].id, 200, 320);

	}
	*/
	
	if(matchStats !== undefined){
		textSize(20);
		text("SumName: " + sumStats.name, 200, 200);
		text("SumLvl: " + sumStats.summonerLevel, 200, 220);
		text("rank:  " + rankStats[0].tier + " " + rankStats[0].rank, 200, 240);
		text("wr : " + round((rankStats[0].wins/(rankStats[0].wins + rankStats[0].losses))*100) + " %", 200, 260);
		text("gameId: " + matchStats.matches[0].gameId, 200, 280);
	}


	


}

function getData(){
	
	var url1 = baseurl1 + input1.value() + "?" + keyToTheCastle;
	loadJSON(url1, gotData);
	
	
}


function gotData(data){

	sumStats = data;

	if(sumStats !== undefined){
	
	append(stats, sumStats);
	getRank();

	}
}

function getRank(){
	var url2 = baseurl2 + sumStats.id + "?" + keyToTheCastle;
	loadJSON(url2, gotRank);
}


function gotRank(data){

	rankStats = data;
	append(stats, rankStats);
/*
	for(var i = 0; i < stats.length; i++){
		console.log(stats[i]);
	}
*/

	getMatches();

}

function getMatches(){

	var url3 = baseurl3 + sumStats.accountId + "?" + champId + season + keyToTheCastle;
	loadJSON(url3, gotMatches);

}

function gotMatches(data){
	matchStats = data;

}
