#!/bin/bash
postgres_host=$1
postgres_port=$2
cmd="${@:3}"

export PGPASSWORD=secret

# wait for the postgres docker to be running
while ! psql -t -d discordbot -h $postgres_host -p $postgres_port -c "SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'bot';" | egrep .; do
  >&2 echo "Sqitch was not run yet - sleeping"
  sleep 1
done

>&2 echo "Sqitch was run - starting up bot"

# run the command
exec $cmd