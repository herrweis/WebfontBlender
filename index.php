<?php
	require_once('lib/class.WebfontBlender.php');
	$webfontBlender	= new WebfontBlender();
	$fontList		= $webfontBlender->getFontList();
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

		<title>The Web Font Blender - Find neat web font combinations</title>
		<meta name="description" content="" />
		<meta name="author" content="Andreas Weis" />

		<meta name="viewport" content="width=device-width; initial-scale=1.0" />

		<!-- Replace favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
		<link rel="shortcut icon" href="favicon.ico" />
		<link rel="stylesheet" type="text/css" href="css/normalize.css"/>
		<link rel="stylesheet" type="text/css" href="css/wb.css"/>
		
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
		<script src="js/tabs.js" type="text/javascript"></script>
		<script src="js/WFBlenderConfig.js" type="text/javascript"></script>
		<script src="js/WFBlender.js" type="text/javascript"></script>
		<script src="js/grabCode.js" type="text/javascript"></script>
	</head>

	<body spellcheck="false">
		<aside id="panel" class="tabs">
			<nav>
				<ul>
					<li class="icon icon-th-list" data-section="font">Font</li>
					<li class="icon icon-cog" data-section="settings">Settings</li>
				</ul>
			</nav>
			<section id="section-font">
				<div id="nofontselected">
					<p>Please select a headline or a paragraph.</p>
				</div>
				<div id="fontselected">
					<h2>Font size</h2>
					<div>
						<input type="text" id="font-size" /> px
						<span class="conversion">1.000em<br/>100%</span>
					</div>
					<h2>Line height</h2>
					<div>
						<input type="text" id="line-height" /> px
						<span class="conversion">24px<br/>160%</span>
					</div>
					<h2>Font family</h2>
					<div id="font-search">
						<input type="text" id="search-fonts" data-origvalue="Search fonts ..."/>
					</div>
					<div id="google-fonts" class="nano">
						<ul class="content" id="google-fonts-list">
							<li class="headline">System fonts</li>
							<li data-font-type="system" data-font-name="Arial" data-font-family="Arial" data-font-weight="normal" data-font-style="" style="font-family: Arial;">Arial</li>
							<li data-font-type="system" data-font-name="Arial" data-font-family="Arial" data-font-weight="normal" data-font-style="italic" style="font-family: Arial; font-style: italic;">Arial Italic</li>
							<li data-font-type="system" data-font-name="Arial" data-font-family="Arial" data-font-weight="bold" data-font-style="" style="font-family: Arial; font-weight: bold;">Arial Bold</li>
							<li data-font-type="system" data-font-name="Arial" data-font-family="Arial" data-font-weight="bold" data-font-style="italic" style="font-family: Arial; font-weight: bold; font-style: italic;">Arial BoldItalic</li>
							<li data-font-type="system" data-font-name="Georgia" data-font-family="Georgia" data-font-weight="normal" data-font-style="" style="font-family: 'Georgia';">Georgia</li>
							<li data-font-type="system" data-font-name="Georgia" data-font-family="Georgia" data-font-weight="normal" data-font-style="italic" style="font-family: 'Georgia'; font-style: italic;">Georgia Italic</li>
							<li data-font-type="system" data-font-name="Georgia" data-font-family="Georgia" data-font-weight="bold" data-font-style="" style="font-family: 'Georgia'; font-weight: bold;">Georgia Bold</li>
							<li data-font-type="system" data-font-name="Georgia" data-font-family="Georgia" data-font-weight="bold" data-font-style="italic" style="font-family: 'Georgia'; font-weight: bold; font-style: italic;">Georgia BoldItalic</li>
							<li data-font-type="system" data-font-name="Times New Roman" data-font-family="Times New Roman" data-font-weight="normal" data-font-style="" style="font-family: 'Times New Roman';">Times New Roman</li>
							<li data-font-type="system" data-font-name="Times New Roman" data-font-family="Times New Roman" data-font-weight="normal" data-font-style="italic" style="font-family: 'Times New Roman'; font-style: italic;">Times New Roman Italic</li>
							<li data-font-type="system" data-font-name="Times New Roman" data-font-family="Times New Roman" data-font-weight="bold" data-font-style="" style="font-family: 'Times New Roman'; font-weight: bold;">Times New Roman Bold</li>
							<li data-font-type="system" data-font-name="Times New Roman" data-font-family="Times New Roman" data-font-weight="bold" data-font-style="italic" style="font-family: 'Times New Roman'; font-weight: bold; font-style: italic;">Times New Roman BoldItalic</li>
							<li data-font-type="system" data-font-name="Trebuchet MS" data-font-family="Trebuchet MS" data-font-weight="normal" data-font-style="" style="font-family: 'Trebuchet MS';">Trebuchet MS</li>
							<li data-font-type="system" data-font-name="Trebuchet MS" data-font-family="Trebuchet MS" data-font-weight="normal" data-font-style="italic" style="font-family: 'Trebuchet MS'; font-style: italic;">Trebuchet MS Italic</li>
							<li data-font-type="system" data-font-name="Trebuchet MS" data-font-family="Trebuchet MS" data-font-weight="bold" data-font-style="" style="font-family: 'Trebuchet MS'; font-weight: bold;">Trebuchet MS Bold</li>
							<li data-font-type="system" data-font-name="Trebuchet MS" data-font-family="Trebuchet MS" data-font-weight="bold" data-font-style="italic" style="font-family: 'Trebuchet MS'; font-weight: bold; font-style: italic;">Trebuchet MS BoldItalic</li>
							<li data-font-type="system" data-font-name="Verdana" data-font-family="Verdana" data-font-weight="normal" data-font-style="" style="font-family: 'Verdana';">Verdana</li>
							<li data-font-type="system" data-font-name="Verdana" data-font-family="Verdana" data-font-weight="normal" data-font-style="italic" style="font-family: 'Verdana'; font-style: italic;">Verdana Italic</li>
							<li data-font-type="system" data-font-name="Verdana" data-font-family="Verdana" data-font-weight="bold" data-font-style="" style="font-family: 'Verdana'; font-weight: bold;">Verdana Bold</li>
							<li data-font-type="system" data-font-name="Verdana" data-font-family="Verdana" data-font-weight="bold" data-font-style="italic" style="font-family: 'Verdana'; font-weight: bold; font-style: italic;">Verdana BoldItalic</li>
							<li class="headline">Google web fonts</li>
							<?php foreach($fontList as $font):?>
							<li data-font-type="google" data-font-name="<?php echo strtolower($font->name);?>" data-font-url="<?php echo $font->urlEncoded; ?>" data-font-family="<?php echo $font->family; ?>" data-font-weight="<?php echo $font->weight; ?>" data-font-style="<?php echo $font->style; ?>" style="background-image: url(fontcache/previews/<?php echo $font->fileName; ?>.png)"><?php echo $font->name;?></li>
						<?php endforeach;?></ul>
					</div>
				</div>
			</section>
			<section id="section-settings">
				<h2>Visibility</h2>
				<ul>
					<li id="visible-h1" class="icon icon-ok">Headline</li>
					<li id="visible-h2" class="icon icon-ok">Subline</li>
					<li id="visible-div" class="icon icon-ok">Paragraph</li>
				</ul>
				<h2>Body font size</h2>
				<div>
					<input type="text" id="body-font-size" value="16"/> px
					<span class="conversion">1em<br/>100%</span>
				</div>
			</section>
		</aside>
		<div id="content" class="tabs">
			<nav>
				<ul>
					<li id="nav-home" class="icon icon-home" data-section="home">Blend fonts</li>
					<li id="nav-code" class="icon icon-code" data-section="code">Grab code</li>
					<li id="nav-about" class="icon icon-info-circle" data-section="about">About</li>
				</ul>
			</nav>
			<section id="section-home">
				<h1 contenteditable="true" data-start-value="2"><span><span>Click me</span>&#xe75e;</span>Welcome to the Web Font Blender</h1>
				<h2 contenteditable="true" data-start-value="2"><span><span>Click me</span>&#xe75e;</span>A little tool to checkout neat webfont combinations. Obviously we all want to make the web look better, don't we?</h2>
				<div id="bodytext" data-start-value="0"><span><span>Click me</span>&#xe75e;</span>
					<p contenteditable="true">The usage is pretty simple: Just select the text element you want to style by clicking on it. In the left bar you can change the font family, the size and the line height. For your convenience all measurements are shown in PX, EM and percent, so you can easily copy and paste it in your stylesheets. Of course, you can adjust the body font size (the base size from which all measurements derive) as well as changing the visibility of certain elements in the "Settings" section.</p>
					<p contenteditable="true">If you've found a web font combination suiting your needs you can grab the code on the "Grab codes" page, where you not only find the adequate code to link the web fonts but also the css for the body, h1, h2 and p elements. Happy blending!</p>
				</div>
			</section>
			<section id="section-code">
				<h2>Font files</h2>
				<code id="code-fontfile">There is no need to load a specific font at the moment</code>
				<h2>CSS</h2>
				<code id="code-css">body{
	font-family: Arial, sans-serif;
	font-size: 100%;
	line-height: 1.6;
}
h1{
	font-size: 2.5em;
}
h2{
	font-size: 1.5em;
}
p{
	font-size: 1em;
}</code>
			</section>
			<section id="section-about">
				<h1>About the Blender</h1>
				<p>Although there are pages like <a href="http://font-combinator.com/">The Web Font Combinator</a> and <a href="http://pxtoem.com/">PXtoEM</a> I felt the need of a tool combining certain functions I personally need nearly every day. So I came up with the Web Font Blender. Hopefully you find this tool as helpful as I do.</p>
				<p>Designed and developed by <a href="http://andreasweis.com/portfolio/en.html">Andreas Weis</a>. Checkout the code on <a href="https://github.com/herrweis/WebfontBlender">Github</a>. If you find a bug please feel free to email me <a href="mailto:post@andreasweis.com">post@andreasweis.com</a></p>
				<h2>Beware</h2>
				<p>This site was tested with the latest versions of Chrome, Safari and Firefox. I just hate IE...</p>
				<h2>Credits</h2>
				<p><a href="http://chipcullen.com/">Chip Cullen</a> for his inspiring <a href="http://font-combinator.com/">Web Font Combinator</a></p>
				<p><a href="http://briancray.com/">Brian Cray</a> for <a href="http://pxtoem.com/">PXtoEM</a> - one of the most useful tools for font unit conversions</p>
				<p><a href="http://tollwerk.de">Joschi Kuphal</a> for showing me the right path how to solve the font cache problem.</p>
			</section>
		</div>
	</body>
</html>
