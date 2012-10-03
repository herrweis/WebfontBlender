<?php
	class WebfontBlender{
		protected $_fontList = array();
		
		public function getFontList(){
			$json			= file_get_contents('currentFontList.json');
			if(strlen(trim($json))){
				return json_decode($json);
			} else{
				return array();
			}
		}
		
		public function cacheFonts($apiKey){
			$json			= file_get_contents('https://www.googleapis.com/webfonts/v1/webfonts?key='.$apiKey);
			if(strlen(trim($json))){
				$fontList	= json_decode($json);
				foreach($fontList->items as $fontFamily){
					if(in_array('latin', $fontFamily->subsets)){
						foreach($fontFamily->variants as $variant){
							$variantName		= str_replace('italic', ' italic', $variant);
							if(strpos($variantName, 'italic') !== false){
								$style			= 'italic';
								$weight			= str_replace(' italic', '', $variantName);
							}  else{
								$style			= '';
								$weight			= $variantName;
							}
							$font				= array(
								'name'			=> $fontFamily->family.' '.$variantName,
								'urlEncoded'	=> urlencode($fontFamily->family.':'.$variant),
								'fileName'		=> str_replace(' ', '_', $fontFamily->family).'_'.$variant.'.ttf',
								'family'		=> $fontFamily->family,
								'weight'		=> $weight,
								'style'			=> $style,
							);
							$this->_fontList[]	= $font;
							if(!@file_exists('fontcache/ttf/'.$font['fileName'])){
								$fontCss		= file_get_contents('http://fonts.googleapis.com/css?family='.$font['urlEncoded'].'&subset=latin');
								preg_match('%url\((.*?)\)%', $fontCss, $fontFile);
								if(count($fontFile == 2)){
									$fontFile	= file_get_contents($fontFile[1]);
									file_put_contents('fontcache/ttf/'.$font['fileName'], $fontFile);
								}
							}
						}
					}
				}
				file_put_contents('currentFontList.json', json_encode($this->_fontList));
				$this->_renderFontPreviews();
			}
		}

		private function _renderFontPreviews(){
			foreach($this->_fontList as $font){
				if(!@file_exists('fontcache/previews/'.$font['fileName'].'.png')){
					$im					= imagecreatetruecolor(300, 50);
					$white				= imagecolorallocate($im, 255, 255, 255);
					$black				= imagecolorallocate($im, 0, 0, 0);
					imagefilledrectangle($im, 0, 0, 300, 50, $white);
					imagecolortransparent($im, $white);
					imagettftext($im, 16, 0, 10, 33, $black, 'fontcache/ttf/'.$font['fileName'], $font['name']);
					imagepng($im, 'fontcache/previews/'.$font['fileName'].'.png');
					imagedestroy($im);
				}
			}
		}
	}
?>