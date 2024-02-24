# pull official slim base image
FROM python:3.11-slim

# set working directory
WORKDIR /app/

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    ln -s /opt/poetry/bin/poetry /usr/local/bin/poetry && \
    poetry config virtualenvs.create false && \
    apt-get remove -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy only the necessary files for dependency installation
COPY pyproject.toml poetry.lock* /app/

# Allow installing dev dependencies to run tests
ARG INSTALL_DEV=false
RUN if [ "$INSTALL_DEV" = "true" ] ; then poetry install --no-root ; else poetry install --no-root --only main ; fi

# add the rest of the application files
COPY . .

# set executable permissions in a single RUN command
RUN chmod +x /app/scripts/start.sh /app/scripts/prestart.sh

# define the command to run the application
CMD ["/app/scripts/start.sh"]
