#!/usr/bin/python3
# This only runs in the server to get vote stats from the database and writes them to a text file
import logging, sqlite3, time

currentDateTime = time.strftime('%c')
numberOfVoters = 0
peopleWithAbstains = 0
candidates = [ # [0] is for CHICSER, [6] is for Pisay LIFE
    'johan', 'kobe', 'jeri', 'sophia', 'linette', 'ronel',       # CHICSER Party
    'rysa', 'nicolas', 'franz', 'joshua', 'khristeena', 'jazzel' # Pisay LIFE   
]
votes = [ # [0] is for CHICSER, [6] is for Pisay LIFE
    0, 0, 0, 0, 0, 0, # CHICSER Party
    0, 0, 0, 0, 0, 0  # Pisay LIFE
]

logging.basicConfig(filename='log.txt', level=logging.INFO)
logging.info('[{0}] Gathering vote statistics from database...'.format(currentDateTime))

db = sqlite3.connect('SAElections/db.sqlite3')
cursor = db.cursor()

# Get vote statistics of each candidates
cursor.execute('''SELECT has_voted, people_voted FROM auth_user''')
for row in cursor:
    if row[0] == True:
        numberOfVoters += 1
        logging.info('[{0}] Row No. {1} Data: {2}'.format(currentDateTime, numberOfVoters, row[1].title()))

        for person in candidates:
            if person in row[1]:
                index = candidates.index(person)
                votes[index] += 1

        if 'none' in row[1]:
            peopleWithAbstains += 1

# WARNING! Do not set the admin's record's has_voted to true to prevent 
# miscalculations. Admins are not supposed to be included in the vote count.
# In the case that the admin's record's has_voted is set to true, set it
# to false immediately, or decrement the numberOfVoters value by the number of
# administrators as a temporary fix.

db.close()

# Log the data
logging.info('[{0}] Writing the statistical data to a text file'.format(currentDateTime))
logging.info('[{0}] Number of voters: {1}'.format(currentDateTime, numberOfVoters))

# Calculate the statistics
abstainVotes = [0, 0, 0, 0, 0, 0]

index = 0
while index < 6:
    abstainVotes[index] = numberOfVoters - (votes[index] + votes[index + 6])
    index += 1

stat = '\n=== PSHS-EVC Student Alliance Elections Vote Statistics ===\n'
stat += 'Current statistics as of {0}\n'.format(currentDateTime)
stat += 'Number of voters: {0}\n\n'.format(numberOfVoters)
stat += 'Vote Statistics:\n'
stat += '---------------------------------------------------------------------\n'
stat += '   Position\t\tCHICSER\t\tPisay LIFE\tAbstained\n'
stat += '---------------------------------------------------------------------\n'

index = 0
while index < 6:
    if index == 0:
        stat += '   President\t'
    elif index == 1:
        stat += '   Vice-President'
    elif index == 2:
        stat += '   Secretary\t'
    elif index == 3:
        stat += '   Treasurer\t'
    elif index == 4:
        stat += '   Auditor\t'
    elif index == 5:
        stat += '   P.I.O\t'

    stat += '\t{0}\t\t{1}\t\t{2}\n'.format(votes[index], votes[index + 6], abstainVotes[index])
    index += 1

totalChicserVotes = 0
totalPisayLifeVotes = 0
index = 0
while index < 12:
    if index < 6:
        totalChicserVotes += votes[index]
    elif index >= 6:
        totalPisayLifeVotes += votes[index]
    index += 1

stat += '---------------------------------------------------------------------\n'
stat += 'Total Party Votes:\t{0}\t\t{1}\n'.format(totalChicserVotes, totalPisayLifeVotes)
stat += '---------------------------------------------------------------------\n'
stat += 'Number of voters with abstain(s): {0}\n'.format(peopleWithAbstains)
stat += '---------------------------------------------------------------------\n'

print(stat)

file = open('stats.txt', 'w+')

file.write(stat)
file.close()