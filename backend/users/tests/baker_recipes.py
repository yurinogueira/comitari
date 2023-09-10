from faker import Faker
from model_bakery.recipe import Recipe

FAKE = Faker("pt_BR")


user = Recipe(
    "users.User",
    username=FAKE.user_name,
    email=FAKE.email,
)
