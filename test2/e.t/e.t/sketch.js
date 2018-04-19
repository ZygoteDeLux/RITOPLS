
var button1;
var baseurl1 = "https://eun1.api.riotgames.com/lol/summoner/v3/summoners/by-name/";
var baseurl2 = "https://eun1.api.riotgames.com/lol/league/v3/positions/by-summoner/";

var baseurl3 = "https://eun1.api.riotgames.com/lol/match/v3/matchlists/by-account/";
var baseurl4 = "https://eun1.api.riotgames.com/lol/match/v3/matches/";
var champId = "107";
var season = "&season=11&";
var keyToTheCastle = "api_key=RGAPI-f29e93c5-5405-405c-9082-7b528b86825e";


var winStats = [];
var sumStats;
var rankStats;
var matchStats;
var input1;
var stats = [];
var gameIdArray = [];
var wins;
var wr;


function setup() {
	createCanvas(600, 400);
	

	
	button1 = createButton("getData");
	button1.mousePressed(getData);
	button1.position(100, 200);
	input1 = createInput();
	input1.position(50, 100);

}

function draw() {
	
	background(1);
	fill(230);

	
	if(matchStats !== undefined){
		textSize(20);
		text("SumName: " + sumStats.name, 200, 200);
		text("SumLvl: " + sumStats.summonerLevel, 200, 220);
		text("rank:  " + rankStats[0].tier + " " + rankStats[0].rank, 200, 240);
		text("wr : " + round((rankStats[0].wins/(rankStats[0].wins + rankStats[0].losses))*100) + " %", 200, 260);
		if(matchStats.matches.length !== 0){
			text("gameId: " + matchStats.matches[0].gameId, 200, 280);
		} else{
			console.log("you have no games with that champ")
		}
		if(wr !== undefined){
		text("champ wr: " + wr + "%", 200, 300);	
		}
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
	getMatches();

}

function getMatches(){

	var url3 = baseurl3 + sumStats.accountId + "?" + "champion=" + champId + season + keyToTheCastle;
	loadJSON(url3, gotMatches);

}

function gotMatches(data){
	matchStats = data;
	var i;
	for(i = 0; i < matchStats.matches.length; i++){
		
		append(gameIdArray, matchStats.matches[i].gameId);
	}


	if(matchStats.matches.length !== 0){
		getWins();
	} 

}

function getWins(){
	var i;
	
	for(i = 0; i < gameIdArray.length; i++){
		var url4 = baseurl4 + matchStats.matches[i].gameId + "?" + keyToTheCastle;
		wins = loadJSON(url4);
		append(winStats, wins);
	}
		
		setTimeout(gotWins, 15000);
		
	}


function gotWins(){
    var i;
	var x;
	var wins = 0;
	var losses = 0;
	
	
	for(i = 0; i < winStats.length; i++){
		
		for(x = 0; x < 10; x++){
			if(winStats[i].participants[x].championId == champId){
				if(winStats[i].participants[x].stats.win == true){
					wins++;
				} else{
					losses++;
				}
			console.log(winStats[i].participants[x].stats.win);
		}
		}
	}	console.log(wins);
		console.log(losses);
		console.log((wins/(wins + losses)) * 100);
		wr = (wins/(wins + losses)) * 100;

	
 
}



