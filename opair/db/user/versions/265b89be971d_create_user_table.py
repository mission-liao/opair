"""create user table

Revision ID: 265b89be971d
Revises: None
Create Date: 2013-11-12 16:38:34.708469

"""

# revision identifiers, used by Alembic.
revision = '265b89be971d'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade(engine_name):
    eval("upgrade_%s" % engine_name)()


def downgrade(engine_name):
    eval("downgrade_%s" % engine_name)()





def upgrade_engine1():
    op.create_table(
        'User',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('email', sa.String(255), unique=True),
        sa.Column('gender', sa.Enum('male', 'female', 'bi', 'none', name='gender_type')),
        sa.Column('join_time', sa.DateTime()),
        sa.Column('b_date', sa.Date())
    )

def downgrade_engine1():
    op.drop_table('User')

