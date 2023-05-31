#!/bin/sh

echo "###################################";
echo "INICIANDO MIGRACIÓN";
echo `date`
echo "###################################";

# Only for reset schema db:
# npm run db:reset;
npm run db:migrate;
npm run start:dev;

echo "###################################";
echo "MIGRACIÓN FINALIZADA; APP RUNNING";
echo `date`
echo "###################################";