init: down rebuild

up:
	docker-compose -f docker-compose.yml up -d
down:
	docker-compose -f docker-compose.yml down --remove-orphans
rebuild:
	docker-compose -f docker-compose.yml up -d --build