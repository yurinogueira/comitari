FROM python:3.11-alpine AS py-base

LABEL maintainer="personal@yurinogueira.dev.br"
LABEL vendor="NGRTec"

ENV PYTHONFAULTHANDLER=1 \
    PYTHONHASHSEED=random \
    PYTHONUNBUFFERED=1 \
    PIP_DEFAULT_TIMEOUT=100 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

COPY backend .

RUN apk add bash

FROM py-base AS py-build

ENV POETRY_VIRTUALENVS_CREATE=false

RUN apk add --no-cache gcc libffi-dev musl-dev postgresql-dev

RUN pip install poetry

RUN poetry install --no-interaction --no-ansi

FROM py-base AS runtime

EXPOSE 8000

COPY --from=py-build /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY docker/django/docker-entrypoint.sh /docker-entrypoint.sh

RUN poetry add gunicorn
RUN chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]
