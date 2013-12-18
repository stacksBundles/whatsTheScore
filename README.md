whatsTheScore
=============

<h4>What does it do</h4>
The app uses the Washington Post Sports API to fetch and display stats from the week 15 NFL games. Visit <a href='http://iainmingo.com/'>iainmingo.com</a> to see for yourself.

<h4>Why only week 15 stats?</h4>
Unfortunately the WaPo Sports API isn't very well documented (read: undocumented) and I haven't been able to decode the URIs, so the gamecodes are hardcoded. Bummer, but beggars can't be choosers.

<h4>How does it work</h4>
The front-end is written using AngularJS and the back-end is written in Django. Django serves up static content while AngularJS does most of the heavy lifting. To circumvent HTTP Access Control, requests are made for data to be returned in JSONP format, which is then evaluated and fed into the scope by Angular. A factory serves as the link between the controller and the directives and employs rootScope broadcasts to notify directives when the fetched data is ready. 

<h4>Frameworks/libraries used</h4>
* Bootstrap CSS
* AngularJS
* Font Awesome

<h4>Tools</h4>
* SASS
* Sublime Text
* GitHub CLI


