#!/bin/bash
# Show statistics
while true
do
    clear
    ./scripts/getVoteStats.py
    echo "Press [CTRL+C] to stop..."
    sleep 5s
done