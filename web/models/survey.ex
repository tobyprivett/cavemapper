defmodule Cavemapper.Survey do
  use Cavemapper.Web, :model

  schema "surveys" do
    field :name, :string
    field :survey_date, Ecto.Date
    field :comment, :string
    field :team, :string
    field :tie_in, :string
    field :prefix, :string
    field :svg_polyline_points, :string
    belongs_to :cave, Cavemapper.Cave
    has_many :shots, Cavemapper.Shot, on_delete: :delete_all

    timestamps
  end

  @required_fields ~w(name cave_id)
  @optional_fields ~w(survey_date comment team tie_in prefix svg_polyline_points)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :invalid) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> cast_assoc(:shots)
    |> foreign_key_constraint(:surveys_cave_id_index)
  end

  def station_names(model) do
    Enum.map(model.shots, &(&1.station_to))
    |> List.insert_at(0, List.first(model.shots).station_from)
  end
end
