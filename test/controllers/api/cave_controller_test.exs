defmodule Cavemapper.Api.CaveControllerTest do
  use Cavemapper.ConnCase

  alias Cavemapper.Cave
  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, api_cave_path(conn, :index)
    assert json_response(conn, 200) == []
  end

  test "shows chosen resource", %{conn: conn} do
    cave = Repo.insert! %Cave{name: "foo"}
    conn = get conn, api_cave_path(conn, :show, cave)
    assert json_response(conn, 200) == %{"cave" => %{"id" => cave.id,
      "name" => "foo", "surveys" => []}}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, api_cave_path(conn, :show, -1)
    end
  end
end
