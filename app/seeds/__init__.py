from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # Seed the most important tables first
    seed_users()
    seed_categories()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # ORDER HERE IS VERY IMPORTANT!!!
    # START BY DELETING TABLES THAT DO NOT DEPEND ON ANYTHING!!!
    undo_categories()
    undo_users()
    # Add other undo functions here
