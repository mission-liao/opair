"""init user table

Revision ID: 10e75f133658
Revises: None
Create Date: 2013-11-20 18:05:23.759566

"""

# revision identifiers, used by Alembic.
revision = '10e75f133658'
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
        sa.Column('password', sa.String(64)),
        sa.Column('gender', sa.Enum('male', 'female', 'bisexual', 'none', name='gender_type')),
        sa.Column('joinTime', sa.DateTime()),
        sa.Column('bDate', sa.Date()),
        sa.Column('location', sa.Integer, default=0)
    )

def downgrade_engine1():
    op.drop_table('User')

