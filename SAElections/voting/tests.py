from django.test import TestCase

class ViewsTest(TestCase):
    def test_response(self):
        resp = self.client.get('/')
        self.assertEqual(resp.status_code, 200)