from pytest import mark


@mark.django_db
class TestUser:
    def test_str(self, user):
        assert str(user) == user.email
