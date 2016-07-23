defmodule Cavemapper.Cave do
  use Cavemapper.Web, :model

  schema "caves" do
    field :name, :string
    field :station_start
    field :svg_canvas_x, :float
    field :svg_canvas_y, :float
    has_many :surveys, Cavemapper.Survey, on_delete: :delete_all

    timestamps
  end

  @required_fields ~w(name)
  @optional_fields ~w(svg_canvas_x svg_canvas_y)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :invalid) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> cast_assoc(:surveys)
    |> unique_constraint(:name)
  end
end

