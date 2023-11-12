#!/bin/sh

set -e

if [ "$COMMAND" = "development" ]; then
    echo "Running Development server"
    exec python -Wd manage.py runserver 0:8000
else
    exec gunicorn \
        --bind 0.0.0.0:8000 \
        --reload \
        --capture-output \
        comitari.wsgi
fi
