whatsTheScore
=============

<h4>What does it do?</h4>
The app uses the <a href='http://apps.washingtonpost.com/sports/'>Washington Post Sports API</a> to fetch and display stats from the 2013-2014 NFL regular season games. Visit <a href='http://iainmingo.com/'>iainmingo.com</a> to see for yourself.

<h4>How do I use the WaPo Sports API?</h4>
Since there's very little documentation explaining how to interact with the WaPo Sports API I had to do a little fishing. To retrieve stats for a specific game, the request URL has to include the 'gamecode' of the game in question (&gamecode=XXXXXXXX). How these 'gamecodes' are generated is not evident to me, so I queried the API *en masse* and extracted the gamecodes from the JSON-formatted responses. Here's the Python script I used:

```python
import json
import urllib.request

gameDCT = {}
gameidx = 0

for x in range(0, 31):
    offset = 729 + 8*x
    URL = 'http://apps.washingtonpost.com/sports/api/nfl/v2/games/?format=json&offset={}&limit=8'.format(offset)
    jsonurl = urllib.request.urlopen(URL) 
    data = json.loads(jsonurl.read().decode('utf-8'))
    
    for game in data['objects']:
        gameDCT[gameidx] = {'CODE': game['game_code'], 'HOME': game['home_team']['alias'], 'AWAY': game['away_team']['alias']}
        gameidx = gameidx + 1
```

The API appears to limit requests to 8 objects, so the calls were made in batches of 8. The response is decoded, dumped into a Python dictionary and then the necessary entries (gamecodes and team acronyms/abbreviations) are extracted into a new dictionary. This new dictionary was then copy-and-pasted into Angular.

<h4>How does it work?</h4>
The front-end is written using AngularJS and the back-end is written in Django. Django serves up static content while AngularJS does most of the heavy lifting. To circumvent HTTP Access Control, requests are made for data to be returned in JSONP format, which is then evaluated and fed into the scope by AngularJS. 

A factory serves as the link between the controller and the directives, fetching the data from the API and employing rootScope broadcasts to notify directives when the fetched data is ready. Animations are handled using CSS3 without using jQuery. The factory also employs a cache that stores previously fetched game stats to speed up response time.

``` javascript
services.factory('queryService', function($rootScope, $http) {

	var API_URI = 'http://apps.washingtonpost.com/sports/api/nfl/v2/games/?format=jsonp&game_code=';

	var queryService = {
		returned: {},
		cached: {}
	};

	queryService.getGame = function(code) {

		// first check the cache
		if (queryService.cached[code] != null) {
			$rootScope.$broadcast('hide');
			queryService.returned = queryService.cached[code];
			$rootScope.$broadcast('fetched');
			$rootScope.$broadcast('show');
		}
		// if not in the cache then we fetch the data
		else {
			var builtURI = API_URI + code;
			$rootScope.$broadcast('hide');

			// using jsonp to circumvent HTTP Access Control rejections
			$http.jsonp(builtURI);
		
			// functon needs to be defined on the window scope
			window.callback = function(data) {
				queryService.returned = data.objects[0];
				console.log(data.objects[0]);
				queryService.cached[code] = data.objects[0];
				$rootScope.$broadcast('fetched');
			}

			$rootScope.$broadcast('show');
		}
	
	}

	return queryService;
})
```

I also use a custom filter to display some of the stats that I'm calculating based on the data.

``` javascript
app.filter('perc', function() {
  return function (input) {
    if (input) {
      var per = input * 100;
      return per.toFixed(0);
    }
  }
})
```

As you can see, this filter rounds the calculated value to 2 decimal points and multiplies it by 100.

<h4>How did I build it?</h4>
I started with a scaffolding generated by Yeoman. Once the AngularJS app was running properly and interfacing with the API, I shifted the files to a local server running Django and finalized the UI. After that I pushed the whole project to github and from there transferred it onto a production server running Django.

<h4>Frameworks/libraries used</h4>
* Django 1.5.1
* Bootstrap CSS
* AngularJS 1.2
* Font Awesome

<h4>Tools</h4>
* SASS
* Sublime Text
* Git CLI
* Yeoman
* Bower


