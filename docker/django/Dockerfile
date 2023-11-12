FROM python:3.11-slim

LABEL maintainer="personal@yurinogueira.dev.br"
LABEL vendor="NGRTec"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y gcc python3-dev musl-dev libmagic1 libffi-dev netcat-traditional build-essential libpq-dev

WORKDIR /app

COPY backend .

RUN pip3 install poetry gunicorn
RUN poetry export -f requirements.txt -o requirements.txt --without-hashes
RUN pip3 install -r requirements.txt

EXPOSE 8000

COPY docker/django/docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]
