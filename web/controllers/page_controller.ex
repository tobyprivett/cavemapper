defmodule Cavemapper.PageController do
  use Cavemapper.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
