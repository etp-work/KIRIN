<!doctype html>
<html ng-app="mainApp">
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>KIRIN</title>
	<% _.forEach(csss, function(css) { %><link rel="stylesheet" href="<%- css %>"><%- "\n" %><% }); %>
</head>
<body>
	<div id="main">
		<div id="header">&nbsp;</div>
		<nav id="menuBar" class="navbar navbar-fixed-top navbar-inverse" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <span class="navbar-brand"><img src="images/kirin_logo.png" width="30"></img>Kirin</span>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav" ki-navactivator>
                        <li><a href="#/compile"><i class="fa fa-building-o">Compile</i></a></li>
                        <li><a href="#/test"><i class="fa fa-check-square-o">Test</i></a></li>
                        <li><a href="#/clean"><i class="fa fa-trash-o">Clean</i></a></li>
                        <li><a href="#/setting"><i class="fa fa-cogs">Setting</i></a></li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container -->
        </nav>
		<div id="content" ng-view class="slide"></div>
		<div id="footer">
            <ki-notification/>
        </div>
	</div>
</body>
</html>
<% _.forEach(scripts, function(script) { %><script type="text/javascript" src="<%- script %>"></script><%- "\n" %><% }); %>