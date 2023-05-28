development: 
	docker-compose -f docker-compose.react.yml up 

test:
	docker-compose -f docker-compose.react.yml run --rm react npm test
	npm run test:server:local 
