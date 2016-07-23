defmodule Cavemapper.StationBuilder do
  import Ecto.Query
  alias Cavemapper.Repo
  alias Cavemapper.Cave
  alias Cavemapper.Shot
  alias Cavemapper.Station
  alias Cavemapper.PointBuilder


  def run(cave) do
    reset_cave_stations(cave)
    Repo.get(Cave, cave.id)
      |> Repo.preload(:surveys)
      |> process_surveys(cave.surveys)
  end

  defp reset_cave_stations(cave) do
    Repo.delete_all(from(s in Station, where: s.cave_id == ^cave.id))
  end

  defp process_surveys(cave, [head|tail]) do
    tie_in = load_tie_in(cave, head)
    if is_nil(tie_in) do
      # move this survey to the end of the list and get the next one
      [_head | tail] = tail ++ [head]
      process_surveys(cave, tail)
    else
      shots = Repo.all(from s in Shot, where: s.survey_id == ^head.id, order_by: s.id)
      build_stations(shots, head, tie_in)
      process_surveys(cave, tail)
    end
  end
  defp process_surveys(cave, _), do: cave

  defp load_tie_in(cave, survey) do
    if to_string(survey.tie_in) == "" do
      Repo.insert!(
        %Station{name: cave.station_start, survey_id: survey.id, cave_id: cave.id,
                  point: PointBuilder.point_zero})
    else
      Repo.get_by(Station, name: survey.tie_in, cave_id: cave.id)
    end
  end

  defp build_stations([], _survey, _last_station) do
    []
  end
  defp build_stations([head|tail], survey, last_station) do
    station = Repo.insert!(
      %Station{
      name: head.station_to,
      depth: last_station.depth + head.depth_change,
      entrance_distance: last_station.entrance_distance + head.distance,
      point: PointBuilder.destination(last_station.point, head.distance, head.azimuth),
      survey_id: survey.id,
      cave_id: survey.cave_id
      })

    build_stations(tail, survey, station)
  end
end
