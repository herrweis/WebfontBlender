var WFBlenderConfig		= {
	baseSize:			100,
	div: {
		fontFamily:		'Arial, sans-serif',
		fontSize:		1.000,
		lineHeight:		1.563,
		fontWeight:		'',
		fontStyle:		'',
		variant:		'',
		type:			'system'
	},
	h1: {
		fontFamily:		'Arial, sans-serif',
		fontSize:		2.500,
		lineHeight:		1.000,
		fontWeight:		'',
		fontStyle:		'',
		variant:		'',
		type:			'system'
	},
	h2: {
		fontFamily:		'Arial, sans-serif',
		fontSize:		1.500,
		lineHeight:		1.563,
		fontWeight:		'',
		fontStyle:		'',
		variant:		'',
		type:			'system'			
	},
	setFamily:			function(selfRef, fontFamily, fontType, fontWeight, fontStyle, fontVariant){
		selfRef.fontFamily		= fontFamily;
		selfRef.fontWeight		= fontWeight;
		selfRef.fontStyle		= fontStyle;
		selfRef.variant			= fontVariant;
		selfRef.type			= fontType;
	},
	getFamilies:		function(){
		var fontFamilies	= [];
		if(this.div.type != 'system'){
			fontFamilies.push(this.div.fontFamily);
		}
		if(this.h1.type != 'system'){
			fontFamilies.push(this.h1.fontFamily);
		}
		if(this.h2.type != 'system'){
			fontFamilies.push(this.h2.fontFamily);
		}
		var	mergedFamilies	= $.grep(fontFamilies,function(v,k){
				return $.inArray(v,fontFamilies) === k;
			}),
			finalFamilies	= [];
		
		for(var i = 0, iL = mergedFamilies.length; i < iL; ++i){
			var family = {
					familyName: mergedFamilies[i].replace(/'/g, ''),
					variants: []
				},
				mergedVariants = [],
				variants = [];
			if(this.div.fontFamily == mergedFamilies[i]){
				variants.push(this.div.variant);
			}
			if(this.h1.fontFamily == mergedFamilies[i]){
				variants.push(this.h1.variant);
			}
			if(this.h2.fontFamily == mergedFamilies[i]){
				variants.push(this.h2.variant);
			}
			mergedVariants = $.grep(variants,function(v,k){
				return $.inArray(v,variants) === k;
			});
			if(mergedVariants.length){
				for(var j = 0, jL = mergedVariants.length; j < jL; ++j){
					if(mergedVariants[j] == ''){
						mergedVariants[j] = 400;
					}
				}
			}
			finalFamilies.push(mergedFamilies[i].replace(/'/g, '').replace(/ /g, '+')+(mergedVariants.length ? ':'+mergedVariants.join() : ''));
		}
		return finalFamilies.length ? finalFamilies.join('|') : '';
	}
};
