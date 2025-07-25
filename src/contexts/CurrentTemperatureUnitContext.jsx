import React from "react";

export const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

export const CurrentUserContext = React.createContext({});

export const SelectedCardContext = React.createContext({});
