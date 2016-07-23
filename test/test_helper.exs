ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Cavemapper.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Cavemapper.Repo --quiet MIX_ENV=test)
Ecto.Adapters.SQL.Sandbox.mode(Cavemapper.Repo, :manual)
