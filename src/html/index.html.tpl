<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>KIRIN</title>
	<% _.forEach(csss, function(css) { %><link rel="stylesheet" href="<%- css %>"><%- "\n" %><% }); %>
</head>
<body id="main">
	<div id="menu">
		<ul>
			<li>Build</li>
			<li>Deploy</li>
			<li>Clean</li>
			<li>Test</li>
			<li>Settings</li>
		</ul>
	</div>
	<div ng-view></div>
	<div id="console"></div>
</body>
</html>
<% _.forEach(scripts, function(script) { %><script type="text/javascript" src="<%- script %>"></script><%- "\n" %><% }); %>