from pynamodb.models import Model
from pynamodb.attributes import (
    UnicodeAttribute, NumberAttribute, UnicodeSetAttribute, UTCDateTimeAttribute
)
class SoundTable(Model):
  class Meta:
    table_name = 'dev-ampeace-sound-table'
    region = 'eu-central-1'
  PK = UnicodeAttribute(hash_key=True, null=False)
  SK = UnicodeAttribute(range_key=True, null=False)
  sound_type = UnicodeAttribute(attr_name='sT')
  sound_name = UnicodeAttribute(attr_name='sN')
  
  def __iter__(self):
    for name, attr in self.get_attributes().items():
      yield name, attr.serialize(getattr(self, name))
  