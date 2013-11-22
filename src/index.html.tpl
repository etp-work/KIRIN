<!doctype html>
<html ng-app="mainApp">
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<title>KIRIN</title>
	<% _.forEach(csss, function(css) { %><link rel="stylesheet" href="<%- css %>"><%- "\n" %><% }); %>
</head>
<body>
	<div id="main">
		<div id="header">&nbsp;</div>
		<div id="sidebar">&nbsp;</div>
		<div id="content" ng-view>&nbsp;</div>
		<div id="footer">&nbsp;</div>
	</div>
</body>
</html>
<% _.forEach(scripts, function(script) { %><script type="text/javascript" src="<%- script %>"></script><%- "\n" %><% }); %>