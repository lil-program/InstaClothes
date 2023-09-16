"""empty message

Revision ID: be3340da19c5
Revises: b1b5e791388b
Create Date: 2023-09-16 13:45:04.217277

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'be3340da19c5'
down_revision: Union[str, None] = 'b1b5e791388b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('clothes', 'shop_url',
               existing_type=sa.VARCHAR(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('clothes', 'shop_url',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###