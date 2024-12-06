"""No owner on voucher

Revision ID: 656dfefdf95a
Revises: 40b5291e7e4f
Create Date: 2024-12-15 16:52:54.198570

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '656dfefdf95a'
down_revision = '40b5291e7e4f'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
