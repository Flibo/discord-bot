#!/bin/sh
user=$1
pass=$2
host=$3
port=$4
db=$5
dockernetwork="discordbot_default"

>&2 echo "Attempting to initialize DB"

# Initialize schema with sqitch
cd $(dirname "$BASH_SOURCE")/../db/sqitch
docker run --link db:db -v `pwd`:`pwd` -w `pwd` --net $dockernetwork --rm docteurklein/sqitch:pgsql deploy db:pg://$user:$pass@$host:$port/$db
# Verify
docker run --link db:db -v `pwd`:`pwd` -w `pwd` --net $dockernetwork --rm docteurklein/sqitch:pgsql verify db:pg://$user:$pass@$host:$port/$db
# If needed, populate DB with data here