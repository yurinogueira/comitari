FROM python:3.11-slim

LABEL maintainer="personal@yurinogueira.dev.br"
LABEL vendor="NGRTec"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y gcc python3-dev musl-dev libmagic1 libffi-dev netcat-traditional build-essential libpq-dev

WORKDIR /app

COPY backend .

RUN pip3 install poetry
RUN poetry install --no-interaction --no-ansi

EXPOSE 8000

COPY docker/django/docker-entrypoint.sh /docker-entrypoint.sh

RUN poetry add gunicorn

RUN chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]
