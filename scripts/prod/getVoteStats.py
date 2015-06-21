#!/usr/bin/python3
# This only runs in the server to get vote stats from the database and writes them to a text file
import logging, sqlite3, time

currentDateTime = time.strftime('%c')
candidates = ['castillejos', 'bismark', 'latorre', 'sevilla', 'limsiaco', 'ecaldre']
numberOfVoters = 0
proVotes = [0, 0, 0, 0, 0, 0]

logging.basicConfig(filename='log.txt', level=logging.INFO)
logging.info('[{0}] Gathering vote statistics from database...'.format(currentDateTime))

db = sqlite3.connect('SAElections/db.sqlite3')
cursor = db.cursor()

# Get vote statistics of each candidates
cursor.execute('''SELECT is_pshsevc, people_voted FROM auth_user''')
for row in cursor:
    if row[0] == True:
        numberOfVoters += 1

        logging.info('[{0}] Row No. {1} Data: {2}'.format(currentDateTime, numberOfVoters, row[1].title()))

        for person in candidates:
            if person in row[1]:
                index = candidates.index(person)
                proVotes[index] += 1

# Do not set the admin's record's is_pshsevc to true to prevent miscalculations.
# Admins are not supposed to be included in the vote count.
# In the case that the admin's record's is_pshsevc is set to true, set it
# to false immediately, or decrement the numberOfVoters value by 1
# as a temporary fix.

db.close()

# Log the data
logging.info('[{0}] Writing the statistical data to a text file'.format(currentDateTime))
logging.info('[{0}] Number of voters: {1}'.format(currentDateTime, numberOfVoters))

# Calculate the statistics
antiVotes = [0, 0, 0, 0, 0, 0]

index = 0
for numberOfVotes in proVotes:
    antiVotes[index] = numberOfVoters - numberOfVotes
    index += 1

stat = '\n=== PSHS-EVC Student Alliance Elections Vote Statistics ===\n'
stat += 'Current statistics as of {0}\n'.format(currentDateTime)
stat += 'Number of voters: {0}\n\n'.format(numberOfVoters)
stat += 'Vote Statistics\n'

index = 0
for candidate in candidates:
    stat += '- {0}\t\tPro Votes: {1}\tAnti Votes: {2}\n'.format(candidate.title(), str(proVotes[index]), str(antiVotes[index]))
    index += 1

print(stat)

file = open('stats.txt', 'w+')

file.write(stat)
file.close()