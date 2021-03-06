---
layout: default
title: Chrome notifier extension starter kit
permalink: /2013/02/chrome-notifier-starter/
---

Need a Chrome extension that regularly checks for new updates on your
favorite website or application and notifies you of new items,
similar to [Gmail Checker](https://chrome.google.com/webstore/detail/google-mail-checker/mihcahmgecmbnbcchbopgniflfhgnkff) and [Outlook.com
Notifier](https://chrome.google.com/webstore/detail/outlookcom-notifier/mkmomflkhdooajekmffpilpoenndjppk)?

The Chrome Notifier Extension Starter Kit allows you to whip something 
together in a few easy steps:

1. Fork or clone the repo:

   <pre>
	git clone https://github.com/tombb/chrome-notifier-extension-starter.git
   </pre>

2. Load the extension in Chrome:

   See [Chrome Developer Docs](https://developer.chrome.com/extensions/getstarted.html#load)
   on how to load an extension in developer mode.
   
   Out-of-the-box the extension will report a random number generated by
   [www.random.com](http://www.random.com). Every minute the number will
   change to something else. Enable desktop notifications  on the options page
   to get a notification every time the random number increases.
   
   This is of course pretty useless. To change it so it reports about your
   own application or site, follow the steps below.
   
3. Change the title of the extension:

   in `app-notifier.js`:
   
   <pre>
	AppNotifier.ATTRS = {
		// ..
		title: {
			value : "Your Title"
		},
		// ..
	}
   </pre>

   
4. Make sure the domain(s) for which your extension needs permission are in 
   the manifest and in `app-notifier.js`

   `manifest.json` (use [Chrome Match Patterns](https://developer.chrome.com/extensions/match_patterns.html)):

   <pre>
	"permissions": [
		"tabs",
		"*://*.domain.of.your.app.com/"
	],
   </pre>

   `app-notifier.js` (use exact domains):

   <pre>
	AppNotifier.ATTRS = {
		// ..
		domains : {
			value : [
				'the.domain.of.your.app.com',
				'another.domain.of.your.app.com'
			]
		}
		// ..
	}
   </pre>

5. Set the `url` attribute in app-notifier.js to the URL you'd like to poll
   for updates/activity:
   
   <pre>
	AppNotifier.ATTRS = {
		// ..
		url : {
			value : 'https://url.to.your.app.com/some/page'
		},
		// ..
	}
   </pre>

6. Change `getNumberFromNode()` in `app-notifier.js` to return a number of new
   or unread items you'd like to notify the user about:

   <pre>
	getNumberFromNode : function (node) {
		return node.one('.some .selector').get('text');
	}
   </pre>

7. Optionally, replace the following files by your own images:

   `app.png`
   Image shown on the options page and in desktop notifications of your
   extension.

   `browser-action-icon-active.png`
   Active browser icon, shown when the extension is successfully polling your
   app or site.
   
   `browser-action-icon-inactive.png`
    Inactive browser icon, shown when the extenstion couldn't reach the app 
    or site it's checking for activity.
    
8. Reload your extension in Chrome, then debug and improve until you're happy!