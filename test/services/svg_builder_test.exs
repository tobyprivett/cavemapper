defmodule Cavemapper.SvgBuilderTest do
  use ExUnit.Case
  use Cavemapper.ModelCase

  alias Cavemapper.Cave
  alias Cavemapper.Repo
  alias Cavemapper.Station
  alias Cavemapper.StationBuilder
  alias Cavemapper.SvgBuilder
  doctest Cavemapper

  # ensure there is a cave with some stations
  def cave do
    case Repo.get_by(Cave, %{name: "Linea Dorada"}) do
      {cave} ->
        cave
      _ ->
        Repo.insert!(Cavemapper.DatFile.Parser.parse("test/support/Linea\ Dorada.dat"))
        |> StationBuilder.run
    end
  end

  test "setting the canvas#svg_canvas" do
    cave = SvgBuilder.run(cave)
    assert cave.svg_canvas_x == 142.34522816713937
    assert cave.svg_canvas_y == 275.0026826501509
  end

  test "setting the station#svg_point" do
    cave = SvgBuilder.run(cave)
    station = Repo.get_by(Station, %{name: "LIPRI14"})
    assert station.svg_point ==  "116.88884056609905,245.58805884632432"
  end

  test "setting the survey#svg_polyline_points" do
    cave = SvgBuilder.run(cave) |> Repo.preload(:surveys)
    assert List.first(cave.surveys).svg_polyline_points ==  svg_polyline_points
  end

  test "setting the shot#svg_station_from and svg_station_to" do
    cave = SvgBuilder.run(cave) |> Repo.preload(:surveys)
    survey = List.first(cave.surveys) |> Repo.preload(:shots)
    shot = List.first(survey.shots)
    assert shot.svg_station_from ==  "83.97633719281976,268.4948963609381"
    assert shot.svg_station_to ==  "115.92588629954065,256.86621148786537"
  end

  def svg_polyline_points do
    "0.0,240.90018450287027 21.449244407331378,258.8982375740934 20.403375494359494,270.85257395119436 33.403375494359494,270.85257395119436 63.725951117107456,264.4073115358438 69.35960987053815,275.0026826501509 83.97633719281976,268.4948963609381 115.92588629954065,256.86621148786537"
  end
end
