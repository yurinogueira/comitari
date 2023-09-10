#!/bin/bash

set -e

if [[ $COMMAND = "development" ]]; then
    echo "Running Development server"
    exec python -Wd manage.py runserver 0:8000
elif [[ $COMMAND = "worker" ]]; then
    echo "Running Celery Worker"
    exec python -m celery -A comitari worker -l INFO
elif [[ $COMMAND = "beat" ]]; then
    echo "Running Celery Beat"
    exec python -m celery -A comitari beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
else
    exec gunicorn \
        --bind 0.0.0.0:8000 \
        --reload \
        --capture-output \
        comitari.wsgi
fi
