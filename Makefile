#!/bin/bash
.PHONY: default
.SILENT:

# Development
# -----------------------------------------------------------------------------
bash:
	docker compose exec -it api bash

shell:
	docker compose exec -it api python manage.py shell_plus

migrate:
	docker compose exec api python manage.py migrate

migrations:
	docker compose exec api python manage.py makemigrations

development:
	docker compose up -d

stop:
	docker compose down

collect-static:
	docker compose exec api python manage.py collectstatic

createsuperuser:
	docker compose exec -it api python manage.py createsuperuser

load-data:
	docker compose exec api python manage.py loaddata $(args)

manage:
	docker compose exec api python manage.py $(args)


# Code Quality
# -----------------------------------------------------------------------------
test:
	docker compose exec api pytest


# Build
# -----------------------------------------------------------------------------
build-backend:
	docker build --no-cache --force-rm -f docker/django/Dockerfile -t ngrtec/comitari:$(version) .
