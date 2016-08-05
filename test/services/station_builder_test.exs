defmodule Cavemapper.StationBuilderTest do
  use ExUnit.Case
  use Cavemapper.ModelCase

  alias Cavemapper.StationBuilder
  alias Cavemapper.Repo

  doctest Cavemapper

  def cave do
    Cavemapper.Repo.insert!(
      Cavemapper.DatFile.Parser.parse("test/support/Linea\ Dorada.dat")
     )
  end

  def last_station do
    survey = Repo.get_by(Cavemapper.Survey, name: "Principal")
    Repo.get_by(Cavemapper.Station, %{name: "LIPRI14", survey_id: survey.id})
  end

  test "it build stations with the correct depth" do
    StationBuilder.run(cave)
    assert last_station.depth == -12.0
  end

  test "it build stations with the correct name" do
    StationBuilder.run(cave)
    assert last_station.name == "LIPRI14"
  end

  test "it build stations with the correct entrance distance" do
    StationBuilder.run(cave)
    assert last_station.entrance_distance == 210.0
  end

  test "it build stations with the correct point" do
    StationBuilder.run(cave)
    assert last_station.point == %Geo.Point{coordinates: {-80.29097495656191, -158.11384208405187}}
  end

  test "it is successful when the StationBuilder runs twice" do
    this_cave = cave
    StationBuilder.run(this_cave)
    assert last_station.depth == -12.0
    StationBuilder.run(this_cave)
    assert last_station.depth == -12.0
  end
end
