defmodule Cavemapper.Api.CaveController do
  use Cavemapper.Web, :controller

  alias Cavemapper.Cave
  alias Cavemapper.Survey
  alias Cavemapper.Shot
  alias Cavemapper.Station

  plug :scrub_params, "cave" when action in [:create, :update]

  def index(conn, _params) do
    caves = Repo.all(Cave)
    render(conn, "index.json", caves: caves)
  end

  def show(conn, %{"id" => id}) do
    cave =
      Repo.get!(Cave, id)
    surveys =
      Repo.all(from s in Survey, where: s.cave_id == ^cave.id, order_by: s.id)
      |> Repo.preload(shots: from(s in Shot, order_by: s.id))

    stations =
      Repo.all(from s in Station, where: s.cave_id == ^cave.id, order_by: s.name)
      |> Enum.map(&{String.to_atom(&1.name),  &1})

    render(conn, "show.json", cave: cave, surveys: surveys, stations: stations)
  end
end
