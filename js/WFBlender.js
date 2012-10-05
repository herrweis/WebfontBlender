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
	completeFontList:	{},
	headTag:			null,
	$searchFonts:		null,
	/**
	 * INITALIZE
	 * 
 	 * @param {Object} options
	 */
	init:				function(options){
		this.$elements			= $(options.elements);
		this.$fontListUl		= $('#google-fonts-list li');
		this.$searchFonts		= $('#search-fonts');
		this.inputs				= {
			$baseFontSize:		$('#body-font-size').change($.proxy(this.setBaseSize, this)),
			$fontSize:			$('#font-size').change($.proxy(this.changeFontSize, this)),
			$lineHeight:		$('#line-height').change($.proxy(this.changeLineHeight, this))
		}
		this.setBaseSize();
		this.$searchClear		= $('<span id="search-field-clear">&#x2716;</span>').hide();
		this.$searchFonts.after(this.$searchClear);
		for(var i = 0, iL = this.$elements.length; i < iL; ++i){
			var $hideButton = $('<span class="hide icon icon-block">Hide</span>');
			$hideButton.click($.proxy(this.hideElement, this));
			$hideButton[0].element = $(this.$elements[i]);
			
			$hideButton[0].$li = $('#visible-'+this.$elements[i].tagName.toLowerCase());
			$hideButton[0].$li[0].element = $(this.$elements[i]);
			$hideButton[0].$li[0].hideButton = $hideButton;
			$hideButton[0].$li.click($.proxy(this.toggleElement, this));
			
			$(this.$elements[i]).click($.proxy(this.select, this));
			$(this.$elements[i]).prepend($hideButton);
		}
		$(document).click($.proxy(this.unselect, this));
		$('#google-fonts-list').css({'height': ($('#google-fonts').height())+'px'});
		$(".nano").nanoScroller();
		this.$fontListUl.click($.proxy(this.setFontFamily, this));
		this.$searchFonts.keyup($.proxy(this.searchFonts, this));
		this.$searchFonts.focus($.proxy(this.searchFontFieldInit, this));
		this.$searchFonts.blur($.proxy(this.searchFontFieldInit, this));
		this.searchFontFieldInit();
		this.$searchClear.click($.proxy(this.clearSearchField, this));
		this.$fontPanel			= $('#fontselected').hide();
		this.$noFontSelected	= $('#nofontselected').show();
//		this.$fontPanel			= $('#fontselected');
//		this.$noFontSelected	= $('#nofontselected').hide();
	},
	/**
	 * SELECT AN ELEMENT
	 * 
	 * @param {Object} e
	 */
	select:				function(e){
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
	},
	/**
	 * CALCULATE CONVERSIONS FOR THE LINE HEIGHT
	 */
	calculateLineHeightConversions:	function(startValue){
		this.inputs.$lineHeight.next('span').html((this.inputs.$lineHeight.val() / this.inputs.$fontSize.val()).toFixed(3)+'<br/>'+(this.inputs.$lineHeight.val() / this.inputs.$fontSize.val() * 100).toFixed(1)+'%');
	},
	/**
	 * SET THE BODY BASE FONT SIZE
	 */
	setBaseSize:		function(){
		this.base		= this.inputs.$baseFontSize.val() ? this.inputs.$baseFontSize.val() : window.base_font_size ? window.base_font_size : 16;
		$('body').css({'font-size': this.base+'px'});
		if(this.$current !== null){
			this.initElementPanel();
		}
	},
	changeFontSize:		function(){
		this.$current.css({'font-size': (this.inputs.$fontSize.val() / this.base).toFixed(3)+'em'});
		this.calculateFontSizeConversions();
	},
	changeLineHeight:	function(){
		this.$current.css({'line-height': (this.inputs.$lineHeight.val() / this.inputs.$fontSize.val()).toFixed(3)});
		this.calculateLineHeightConversions();
	},
	setFontFamily:		function(e){
		var li		= e.target,
			$li		= $(li);
		this.$fontListUl.removeClass('act');
		$li.addClass('act');
		if(!li.fontLoaded || li.fontLoaded === false){
			$('head').prepend('<link href="http://fonts.googleapis.com/css?family='+$li.attr('data-font-url')+'" type="text/css" rel="stylesheet"/>');
			li.fontLoaded = true;
		}
		this.$current[0].li = $li;
		this.$current.css({
			'font-family':	$li.attr('data-font-family'),
			'font-weight':	$li.attr('data-font-weight').length && $li.attr('data-font-weight') != 'regular' ? $li.attr('data-font-weight') : 'normal',
			'font-style':	$li.attr('data-font-style').length ? $li.attr('data-font-style') : 'normal'
		});
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
		$(".nano").nanoScroller();
	},
	clearSearchField:	function(){
		this.$searchFonts.val('');
		this.$searchFonts.trigger('focus', 1);
		this.$fontListUl.show();
		this.$searchClear.hide();
		this.$searchClear.data('visible', 0);
		$(".nano").nanoScroller();
	},
	hideElement:		function(e){
		e.stopPropagation();
		$(e.target.element).hide();
		var $toggler	= null;
		if(e.target.$li){
			$toggler	= e.target.$li;
		} else{
			$toggler	= $(e.target);
		}
		$toggler.removeClass('icon-ok');
		$toggler.addClass('icon-block');
	},
	toggleElement:		function(e){
		if($(e.target).hasClass('icon-block')){
			$(e.target).removeClass('icon-block');
			$(e.target).addClass('icon-ok');
			$(e.target.element).show();
		} else{
			this.hideElement(e);
		}
	}
}


$(document).ready(function(){
	WFBlender.init({
		elements: '#section-home h1, #section-home h2, #section-home div'
	});
});
