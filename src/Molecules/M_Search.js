import React, { Component } from "react";
import { A_ListContainer, A_Text, A_View, A_Input } from "../Atoms";
import { stringMatches } from "../utils";

class M_Search extends Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.data === this.props.data) return;
    this.setState({ data: nextProps.data });
  };

  renderItem = ({ item, index }) => {
    if (this.props.renderItem) return this.props.renderItem(item, index);
    return <A_Text>{item}</A_Text>;
  };

  onChangeText = async value => {
    let data = [];
    if (!value) return this.setState({ data: this.props.data });
    if (this.props.onSearch) {
      data = await this.props.onSearch(value);
    } else {
      data = this.state.data.filter(val => stringMatches(value, val));
    }
    this.setState({ data });
  };

  render() {
    return (
      <A_View>
        <A_Input
          placeholder={this.props.search_text || "Search"}
          onChangeText={this.onChangeText}
        />
        <A_ListContainer
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, idx) =>
            `search-list-${this.props.label}-item-${idx}`
          }
          extraData={this.props.extraData}
          containerStyle={this.props.containerStyle}
          listContainerStyle={this.props.listContainerStyle}
          contentContainerStyle={this.props.listContentContainerStyle}
        />
      </A_View>
    );
  }
}

export { M_Search };
