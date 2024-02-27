#!/bin/bash
docker compose up --detach db
time docker compose up -d --build
