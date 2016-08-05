defmodule Cavemapper.Browser.CaveController do
  use Cavemapper.Web, :controller

  alias Cavemapper.Cave
  alias Cavemapper.Survey
  alias Cavemapper.Station
  alias Cavemapper.Shot

  plug :scrub_params, "cave" when action in [:create, :update]

  def index(conn, _params) do
    caves = Repo.all(Cave)
    render(conn, "index.html", caves: caves)
  end

  def new(conn, _params) do
    changeset = Cave.changeset(%Cave{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"cave" => cave_params}) do
    changeset =
      cond do
        cave_params["dat_file"] != nil ->
          Cavemapper.DatFile.Parser.parse(cave_params["dat_file"].path)
        true ->
          Cave.changeset(%Cave{}, cave_params)
      end

    case MapBuilder.create(changeset) do
      {:ok, cave} ->
        conn
        |> put_flash(:info, "Cave created successfully.")
        |> redirect(to: "/")
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    cave = Repo.get!(Cave, id)
    surveys =
      Repo.all(from s in Survey, where: s.cave_id == ^cave.id, order_by: s.id)
      |> Repo.preload(shots: from(s in Shot, order_by: s.id))

    stations =
      Repo.all(from s in Station, where: s.cave_id == ^cave.id, order_by: s.name)
      |> Enum.map(&{String.to_atom(&1.name),  &1})

    render(conn, "show.html", cave: cave, surveys: surveys, stations: stations)
  end

  def edit(conn, %{"id" => id}) do
    cave =
      Repo.get!(Cave, id)
      |> Repo.preload(:surveys)
    changeset = Cave.changeset(cave)
    render(conn, "edit.html", cave: cave, changeset: changeset)
  end

  def update(conn, %{"id" => id, "cave" => cave_params}) do
    cave =
      Repo.get!(Cave, id)
      |> Repo.preload(:surveys)
    changeset = Cave.changeset(cave, cave_params)

    case MapBuilder.update(changeset) do
      {:ok, cave} ->
        conn
        |> put_flash(:info, "Cave updated successfully.")
        |> redirect(to: cave_path(conn, :show, cave))
      {:error, changeset} ->
        render(conn, "edit.html", cave: cave, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    cave = Repo.get!(Cave, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(cave)

    conn
    |> put_flash(:info, "Cave deleted successfully.")
    |> redirect(to: cave_path(conn, :index))
  end
end
