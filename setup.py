from setuptools import setup

import os

# Put here required packages
packages = [
    'Django<=1.8',
    'python-social-auth<=0.2.9',
]

if 'REDISCLOUD_URL' in os.environ and 'REDISCLOUD_PORT' in os.environ and 'REDISCLOUD_PASSWORD' in os.environ:
     packages.append('django-redis-cache')
     packages.append('hiredis')

setup(
    name='PSHS-EVC Student Alliance Web App',
    version='0.2.0',
    description='This web app allows PSHS-EVC students to vote their next set of Student Alliance officers for S.Y. 2015-2016',
    author='Sean Francis N. Ballais',
    author_email='sfballais123@gmail.com',
    url='https://github.com/seanballais/SAElections',
    install_requires=packages,
)