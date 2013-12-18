whatsTheScore
=============

<h4>What does it do?</h4>
The app uses the <a href='http://apps.washingtonpost.com/sports/'>Washington Post Sports API</a> to fetch and display stats from the week 15 NFL games. Visit <a href='http://iainmingo.com/'>iainmingo.com</a> to see for yourself.

<h4>Why only week 15 stats?</h4>
Unfortunately the WaPo Sports API isn't very well documented (read: undocumented) and I haven't been able to decode the URIs, so the gamecodes are hardcoded.

<h4>How does it work?</h4>
The front-end is written using AngularJS and the back-end is written in Django. Django serves up static content while AngularJS does most of the heavy lifting. To circumvent HTTP Access Control, requests are made for data to be returned in JSONP format, which is then evaluated and fed into the scope by AngularJS. A factory serves as the link between the controller and the directives and employs rootScope broadcasts to notify directives when the fetched data is ready. Animations are handled by AngularJS, without using jQuery, and employ CSS3 transitions.

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


