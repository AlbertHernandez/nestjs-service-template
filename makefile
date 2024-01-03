start-dev:
	docker-compose up -d my-service-dev

start-production:
	docker-compose up -d my-service-production

stop:
	docker-compose down

test:
	npm run test

lint:
	npm run lint

lint-fix:
	npm run lint:fix

build:
	npm run build
