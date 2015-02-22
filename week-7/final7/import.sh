#!/bin/bash

mongoimport -d final7 -c albums albums.json
mongoimport -d final7 -c images images.json
