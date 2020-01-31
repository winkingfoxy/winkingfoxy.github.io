'use strict';

// Init all plugin when document is ready 
$(document).on('ready', function() {
	// 0. Init console to avoid error
	var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
	
	
	// 1. Background image as data attribut 
	var list = $('.bg-img');
	for (var i = 0; i < list.length; i++) {
		var src = list[i].getAttribute('data-image-src');
		list[i].style.backgroundImage = "url('" + src + "')";
		list[i].style.backgroundRepeat = "no-repeat";
		list[i].style.backgroundPosition = "center";
		list[i].style.backgroundSize = "cover";
	}
	// 7. Prepare titles, content for animation
	$('.section .content .anim .title h2, .section .content .anim .title h3, .section .content .anim .desc p, \
		.section .content .anim .title-desc h2, .section .content .anim .title-desc h3, .section .content .anim .title-desc h4, .section .content .anim .item-desc h3,.section .content .anim .title-desc p, \
		.cta-btns .btn').wrap("<span class='anim-wrapper'></span>");
    
	// 8. Init fullPage.js plugin
	var pageSectionDivs = $('.fullpg .section');
	var headerLogo = $('.header-top .logo');
	var bodySelector = $('body');
	var sectionSelector = $('.section');
	var slideElem = $('.slide');
	var arrowElem = $('.p-footer .arrow-d');
	var pageElem = $('.section');
	var pageSections = [];
	var pageAnchors = [];
	var nextSectionDOM;
	var nextSection;
	var fpnavItem;
	var mainPage = $('#mainpage');
	// Get sections name
	for (var i = 0; i < pageSectionDivs.length; i++) {
		pageSections.push(pageSectionDivs[i]);
	}
	window.asyncEach(pageSections, function(pageSection , cb){
		var anchor = pageSection.getAttribute('data-section');
		pageAnchors.push(anchor + "");
		cb();
	}, function(err){
		// Init plugin
		if(mainPage.height()){
			// config fullpage.js
			mainPage.fullpage({
				menu: '#qmenu',
				anchors: pageAnchors,
				scrollOverflow: false,
				verticalCentered: false,
				css3: true,
				navigation: false,
				
				afterResize: function(){
					var pluginContainer = $(this);
				},
				afterLoad: function(anchorLink, index){
					// Behavior after a full page is loaded
					// manage dark bg for active section
					if ($('.section.active').hasClass('js-left-light')) {
						bodySelector.addClass('left-light');
						headerLogo.addClass('dark-bg');
					} else {
						bodySelector.removeClass('left-light');
						headerLogo.removeClass('dark-bg');
					}
				}
			});
			
		}
	});
});


// Page Loader : hide loader when all are loaded
$(window).on('load', function(){
    $('#page-loader').addClass('p-hidden');
	$('.section').addClass('anim');
});
