defmodule Cavemapper.DatFile.Parser do
  alias Cavemapper.DatFile.Cave
  alias Cavemapper.DatFile.Survey
  alias Cavemapper.DatFile.Shot

  @doc """
  Takes a filename and returns a Cavemapper.Cave, by calling
  Cavemapper.DatFile.Reader.read(filename) and converts that
  output to a Cavemapper.Cave

  ## Example:
      iex> filename = "test/support/Linea\ Dorada.dat"
      iex> Cavemapper.DatFile.Parser.read(filename)
      "{name: "Linea Dorada", surveys: []}..."
  """

  def parse(filename) do
    {:ok, cave_struct} = Cavemapper.DatFile.Reader.read(filename)

    %Cavemapper.Cave{
      name: Cave.name(cave_struct),
      station_start: Cave.station_start(cave_struct),
      surveys: Enum.map(cave_struct.surveys, &parse_survey(&1))
     }
  end

  defp parse_survey(survey_struct) do
    %Cavemapper.Survey{
      name: survey_struct.name,
      survey_date: Ecto.Date.cast!(survey_struct.survey_date),
      team: survey_struct.team,
      comment: survey_struct.comment,
      tie_in: Survey.tie_in(survey_struct),
      prefix: Survey.prefix(survey_struct),
      shots: Enum.map(survey_struct.shots, &parse_shot(&1))
    }
  end

  defp parse_shot(shot_struct) do
    %Cavemapper.Shot{
      station_from: Shot.from_station(shot_struct),
      inclination: Shot.inclination(shot_struct),
      depth_change: Shot.depth_change(shot_struct),
      distance: Shot.distance(shot_struct),
      azimuth: Shot.azimuth(shot_struct),
      flags: Shot.flags(shot_struct),
      station_to: Shot.to_station(shot_struct)
    }
  end
end
