/**
 * This script provides the functionality for the "Lazy" button
 * on the resume page of tom.broerse.me.
 * 
 * This wasn't written by me, just altered. Credits to:
 * https://github.com/maxim/maxim.github.com
 * 
 * TODO: 
 * Properly fork above-mentioned repo on GitHub and share alike...
 * Port to JQuery to avoid having to load additional animation library
 */ 
(function(){
	function byId(id) {
		return (typeof id === 'string' ? document.getElementById(id) : id);
	}
	function removeEl(el) {
		el.parentNode.removeChild(el);
	}
	function setElStyles(el, styles) {
		for (var name in styles) {
			el.style[name] = styles[name];
		}
	}

	var 
		getComputedStyle = function(el) { return el.style; }, 
		view = document.defaultView;

	if (view && view.getComputedStyle) {
		getComputedStyle = function(el){ return view.getComputedStyle(el, ''); };
	}
	else if (document.documentElement.currentStyle) {
		getComputedStyle = function(el){ return el.currentStyle; };
	}

	function getOffset(el, direction) {
		var 
			offsetProp = 'offset' + (direction.charAt(0).toUpperCase() + direction.slice(1)),
			offsetValue = el[offsetProp],
			cs;
			
		while ((el = el.offsetParent) && (cs = getComputedStyle(el))) {
			offsetValue += el[offsetProp];
		}
		return offsetValue;
	}

	var summaryEls = [ ];
	function absolutizeSummaryEls() {
		var emEls = document.getElementsByTagName('em');
		for (var i = 0, len = emEls.length; i < len; i++) {
			var 
				left = getOffset(emEls[i], 'left'),
				top = getOffset(emEls[i], 'top'),
				clone = emEls[i].cloneNode(true);

			setElStyles(clone, {
				position: 'absolute',
				left: left + 'px',
				top: top + 'px'
			});
			document.body.appendChild(clone);
			summaryEls.push(clone);
		}

		var titleEl = document.getElementsByTagName('h1')[0];
		var titleClone = titleEl.cloneNode(true);
		setElStyles(titleClone, {
			position: 'absolute',
			left: getOffset(titleEl, 'left') + 'px',
			top: getOffset(titleEl, 'top') + 'px',
			width: titleEl.offsetWidth + 'px',
			margin: 0
		});
		titleClone.id = 'title-clone';
		document.body.appendChild(titleClone);
	}
  
	function centerElementAt(element, top) {
		element.style.left = '50%';
		element.style.marginLeft = -(element.offsetWidth / 2) + 'px';
		emile(element, 'top:' + top + 'px', { duration: 500 });
	}
  
	function showSummaryEls() {
		var top = 180, animationInterval = 100;
		emile('content', 'opacity:0', {
			duration: 500,
			after: function(){
				setTimeout(function() {
					if (summaryEls.length) {
						top += 30;
						centerElementAt(summaryEls.shift(), top);
						setTimeout(arguments.callee, animationInterval);
					} else {
						summarizeBtn.disabled = false;
					}
				}, animationInterval);
			}});
		}
  
	function removeSummaryEls() {
		var ems = [ ];
		for (var i = 0, els = document.body.childNodes, len = els.length; i < len; i++) {
			if (els[i].tagName === 'EM') {
				ems.push(els[i]);
			}
		}
		(function(){
			if (ems.length) {
				var el = ems.shift();
				emile(el, 'left:-500px', { 
					after: (function(el){
						return function() {
							removeEl(el);
						};
					})(el)
				});
				setTimeout(arguments.callee, 50);
			} else {
				summarizeBtn.disabled = false;
			}
		})();
	}
  
	var summarizeBtn = byId('summarize');
	var isSummarized = false;

	function hideSummary() {
		summarizeBtn.disabled = true;
		isSummarized = false;
		summarizeBtn.innerHTML = 'I\'m Lazy';
		removeSummaryEls();
		removeEl(byId('title-clone'));
		setTimeout(function(){
			emile('content', 'opacity:1', { duration: 500 });
		}, 700);
	}
  
	function showSummary() {
		summarizeBtn.disabled = true;
		isSummarized = true;
		summarizeBtn.innerHTML = 'Show content';
		absolutizeSummaryEls();
		showSummaryEls();
	}
  
	summarizeBtn.style.display = '';
	summarizeBtn.onclick = function() {
		if (isSummarized) {
			hideSummary();
		} else {
			showSummary();
		}
  };
})();