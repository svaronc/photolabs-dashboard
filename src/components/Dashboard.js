import React, { Component } from "react";
import Axios from "axios";
import classnames from "classnames";
import { Loading } from "./Loading";
import { Panel } from "./Panel";
import {
  getTotalPhotos,
  getTotalTopics,
  getUserWithMostUploads,
  getUserWithLeastUploads,
} from "helpers/selectors";

const data = [
  {
    id: 1,
    label: "Total Photos",
    getValue: getTotalPhotos
  },
  {
    id: 2,
    label: "Total Topics",
    getValue: getTotalTopics
  },
  {
    id: 3,
    label: "User with the most uploads",
    getValue: getUserWithMostUploads
  },
  {
    id: 4,
    label: "User with the least uploads",
    getValue: getUserWithLeastUploads
  },
];
class Dashboard extends Component {
  state = {
    loading: true,
    focused: null,
    photos: [],
    topics: [],
  };
  componentDidMount() {
    const urlPromise = ["/api/photos", "/api/topics"].map((url) =>
      Axios.get(url).then((response) => response.data)
    );
    Promise.all(urlPromise).then(([photos, topics]) => {
      this.setState({
        loading: false,
        photos: photos,
        topics: topics,
      });
    });
    const focused = JSON.parse(localStorage.getItem("focused"));

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }
  selecPanel(id) {
    this.setState((prev) => ({
      focused: prev.focused !== null ? null : id,
    }));
  }
  render() {
    console.log(this.state);
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
        value={item.getValue(this.state)}
        onSelect={(event) => this.selecPanel(item.id)}
      />
    ));
    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
