import React, { Component } from "react";

import classnames from "classnames";
import { Loading } from "./Loading";
import { Panel } from "./Panel";

const data = [
  {
    id: 1,
    label: "Total Photos",
    value: 10,
  },
  {
    id: 2,
    label: "Total Topics",
    value: 4,
  },
  {
    id: 3,
    label: "User with the most uploads",
    value: "Allison Saeng",
  },
  {
    id: 4,
    label: "User with the least uploads",
    value: "Lukas Souza",
  },
];
class Dashboard extends Component {
  state = {
    loading: false,
    focused: null,
  };
  selecPanel(id) {
    this.setState((prev) => ({
      focused: prev.focused !== null ? null : id,
    }));
  }
  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused,
    });
    if (this.state.loading) {
      return <Loading />;
    }
    const panels = (
      this.state.focused
        ? data.filter((item) => this.state.focused === item.id)
        : data
    ).map((item) => (
      <Panel
        key={item.id}
        id={item.id}
        label={item.label}
        value={item.value}
        onSelect={(event) => this.selecPanel(item.id)}
      />
    ));
    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
