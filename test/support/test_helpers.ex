defmodule Cavemapper.TestHelpers do
  alias Cavemapper.Repo

  def insert_cave(attrs) do
    Repo.insert!(attrs)
  end
end
