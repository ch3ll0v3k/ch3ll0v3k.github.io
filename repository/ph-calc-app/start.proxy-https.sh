#!/bin/bash

region=eu
domain=open-cam-ph-meter
# HOST='192.168.0.140'
HOST='127.0.0.1'
PORT='8080'

ngrok http -region $region -subdomain=$domain http://$HOST:$PORT
echo "https://$domain.$region.ngrok.io"

# http://open-cam-ph-meter.eu.ngrok.io
# https://open-cam-ph-meter.eu.ngrok.io


