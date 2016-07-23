defmodule Cavemapper.Shot do
  use Cavemapper.Web, :model

  schema "shots" do
    field :station_from, :string
    field :depth_change, :float
    field :inclination, :float
    field :azimuth, :float
    field :distance, :float
    field :flags, :string
    field :station_to, :string
    field :svg_station_from, :string
    field :svg_station_to, :string
    belongs_to :survey, Cavemapper.Survey
    timestamps
  end

  @required_fields ~w(station_from station_to depth_change azimuth distance survey_id)
  @optional_fields ~w(svg_station_from svg_station_to)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :invalid) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> foreign_key_constraint(:survey_id)
    |> foreign_key_constraint(:shots_survey_id_fkey)
  end
end
