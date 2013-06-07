/**
 * WebFont Blender
 */
var WFBlender	= {
	base:				16,
	$elements:			null,
	$current:			null,
	$fontPanel:			null,
	inputs:				null,
	settings:			null,
	$noFontSelected:	null,
	$fontListUl:		null,
	$fontFamilySelector: null,
	completeFontList:	{},
	headTag:			null,
	$searchFonts:		null,
	$savePanel:			$('<ul id="save-panel" />'),
	$addCombination:	$('<li id="add-combination"><span class="icon-plus">Save this blend</span></li>'),
	/**
	 * INITALIZE
	 * 
 	 * @param {Object} options
	 */
	init:				function(options){
		this.$elements			= $(options.elements);
		this.$fontListUl		= $('#google-fonts-list li[data-font-type]');
		this.$searchFonts		= $('#search-fonts');
		this.$fontFamilySelector	= $('#font-family-selector');
		this.firstStart			= true;
		this.inputs				= {
			$baseFontSize:		$('#body-font-size').change($.proxy(this.setBaseSize, this)).click(function(){this.select();}),
			$fontSize:			$('#font-size').change($.proxy(this.changeFontSize, this)).click(function(){this.select();}),
			$lineHeight:		$('#line-height').change($.proxy(this.changeLineHeight, this)).click(function(){this.select();})
		}
		this.setBaseSize();
		this.$searchClear		= $('<span id="search-field-clear">&#x2716;</span>').hide();
		this.$searchFonts.after(this.$searchClear);
		for(var i = 0, iL = this.$elements.length; i < iL; ++i){
			var $li	= $('#visible-'+this.$elements[i].tagName.toLowerCase()),
				el	= this.$elements[i];
			$li[0].element = $(el);
			$li.click($.proxy(this.toggleElement, this));
			el.WFBlenderConfig = WFBlenderConfig[el.tagName.toLowerCase()];
			el.li = $(this.$fontListUl[$(el).attr('data-start-value')]);
			$(el).click($.proxy(this.select, this));
			$(el).addClass('pulsating');
		}
		this.$addCombination.click($.proxy(this.addConfig, this));
		this.$savePanel.append(this.$addCombination);
		$('#section-home').append(this.$savePanel);
		$(document).click($.proxy(this.unselect, this));
		this.$fontListUl.click($.proxy(this.setFontFamily, this));
		this.$searchFonts.keyup($.proxy(this.searchFonts, this));
		this.$searchFonts.focus($.proxy(this.searchFontFieldInit, this));
		this.$searchFonts.blur($.proxy(this.searchFontFieldInit, this));
		this.searchFontFieldInit();
		this.$searchClear.click($.proxy(this.clearSearchField, this));
		this.$fontPanel			= $('#fontselected').hide();
		this.$noFontSelected	= $('#nofontselected').addClass('initial').show();
		
		this.$fontFamilySelector.on('mouseenter', $.proxy(this.openFontFamilySelector, this));
		this.$fontFamilySelector.on('mouseleave', $.proxy(this.closeFontFamilySelector, this));
		//this.loadConfig(false, WFBlenderConfig);
	},
	/**
	 * MAKE THE FONT SELECTOR PANEL BIGGER
	 */
	openFontFamilySelector:	function(e){
		this.$fontPanel.addClass('selector-open');
	},
	/**
	 * MAKE THE FONT SELECTOR PANEL SMALLER
	 */
	closeFontFamilySelector:	function(e){
		this.$fontPanel.removeClass('selector-open');
	},
	/**
	 * SELECT AN ELEMENT
	 * 
	 * @param {Object} e
	 */
	select:				function(e){
		if(this.firstStart === true){
			this.firstStart = false;
			$('.pulsating > span').remove();
			$('.pulsating').removeClass('pulsating');
			this.$noFontSelected.removeClass('initial');
		}
		if(this.$current !== null){
			this.$current.removeClass('act');
			if(this.$current[0].li){
				this.$current[0].li.removeClass('act');
			}
		}
		this.$current = $(e.currentTarget);
		this.$current.addClass('act');
		this.initElementPanel();
		if(this.$current[0].li){
			this.$current[0].li.addClass('act');
			this.$current[0].li[0].scrollIntoView();
		}
	},
	/**
	 * UNSELECT AN ELEMENT
	 * 
	 * @param {Object} e
	 */
	unselect:			function(e){
		if(($(e.target).is('html') || $(e.target).is('section#section-home') || $(e.target).is('li#nav-code') || $(e.target).is('li#nav-about')) && this.$current !== null){
			this.$current.removeClass('act');
			this.$noFontSelected.show();
			this.$fontPanel.hide();
		}
	},
	/**
	 * INIT THE FONT PANEL
	 */
	initElementPanel:	function(){
		this.$noFontSelected.hide();
		this.$fontPanel.show();
		this.setFontSize(parseInt(this.$current.css('font-size')));
		this.setLineHeight(parseInt(this.$current.css('line-height')));
	},
	/**
	 * SET THE FONT SIZE
	 *  
	 * @param {int} startValue
	 */
	setFontSize:		function(startValue){
		this.inputs.$fontSize.val(startValue);
		this.calculateFontSizeConversions();
	},
	/**
	 * SET THE LINE HEIGHT
	 * 
	 * @param {int} startValue
	 */
	setLineHeight:		function(startValue){
		this.inputs.$lineHeight.val(startValue);
		this.calculateLineHeightConversions();
	},
	/**
	 * CALCULATE CONVERSIONS FOR THE FONT SIZE
	 */
	calculateFontSizeConversions:	function(){
		this.inputs.$fontSize.next('span').html((this.inputs.$fontSize.val() / this.base).toFixed(3)+'em<br/>'+(this.inputs.$fontSize.val() / this.base * 100).toFixed(1)+'%');
		if(this.$current){
			this.$current[0].WFBlenderConfig.fontSize = (this.inputs.$fontSize.val() / this.base).toFixed(3);
		}
	},
	/**
	 * CALCULATE CONVERSIONS FOR THE LINE HEIGHT
	 */
	calculateLineHeightConversions:	function(startValue){
		this.inputs.$lineHeight.next('span').html((this.inputs.$lineHeight.val() / this.inputs.$fontSize.val()).toFixed(3)+'<br/>'+(this.inputs.$lineHeight.val() / this.inputs.$fontSize.val() * 100).toFixed(1)+'%');
		if(this.$current){
			this.$current[0].WFBlenderConfig.lineHeight = (this.inputs.$lineHeight.val() / this.inputs.$fontSize.val()).toFixed(3);
		}
	},
	/**
	 * CALCULATE CONVERSIONS FOR THE BASE SIZE
	 */
	calculateBaseSizeConversions:	function(){
		var base = window.base_font_size ? window.base_font_size : 16;
		this.inputs.$baseFontSize.next('span').html((this.base / base).toFixed(3)+'em<br/>'+(this.base / base * 100).toFixed(1)+'%');
		WFBlenderConfig.baseSize = (this.base / base * 100).toFixed(1);
	},
	/**
	 * SET THE BODY BASE FONT SIZE
	 */
	setBaseSize:		function(){
		this.base		= this.inputs.$baseFontSize.val() ? this.inputs.$baseFontSize.val() : window.base_font_size ? window.base_font_size : 16;
		$('body').css({'font-size': this.base+'px'});
		this.calculateBaseSizeConversions();
		if(this.$current !== null){
			this.initElementPanel();
		}
	},
	changeFontSize:		function(){
		this.$current.css({'font-size': (this.inputs.$fontSize.val() / this.base).toFixed(3)+'em'});
		this.calculateFontSizeConversions();
		this.changeLineHeight();
	},
	changeLineHeight:	function(){
		this.$current.css({'line-height': (this.inputs.$lineHeight.val() / this.inputs.$fontSize.val()).toFixed(3)});
		this.calculateLineHeightConversions();
	},
	setFontFamily:		function(e){
		var li				= e.target,
			$li				= $(li)
			fontFamily		= $li.attr('data-font-family'),
			fontWeight		= $li.attr('data-font-weight').length && $li.attr('data-font-weight') != 'regular' ? $li.attr('data-font-weight') : 'normal',
			fontStyle		= $li.attr('data-font-style').length ? $li.attr('data-font-style') : 'normal',
			variant			= (fontWeight == 'normal' ? '' : fontWeight)+(fontStyle == 'normal' ? '' : fontStyle);
			fontType		= $li.attr('data-font-type');
		this.$fontListUl.removeClass('act');
		$li.addClass('act');
		if((!li.fontLoaded || li.fontLoaded === false) && $li.attr('data-font-type') != 'system'){
			//$('head').prepend('<link href="http://fonts.googleapis.com/css?family='+$li.attr('data-font-url')+'" type="text/css" rel="stylesheet"/>');
			WebFont.load({
				google: {
					families: [$li.attr('data-font-url')]
				}
			});
			li.fontLoaded = true;
		}
		this.$current[0].li = $li;
		this.$current.css({
			'font-family':	fontFamily,
			'font-weight':	fontWeight,
			'font-style':	fontStyle
		});
		WFBlenderConfig.setFamily(this.$current[0].WFBlenderConfig, fontFamily, fontType, fontWeight, fontStyle, variant);
	},
	searchFontFieldInit:	function(e, noRestore){
		if(!noRestore){
			if(this.$searchFonts.val() == ''){
				this.$searchFonts.val(this.$searchFonts.attr('data-origvalue'));
				this.$searchFonts.addClass('orig');
			} else if(this.$searchFonts.val() == this.$searchFonts.attr('data-origvalue')){
				this.$searchFonts.removeClass('orig');
				this.$searchFonts.val('');
			}
		}
	},
	searchFonts:		function(){
		var val = this.$searchFonts.val().toLowerCase();
		if(val.length){
			if(this.$searchClear.data('visible') != 1){
				this.$searchClear.show();
				this.$searchClear.data('visible', 1);
			}
			this.$fontListUl.hide();
			for(var i = 0, iL = this.$fontListUl.length; i < iL; ++i ){
				var $li = $(this.$fontListUl[i]);
				if($li.attr('data-font-name').indexOf(val) === 0){
					$li.show();
				}
			}
		} else{
			this.$fontListUl.show();
			this.$searchClear.hide();
			this.$searchClear.data('visible', 0);
		}
	},
	clearSearchField:	function(){
		this.$searchFonts.val(this.$searchFonts.attr('data-origvalue'));
		this.$searchFonts.trigger('focus', 1);
		this.$fontListUl.show();
		this.$searchClear.hide();
		this.$searchClear.data('visible', 0);
	},
	toggleElement:		function(e){
		if($(e.target).hasClass('icon-block')){
			$(e.target).removeClass('icon-block').addClass('icon-ok');
			$(e.target.element).show();
		} else{
			$(e.target).removeClass('icon-ok').addClass('icon-block');
			$(e.target.element).hide();
		}
	},
	loadConfig:			function(e, config){
		if(e){
			e.preventDefault();
		}
		var config		= e ? e.currentTarget.config : config,
			base		= window.base_font_size ? window.base_font_size : 16;
		
		this.inputs.$baseFontSize.val(config.baseSize / 100 * base);
		this.setBaseSize();
		
		for(var i = 0, iL = this.$elements.length; i < iL; ++i){
			var $li	= $('#visible-'+this.$elements[i].tagName.toLowerCase()),
				el	= this.$elements[i],
				obj	= config[el.tagName.toLowerCase()];
			$(el).trigger('click');
			
			this.inputs.$fontSize.val(this.base *  obj.fontSize);
			this.changeFontSize();
			
			this.inputs.$lineHeight.val(this.inputs.$fontSize.val() *  obj.lineHeight);
			this.changeLineHeight();
			
			if(obj.type != 'system'){
				$('li[data-font-url="'+obj.fontFamily.replace(/ /g, '+')+(obj.variant.length ? '%3A'+obj.variant : '%3Aregular')+'"]').trigger('click');
			} else{
				// select system font
				$('li[data-font-family="'+obj.fontFamily+'"][data-font-weight="'+(obj.fontWeight.length ? obj.fontWeight : 'normal')+'"][data-font-style="'+obj.fontStyle+'"]').trigger('click');
			}
		}
		
		this.$current.removeClass('act');
		this.$noFontSelected.show();
		this.$fontPanel.hide();
	},
	addConfig:			function(){
		var $newLi			= $('<li><span>'+WFBlenderConfig.h1.fontFamily+'<br/>'+WFBlenderConfig.h2.fontFamily+'<br/>'+WFBlenderConfig.div.fontFamily+'</span></li>'),
			$closeSpan		= $('<span class="delete">✖</span>'),
			savedConfig		= jQuery.extend(true, {}, WFBlenderConfig);
		$newLi.append($closeSpan);
		$newLi[0].config	= savedConfig;
		$newLi.click($.proxy(this.loadConfig, this));
		$closeSpan.click($.proxy(this.deleteConfig, this));
		this.$savePanel.append($newLi);
	},
	deleteConfig:		function(e){
		e.stopPropagation();
		$(e.currentTarget).parent().remove();
	}
}


$(document).ready(function(){
	if($(window).width() < 1025){
		$('*[contenteditable=true]').attr('contenteditable', 'false');
	}
	WFBlender.init({
		elements: '#section-home h1, #section-home h2, #section-home div'
	});
});