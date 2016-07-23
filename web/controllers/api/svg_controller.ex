defmodule Cavemapper.Api.SvgController do
  use Cavemapper.Web, :controller

  alias Cavemapper.Cave
  alias Cavemapper.Station
  alias Cavemapper.Survey

  def show(conn, %{"id" => id}) do
    cave = Repo.get!(Cave, id)

    surveys = Repo.all(
                from survey in Survey,
                join: shot in assoc(survey, :shots),
                preload: [shots: shot],
                where: survey.cave_id == ^cave.id)

    stations = Repo.all(from s in Station,
                        where: s.cave_id == ^cave.id,
                        order_by: s.name)

    render(conn, "show.json", cave: cave, surveys: surveys, stations: stations)
  end
end
