var CodeGrabber		= {
	$codeField:		null,
	init:			function(){
		this.$codeField = $('#code-fontfile');
		this.$codeField[0].orig = this.$codeField.html();
		$('#nav-code').click($.proxy(this.grabCodes, this));
	},
	grabCodes:		function(){
		var	code	= 'body{'
				+CodeGrabber.getCss('font-size', WFBlenderConfig.baseSize, '%')
				+CodeGrabber.getCss('font-family', WFBlenderConfig.div.fontFamily)
				+CodeGrabber.getCss('line-height', WFBlenderConfig.div.lineHeight)
				+'}h1{'
				+CodeGrabber.getCss('font-family', WFBlenderConfig.h1.fontFamily)
				+CodeGrabber.getCss('line-height', WFBlenderConfig.h1.lineHeight)
				+CodeGrabber.getCss('font-size', WFBlenderConfig.h1.fontSize, 'em')
				+CodeGrabber.getCss('font-weight', WFBlenderConfig.h1.fontWeight)
				+CodeGrabber.getCss('font-style', WFBlenderConfig.h1.fontStyle)
				+'}h2{'
				+CodeGrabber.getCss('font-family', WFBlenderConfig.h2.fontFamily)
				+CodeGrabber.getCss('line-height', WFBlenderConfig.h2.lineHeight)
				+CodeGrabber.getCss('font-size', WFBlenderConfig.h2.fontSize, 'em')
				+CodeGrabber.getCss('font-weight', WFBlenderConfig.h2.fontWeight)
				+CodeGrabber.getCss('font-style', WFBlenderConfig.h2.fontStyle)
				+'}p{'
				+CodeGrabber.getCss('font-size', WFBlenderConfig.div.fontSize, 'em')
				+CodeGrabber.getCss('font-weight', WFBlenderConfig.div.fontWeight)
				+CodeGrabber.getCss('font-style', WFBlenderConfig.div.fontStyle)
				+'}',
			googleCode	= WFBlenderConfig.getFamilies();
		
		$('#code-css').html(code.replace(/;/g, ";\n	").replace(/{/g, "{\n	").replace(/}/g, "}\n").replace(/	}/g, "}"));
		
		if(googleCode.length){
			this.$codeField.html('&lt;link href="http://fonts.googleapis.com/css?family='+googleCode+'" rel="stylesheet" type="text/css"&gt;');
		} else{
			this.$codeField.html(this.$codeField[0].orig);
		}
	},
	getCss:			function(property, value, unit){
		unit = unit ? unit : '';
		return value && (value.length || value > 0) ? property+': '+value+unit+';' : '';
	}	
}
$(document).ready(function(){
	CodeGrabber.init();
});
