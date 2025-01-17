ARG APP_ROOT=/app
ARG VENV_PATH=$APP_ROOT/.venv
ARG MEDIA_FILES_PATH=$APP_ROOT/mediafiles
ARG STATIC_FILES_PATH=$APP_ROOT/staticfiles
ARG POETRY_INSTALL_ARGS="--no-interaction --no-ansi"
ARG APT_INSTALL_ARGS="-qq --no-install-recommends -o Dpkg::Use-Pty=0"
ARG RUN_AS_USER_NAME="abc"
ARG RUN_AS_USER_UID="1000"

FROM python:3.10-slim AS base
ARG APP_ROOT \
    VENV_PATH \
    MEDIA_FILES_PATH \
    STATIC_FILES_PATH

# Set environment variables
ENV VENV_PATH=$VENV_PATH \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=$APP_ROOT \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    DEBIAN_FRONTEND=noninteractive
ENV PATH=$VENV_PATH/bin:$PATH

WORKDIR $APP_ROOT
VOLUME [ "$MEDIA_FILES_PATH" ]
VOLUME [ "$STATIC_FILES_PATH" ]
# ENTRYPOINT [ "./entrypoint.sh" ]

RUN mkdir -p "$MEDIA_FILES_PATH" "$STATIC_FILES_PATH"

COPY classroomconversation ./
COPY pyproject.toml poetry.lock entrypoint.sh ./

# Install packages and dependencies
## Install Poetry
RUN pip install -q --upgrade pip && \
    pip install -q poetry && \
    poetry config virtualenvs.in-project true

FROM base AS development
ARG POETRY_INSTALL_ARGS \
    APT_INSTALL_ARGS

## Install dependencies (dev)
RUN poetry install $POETRY_INSTALL_ARGS

RUN apt-get update -qq && \
    apt-get install $APT_INSTALL_ARGS gettext && \
    rm -rf "/var/cache/apt/*" "/var/lib/apt/lists/*"

COPY .flake8 .bandit ./
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

FROM base AS production
ARG POETRY_INSTALL_ARGS \
    APP_ROOT \
    RUN_AS_USER_NAME \
    RUN_AS_USER_UID

# Install dependencies (prod)
RUN poetry install $POETRY_INSTALL_ARGS --no-dev

CMD ["gunicorn", "classroomconversation.wsgi:application", "--bind", "0.0.0.0:8000"]

# Set up user and permissions
RUN useradd -Ms /bin/bash -u $RUN_AS_USER_UID $RUN_AS_USER_NAME
RUN chown -R $RUN_AS_USER_NAME:$RUN_AS_USER_NAME $APP_ROOT
RUN chmod -R 755 $APP_ROOT

USER $RUN_AS_USER_NAME
