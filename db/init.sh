#!/bin/sh
user=$1
pass=$2
host=$3
port=$4
db=$5

>&2 echo "Attempting to initialize DB"

# Initialize schema by sqitch
cd $(dirname "$BASH_SOURCE")/sqitch
docker run --link db:db -v `pwd`:`pwd` -w `pwd` --net discordbot_default --rm docteurklein/sqitch:pgsql deploy db:pg://$user:$pass@$host:$port/$db
# TODO Populate DB with data

>&2 echo "Successfully initialized DB"