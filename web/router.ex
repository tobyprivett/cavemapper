defmodule Cavemapper.Router do
  use Cavemapper.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Cavemapper do
    pipe_through :browser # Use the default browser stack

    resources "/caves", Browser.CaveController do
      resources "/surveys", Browser.SurveyController
    end
    get "/", PageController, :index
  end

  scope "/api/v1", Cavemapper, as: :api do
    resources "/caves", Api.CaveController, except: [:new, :edit]
    resources "/svg", Api.SvgController, only: [:show]
  end
end
