** data.json **

	{
		"t:Mailbox": {
			"t:Address": "me@example.com"
		},
		"t:UserOofSettings": {
			"t:OofState": "Disabled",
			"t:ExternalAudience": "All",
			"t:InternalReply": {
				"t:Message": "I have left the building"
			},
			"t:ExternalReply": {
				"t:Message": "foobar"
			}
		}
	}

** curl 'http://ewsproxy.example.com:8084/me@example.com?password=XXX' -X POST -d@data.json -H'Content-type:application/json' **

	{
	  "ResponseMessage": [
	    {
	      "ResponseCode": [
	        "NoError"
	      ]
	    }
	  ]
	}


** curl 'http://ewsproxy.example.com:8084/me@example.com?password=XXX **

	{
	  "ResponseMessage": {
	    "ResponseCode": [
	      "NoError"
	    ]
	  },
	  "OofSettings": {
	    "OofState": "Disabled",
	    "ExternalAudience": "All",
	    "Duration": {
	      "StartTime": "2012-02-22T17:00:00",
	      "EndTime": "2012-02-23T17:00:00"
	    },
	    "InternalReply": {
	      "Message": "I have left the building"
	    },
	    "ExternalReply": {
	      "Message": "foobar"
	    }
	  },
	  "AllowExternalOof": [
	    "All"
	  ]
	}

** Example use in webpage **

	<html>
	<head>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	</head>
	<body>
	
	<script type='text/javascript'>
	(function() {
		$.getJSON('http://ewsproxy.example.com:8084/me@example.com?password=XXX', function(data) {
			document.write(JSON.stringify(data));
		});
	})();
	</script>

	</body>
	</html>
