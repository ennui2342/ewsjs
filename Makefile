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

test:
	@sed -i.dist -e 's/ewsproxy.example.com/$(PROXY_URL)/' -e 's/me@example.com/$(TEST_EMAIL)/' -e 's/XXX/$(TEST_PASSWORD)/' index.html

clean:
	for f in index.html; do \
		mv $$f.dist $$f; \
	done
