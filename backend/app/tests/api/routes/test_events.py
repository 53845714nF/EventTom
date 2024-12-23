from fastapi.testclient import TestClient
from sqlmodel import Session

from app import crud
from app.core.config import settings
from app.models import EmployeeCreate, Role
from app.tests.utils.utils import random_email, random_lower_string


def test_create_event(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    username = random_email()
    password = random_lower_string()
    role = Role.EVENTMANAGER
    employee = EmployeeCreate(email=username, password=password, role=role)
    manager = crud.create_employee(session=db, user_create=employee)
    manager_id = manager.id

    data = {
        "title": "38C3",
        "description": "Biggest hacker party in Europe",
        "count": 13000,
        "threshold": 0,
        "base_price": 130,
        "pay_fee": 0,
        "manager_id": str(manager_id),
    }

    response = client.post(
        f"{settings.API_V1_STR}/events/",
        headers=superuser_token_headers,
        json=data,
    )

    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert content["description"] == data["description"]
    assert content["count"] == data["count"]
    assert "id" in content


# TODO change item tests to event tests
# def test_read_item(
#    client: TestClient, superuser_token_headers: dict[str, str], db: Session
# ) -> None:
#    event = create_random_event(db)
#    response = client.get(
#        f"{settings.API_V1_STR}/eventss/{event.id}",
#        headers=superuser_token_headers,
#    )
#    assert response.status_code == 200
#    content = response.json()
#    assert content["title"] == item.title
#    assert content["description"] == item.description
#    assert content["id"] == str(item.id)
#    assert content["owner_id"] == str(item.owner_id)
#
#
# def test_read_item_not_found(
#    client: TestClient, superuser_token_headers: dict[str, str]
# ) -> None:
#    response = client.get(
#        f"{settings.API_V1_STR}/items/{uuid.uuid4()}",
#        headers=superuser_token_headers,
#    )
#    assert response.status_code == 404
#    content = response.json()
#    assert content["detail"] == "Item not found"
#
#
# def test_read_item_not_enough_permissions(
#    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
# ) -> None:
#    item = create_random_item(db)
#    response = client.get(
#        f"{settings.API_V1_STR}/items/{item.id}",
#        headers=normal_user_token_headers,
#    )
#    assert response.status_code == 400
#    content = response.json()
#    assert content["detail"] == "Not enough permissions"
#
#
# def test_read_items(
#    client: TestClient, superuser_token_headers: dict[str, str], db: Session
# ) -> None:
#    create_random_item(db)
#    create_random_item(db)
#    response = client.get(
#        f"{settings.API_V1_STR}/items/",
#        headers=superuser_token_headers,
#    )
#    assert response.status_code == 200
#    content = response.json()
#    assert len(content["data"]) >= 2
#
#
# def test_update_item(
#    client: TestClient, superuser_token_headers: dict[str, str], db: Session
# ) -> None:
#    item = create_random_item(db)
#    data = {"title": "Updated title", "description": "Updated description"}
#    response = client.put(
#        f"{settings.API_V1_STR}/items/{item.id}",
#        headers=superuser_token_headers,
#        json=data,
#    )
#    assert response.status_code == 200
#    content = response.json()
#    assert content["title"] == data["title"]
#    assert content["description"] == data["description"]
#    assert content["id"] == str(item.id)
#    assert content["owner_id"] == str(item.owner_id)
#
#
# def test_update_item_not_found(
#    client: TestClient, superuser_token_headers: dict[str, str]
# ) -> None:
#    data = {"title": "Updated title", "description": "Updated description"}
#    response = client.put(
#        f"{settings.API_V1_STR}/items/{uuid.uuid4()}",
#        headers=superuser_token_headers,
#        json=data,
#    )
#    assert response.status_code == 404
#    content = response.json()
#    assert content["detail"] == "Item not found"
#
#
# def test_update_item_not_enough_permissions(
#    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
# ) -> None:
#    item = create_random_item(db)
#    data = {"title": "Updated title", "description": "Updated description"}
#    response = client.put(
#        f"{settings.API_V1_STR}/items/{item.id}",
#        headers=normal_user_token_headers,
#        json=data,
#    )
#    assert response.status_code == 400
#    content = response.json()
#    assert content["detail"] == "Not enough permissions"
#
#
# def test_delete_item(
#    client: TestClient, superuser_token_headers: dict[str, str], db: Session
# ) -> None:
#    item = create_random_item(db)
#    response = client.delete(
#        f"{settings.API_V1_STR}/items/{item.id}",
#        headers=superuser_token_headers,
#    )
#    assert response.status_code == 200
#    content = response.json()
#    assert content["message"] == "Item deleted successfully"
#
#
# def test_delete_item_not_found(
#    client: TestClient, superuser_token_headers: dict[str, str]
# ) -> None:
#    response = client.delete(
#        f"{settings.API_V1_STR}/items/{uuid.uuid4()}",
#        headers=superuser_token_headers,
#    )
#    assert response.status_code == 404
#    content = response.json()
#    assert content["detail"] == "Item not found"
#
#
# def test_delete_item_not_enough_permissions(
#    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
# ) -> None:
#    item = create_random_item(db)
#    response = client.delete(
#        f"{settings.API_V1_STR}/items/{item.id}",
#        headers=normal_user_token_headers,
#    )
#    assert response.status_code == 400
#    content = response.json()
#    assert content["detail"] == "Not enough permissions"
#
