defmodule Cavemapper.Factory do
  # with Ecto
  use ExMachina.Ecto, repo: Cavemapper.Repo

  def factory(:cave) do
    %Cavemapper.Cave{
      name: "Kan Ha",
      id: 1
    }
  end
end
