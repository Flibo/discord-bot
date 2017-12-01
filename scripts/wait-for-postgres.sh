#!/bin/bash
postgres_host=$1
postgres_port=$2
cmd="${@:3}"

# wait for the postgres docker to be running
while ! pg_isready -h $postgres_host -p $postgres_port -q; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - starting up Sqitch"

# run the command
exec $cmd