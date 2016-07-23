defmodule Cavemapper.DatFile.Cave do
  defstruct name: "", surveys: []

  def station_start(cave) do
    survey = List.first(cave.surveys)
    List.first(survey.shots).from_station
  end

  def name(cave_struct) do
    # check if the name exists
    existing_cave = Cavemapper.Repo.get_by(Cavemapper.Cave, name: cave_struct.name)

    ret =
    if existing_cave do
      "#{ existing_cave.name }-#{ Chronos.today |> Tuple.to_list |> Enum.join("-") }-#{ :os.system_time(:seconds) }"
    else
      cave_struct.name
    end
    ret
  end
end
