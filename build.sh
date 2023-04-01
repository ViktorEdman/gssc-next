#!/bin/bash
docker-compose up --detach db
docker-compose up -d --build
