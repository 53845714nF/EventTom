import uuid

from fastapi.encoders import jsonable_encoder

my_obj = {"obj_id": uuid.uuid4(), "name": "John"}

print(my_obj)

json = jsonable_encoder(my_obj)

print(json)
