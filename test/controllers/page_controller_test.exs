defmodule Cavemapper.PageControllerTest do
  use Cavemapper.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Cave mapping software"
  end
end
