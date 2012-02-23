EWS_ENDPOINT='https://owa.foo.com/EWS/Exchange.asmx'
PROXY_URL='ewsproxy.example.com'
TEST_EMAIL='me@foo.com'
TEST_PASSWORD='secret'

all:	deps install

deps:
	@npm install express
	@npm install git://github.com/ennui2342/node-soap.git

install:
	@sed -e 's|https://owa.example.com/EWS/Exchange.asmx|$(EWS_ENDPOINT)|' -i '' Services.wsdl
	@sed -e 's/ewsproxy.example.com/$(PROXY_URL)' -i '' index.html
	@sed -e 's/me@example.com/$(TEST_EMAIL)/' -i '' index.html
	@sed -e 's/XXX/$(TEST_PASSWORD)/' -i '' index.html
