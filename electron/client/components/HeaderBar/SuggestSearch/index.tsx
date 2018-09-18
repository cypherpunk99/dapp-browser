import * as React from "react";
import { Suggests } from "./suggests";
import {SearchItem} from "../../../redux/model";

// Assets
const searchIcon = require("../../../assets/icons/search.svg");
const closeIcon = require("../../../assets/icons/close.svg");


export interface SuggestSearchProps {
  searchItems: { [index: string]: SearchItem[] }
  isOpen: boolean
  togglePanel(openStatus?: boolean): void
  isStatusBarOpen: boolean
  toggleStatusBar(openStatus: boolean): void
  isPeersBarOpen: boolean
  togglePeersBar(openStatus: boolean): void
}

export interface SuggestSearchState {
  isOpen: boolean
}

export class SuggestSearch extends React.Component<SuggestSearchProps, SuggestSearchState> {
  constructor(props: SuggestSearchProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  public state: SuggestSearchState = {
    isOpen: false,
  };

  private toggle() {
    const { isOpen } = this.state;

    // Hide or show title in headerbar by searchbar status
    const title = document.querySelector(".headerbar .title") as HTMLElement;
    if (title) {
      const willOpen = !isOpen;
      if (willOpen) {
        title.style.setProperty("--headerbar-title-display", "none")
      } else {
        title.style.setProperty("--headerbar-title-display", "block")
      }
    }

    // Toggle And clear
    this.setState({
      isOpen: !isOpen,
    })
  }

  public render() {
    const { isOpen } = this.state;
    const { searchItems, togglePanel, toggleStatusBar, isStatusBarOpen, isPeersBarOpen, togglePeersBar} = this.props;
    const actionIcon = isOpen ? closeIcon : searchIcon;
    const visibleClass = isOpen ? "showed" : "hidden";

    return (
      <div className="search">
        <div className={`search-content ${visibleClass}`}>
          <div className="title">
            URI:
          </div>
          <Suggests
            searchItems={searchItems}
            togglePanel={togglePanel}
            isStatusBarOpen={isStatusBarOpen}
            toggleStatusBar={toggleStatusBar}
            isPeersBarOpen={isPeersBarOpen}
            togglePeersBar={togglePeersBar}
          />
        </div>
        <div className="action" onClick={this.toggle}>
          <img className={visibleClass} src={actionIcon} />
        </div>
      </div>
    )
  }
}
