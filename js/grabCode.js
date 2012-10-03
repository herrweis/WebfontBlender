var CodeGrabber		= {
	grabCodes:		function(){
		var pS	= $('#section-home div'),
			p	= {
				fontSize:		pS.css('font-size'),
				lineHeight:		pS.css('line-height'),
				fontFamily:		pS.css('font-family'),
				fontWeight:		new String(pS.css('font-weight')).replace('bold', '700'),
				fontStyle:		pS.css('font-style')
			},
			h1S	= $('#section-home h1'),
			h1	= {
				fontSize:		h1S.css('font-size'),
				lineHeight:		h1S.css('line-height'),
				fontFamily:		h1S.css('font-family'),
				fontWeight:		new String(h1S.css('font-weight')).replace('bold', '700'),
				fontStyle:		h1S.css('font-style')
			},
			h2S	= $('#section-home h2'),
			h2	= {
				fontSize:		h2S.css('font-size'),
				lineHeight:		h2S.css('line-height'),
				fontFamily:		h2S.css('font-family'),
				fontWeight:		new String(h2S.css('font-weight')).replace('bold', '700'),
				fontStyle:		h2S.css('font-style')
			},
			fontfamilies = [p.fontFamily, h1.fontFamily, h2.fontFamily],
			code	= 'body{ \
	font-size: '+$('body').css('font-size')+';\
	font-family: '+p.fontFamily+';\
	line-height: '+p.lineHeight+';\
}\
h1{\
	font-family: '+h1.fontFamily+';\
	line-height: '+h1.lineHeight+';\
	font-size: '+h1.fontSize+';\
	font-weight: '+h1.fontWeight+';\
	font-style: '+h1.fontStyle+';\
}\
h2{\
	font-family: '+h2.fontFamily+';\
	line-height: '+h2.lineHeight+';\
	font-size: '+h2.fontSize+';\
	font-weight: '+h2.fontWeight+';\
	font-style: '+h2.fontStyle+';\
}\
p{\
	font-weight: '+p.fontWeight+';\
	font-style: '+p.fontStyle+';\
}';
		$('#code-css').html(code.replace(/;/g, ";\n").replace(/{/g, "{\n").replace(/}/g, "}\n"));
		
		var mergedFamilies = $.grep(fontfamilies,function(v,k){
				return $.inArray(v,fontfamilies) === k;
			}),
			finalFamilies = [];
		
		for(var i = 0, iL = mergedFamilies.length; i < iL; ++i){
			if(mergedFamilies[i] != 'Arial, sans-serif'){
				var family = {
						familyName: mergedFamilies[i].replace(/'/g, ''),
						variants: []
					},
					mergedVariants = [],
					variants = [];
				if(p.fontFamily == mergedFamilies[i]){
					variants.push(p.fontStyle == 'italic' ? p.fontWeight+''+p.fontStyle : p.fontWeight);
				}
				if(h1.fontFamily == mergedFamilies[i]){
					variants.push(h1.fontStyle == 'italic' ? h1.fontWeight+''+h1.fontStyle : h1.fontWeight);
				}
				if(h2.fontFamily == mergedFamilies[i]){
					variants.push(h2.fontStyle == 'italic' ? h2.fontWeight+''+h2.fontStyle : h2.fontWeight);
				}
				mergedVariants = $.grep(variants,function(v,k){
					return $.inArray(v,variants) === k;
				});
				finalFamilies.push(mergedFamilies[i].replace(/'/g, '').replace(/ /g, '+')+(mergedVariants.length ? ':'+mergedVariants.join() : ''));
			}
		}
		if(finalFamilies.length){
			$('#code-fontfile').html('&lt;link href="http://fonts.googleapis.com/css?family='+finalFamilies.join('|')+'" rel="stylesheet" type="text/css"&gt;');
		}
	}
}
$(document).ready(function(){
	$('#nav-code').click(CodeGrabber.grabCodes);
});
