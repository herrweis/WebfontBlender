<?php
	require_once('lib/class.WebfontBlender.php');
	$webfontBlender	= new WebfontBlender();
	$fontList		= $webfontBlender->getFontList();
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />

		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

		<title>The Webfont Blender - Find neat webfont combinations</title>
		<meta name="description" content="" />
		<meta name="author" content="Andreas Weis" />

		<meta name="viewport" content="width=device-width; initial-scale=1.0" />

		<!-- Replace favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
		<link rel="stylesheet" type="text/css" href="css/normalize.css"/>
		<link rel="stylesheet" type="text/css" href="css/nanoscroller.css"/>
		<link rel="stylesheet" type="text/css" href="css/wb.css"/>
		
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
		<script src="js/jquery.nanoscroller.min.js" type="text/javascript"></script>
		<script src="js/tabs.js" type="text/javascript"></script>
		<script src="js/fonts.js" type="text/javascript"></script>
		<script src="js/grabCode.js" type="text/javascript"></script>
	</head>

	<body>
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
						<ul class="content" id="google-fonts-list"><?php foreach($fontList as $font):?>
							<li data-font-name="<?php echo strtolower($font->name);?>" data-font-url="<?php echo $font->urlEncoded; ?>" data-font-family="<?php echo $font->family; ?>" data-font-weight="<?php echo $font->weight; ?>" data-font-style="<?php echo $font->style; ?>" style="background-image: url(fontcache/previews/<?php echo $font->fileName; ?>.png)"><?php echo $font->name;?></li>
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
				<h1 contenteditable="true">Welcome to the Webfont Blender</h1>
				<h2 contenteditable="true">A little tool to checkout neat webfont combinations. Obviously we all want to make the web look better, don't we?</h2>
				<div id="bodytext">
					<p contenteditable="true">The usage is pretty simple: Just select the text element you want to style by clicking on it. In the left bar you can change the font family, the size and the line height. For your convinience all measurements are shown in PX, EM and percent, so you can easily copy and paste it in your stylesheets. Of course, you can adjust the body font size (the base size from which all measurements derive) as well as changing the visibility of certain elements in the "Settings" section.</p>
					<p contenteditable="true">If you found a webfont combination suiting your needs you can grab the code on the "Grab codes" page, where you not only find the adequate code to link the webfonts but also the css for the body, h1, h2 and p elements.</p>
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
				<h1>About the Webfont Blender</h1>
				<p>Some text about the idea and linkage to the original</p>
			</section>
		</div>
	</body>
</html>
