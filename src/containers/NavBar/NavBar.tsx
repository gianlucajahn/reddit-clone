import React, { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './NavBar.scss';
import { ReactComponent as RedditLogo } from "../../resources/images/redditlogo.svg";
import { ReactComponent as Reddit } from "../../resources/images/reddit.svg";
import { ReactComponent as Search } from "../../resources/images/search.svg";
import { ReactComponent as Expand } from "../../resources/images/expand.svg";
import { ReactComponent as Star } from "../../resources/images/star.svg";
import { ReactComponent as User } from "../../resources/images/user.svg";
import { ObjectType } from 'typescript';
import { Subreddit, Subreddits } from '../../types/types';

export interface NavBarProps {
  dropdownIsOpen: boolean,
  userName: string,
  loginStatus: boolean,
  subDropdownIsOpen: boolean,
  randomIntToString: string,
  navToSubmit: MouseEventHandler,
  subreddits: Subreddits,
  submitPage: boolean,
  currentSub: Subreddit | undefined,
  joinedCommunities: any,
  notificationNum: number,
  searchDropdown: boolean,
  searchTerm: string,
  setSearchTerm: any,
  searchItemDisplay: boolean[],
  handleNotifications: MouseEventHandler,
  changeSearchItemDisplay: MouseEventHandler<HTMLImageElement>,
  handleInputChange: FormEventHandler,
  removeCurrentSub: MouseEventHandler,
  handleFavorite: MouseEventHandler<HTMLImageElement>,
  handleLogin: MouseEventHandler,
  handleDropdown: MouseEventHandler<HTMLDivElement>,
  handleExpand: MouseEventHandler<HTMLDivElement>,
  handleSelectSort: MouseEventHandler,
  handleExpandSub: MouseEventHandler<HTMLDivElement>,
  handleNavigate: MouseEventHandler<HTMLDivElement>,
  quickNavigate: MouseEventHandler,
  handleLoginModal: MouseEventHandler<HTMLElement>,
  dropdownState: {
    erkunden: boolean,
    gaming: boolean,
    sports: boolean,
    television: boolean,
    celebrity: boolean,
    business: boolean,
    crypto: boolean,
    weitereinfos: boolean,
    richtlinien: boolean,
    mehr: boolean
  }
}

export default function NavBar (props: NavBarProps) {
  const {
    dropdownIsOpen,
    handleNotifications,
    handleDropdown,
    navToSubmit,
    quickNavigate,
    handleSelectSort,
    handleExpand,
    handleLoginModal,
    handleLogin,
    removeCurrentSub,
    handleFavorite,
    handleNavigate,
    handleExpandSub,
    handleInputChange,
    notificationNum,
    searchTerm,
    searchItemDisplay,
    changeSearchItemDisplay,
    dropdownState,
    subreddits,
    setSearchTerm,
    submitPage,
    currentSub,
    userName,
    loginStatus,
    searchDropdown,
    joinedCommunities,
    subDropdownIsOpen,
    randomIntToString
  } = props;

  const location = useLocation();
  const [paddingLeft, setPaddingLeft] = useState("");
  const handleHoverLink = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (e.type === "mouseenter") {
      target.setAttribute('style', 'border: 1px solid #EDEFF1;');
    } else if (!dropdownIsOpen) {
      target.setAttribute('style', 'border: 1px solid transparent');
    }
  }

  const handleHoverSubMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (e.type === "mouseenter" && target.id === "subredditContainer") {
      target.setAttribute('style', 'border: 1px solid #EDEFF1;');
    } else if (!subDropdownIsOpen && target.id === "subredditContainer") {
      target.setAttribute('style', 'border: 1px solid transparent');
    }
  }

  let currentRender = 0;

  return (
    <div className="navBar" style={{ padding: loginStatus ? "0px 12px 0px 20px" : "0px 20px" }}>
        <div className="logo">
          <div className="logoContainer returnHome" onClick={handleNavigate}>
            <RedditLogo className="redditLogo" />
            <Reddit className="reddit" />
          </div>



          <div className="subredditContainer" id="subredditContainer" style={{ display: loginStatus ? "flex" : "none", border: subDropdownIsOpen ? "1px solid #EDEFF1" : "1px solid transparent" }} onClick={handleExpandSub} onMouseEnter={handleHoverSubMenu} onMouseLeave={handleHoverSubMenu}>
            <div>
              <img className="currentSubreddit return" src={submitPage ? require("../../resources/images/add.PNG") :  currentSub !== undefined ?  require(`../../resources/images/Communities/${currentSub.title}/icon.png`) : require("../../resources/images/home.png")} style={{ height: currentSub !== undefined ? "21px" : "18px" }}/>
              <h4 className="return subText">{submitPage ? "Create Post" : currentSub !== undefined ? "r/" + currentSub.title : "Home"}</h4>
            </div>
            <img src={require("../../resources/images/expand.png")} className="expand return" />
            <div className="subredditDropdown" id="subredditDropdown" style={{ display: subDropdownIsOpen ? "block" : "none", borderTop: "1px solid transparent" }}>
              {joinedCommunities.find((community: any) => community.favorite === true) ? 
              <>
                <h6>YOUR FAVORITES</h6>
                <div className="favorites communityList">
                  {joinedCommunities.map((community: any, index: number) => {
                    if (community.favorite === true) {
                      return <div className="subItem sub" id={community.title} onClick={handleNavigate}>
                        <img className="subIcon sub noPointerEvents" src={require(`../../resources/images/Communities/${community.title}/icon.png`)} />
                        <h3 className="sub noPointerEvents">r/{community.title}</h3>
                        <img className="favorite join" src={require("../../resources/images/favorited.PNG")} onClick={handleFavorite} id={community.title} /> 
                      </div>
                    }
                  })}
                </div>
              </> : null}
              <h6 className="communityList">YOUR COMMUNITIES</h6>
              <div className="communityList">
                <div className="createCommunity subItem sub">
                  <img className="create subIcon sub" src={require("../../resources/images/add.PNG")} />
                  <h3 className="sub">Create Community</h3>
                </div>
                {joinedCommunities.map((community: any, index: number) => {
                  return <div className="subItem sub" id={community.title} onClick={handleNavigate}>
                             <img className="subIcon sub noPointerEvents" src={require(`../../resources/images/Communities/${community.title}/icon.png`)} />
                            <h3 className="sub noPointerEvents">r/{community.title}</h3>
                            <img className="favorite join" src={require(`../../resources/images/${community.favorite ? "" : "un"}favorited.PNG`)} id={community.title} onClick={handleFavorite} /> 
                          </div>;
                })}
                <h6 className="communityList feeds">FEEDS</h6>
                <div className="subItem sub" id="best" onClick={handleSelectSort}>
                  <img className="subIcon sub noPointerEvents" src={require(`../../resources/images/home.png`)} />
                  <h3 className="sub noPointerEvents">Home</h3>
                </div>
                <div className="subItem sub" id="hot" onClick={handleSelectSort}>
                  <img className="subIcon sub noPointerEvents" src={require(`../../resources/images/popular.PNG`)} />
                  <h3 className="sub noPointerEvents">Popular</h3>
                </div>
                <div className="subItem sub" id="top" onClick={handleSelectSort}>
                  <img className="subIcon sub noPointerEvents" src={require(`../../resources/images/all.PNG`)} />
                  <h3 className="sub noPointerEvents">All</h3>
                </div>
                <div className="subItem sub" id="new" onClick={handleSelectSort}>
                  <img className="subIcon sub noPointerEvents" src={require(`../../resources/images/live.PNG`)} />
                  <h3 className="sub noPointerEvents">Reddit Live</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="search">
          <input type="text" placeholder="Search Reddit" onChange={handleInputChange} value={searchTerm} className={loginStatus ? "searchBarLogin" : "searchBar"} style={{ paddingLeft: currentSub === undefined ? "46px" : 
                                                                                                                                        currentSub.title === "movies"           ? "174px" : 
                                                                                                                                        currentSub.title === "leagueoflegends"  ? "230px" : 
                                                                                                                                        currentSub.title === "genshinimpact"    ? "218px" : 
                                                                                                                                        currentSub.title === "nba"              ? "154px" :
                                                                                                                                        currentSub.title === "finance"          ? "176px" :
                                                                                                                                        currentSub.title === "programmerhumor"  ? "246px" :
                                                                                                                                        currentSub.title === "learnprogramming" ? "244px" :
                                                                                                                                        currentSub.title === "todayilearned"    ? "213px" :
                                                                                                                                        currentSub.title === "wallstreetbets"   ? "215px" :
                                                                                                                                        currentSub.title === "nasa"             ? "160px" :
                                                                                                                                        currentSub.title === "books"            ? "168px" :
                                                                                                                                        currentSub.title === "apexlegends"      ? "206px" :
                                                                                                                                        currentSub.title === "announcements"    ? "228px" :
                                                                                                                                        currentSub.title === "baking"           ? "172px" :
                                                                                                                                        currentSub.title === "astronomy"        ? "196px" : 
                                                                                                                                        "170px" }}>
          </input>
          {currentSub !== undefined && 
          <div className="subredditIndicator">
              <img className="subLogo" src={require(`../../resources/images/Communities/${currentSub?.title}/icon.png`)} onClick={quickNavigate} />
              <h5 className="subName" onClick={quickNavigate}>r/{currentSub?.title}</h5>
              <img className="subClose" src={require("../../resources/images/close.PNG")} onClick={removeCurrentSub} />
          </div>}

          <div className="searchDropdown searchdd" style={{ display: searchDropdown ? "flex" : "none" }} id="searchDropdown">
            <div className="resultList searchdd">
              {subreddits.map((sub, i) => {
                if (searchTerm === "") {
                  return;
                }

                if (sub.title.indexOf(searchTerm.toLowerCase()) !== -1) {
                  currentRender++;
                  if (currentRender > 5) {
                    return;
                  }

                  return (
                    <div className="searchResult searchdd" style={{ display: searchItemDisplay[i - 1] === true ? "flex" : "none" }} id={sub.title} onClick={handleNavigate}>
                      <div className="left searchdd">
                        <img className="subLogo searchdd" src={require(`../../resources/images/Communities/${sub.title}/icon.png`)} />
                        <h3 className="subTitle searchdd">r/{sub.title}</h3>
                      </div>
                      <img className="close searchdd" src={require("../../resources/images/close.PNG")} onClick={changeSearchItemDisplay} id={`${i}`} />
                    </div>
                  );
                }
                return;
              })}
            </div>
            <div className="searchTerm searchdd">
              <div className="left searchdd">
                <Search className="subLogo searchdd" />
                <h3 className="subTitle searchdd">Search for "{searchTerm}"</h3>
              </div>
              <img className="close" src={require("../../resources/images/close.PNG")} onClick={() => setSearchTerm("")} />
            </div>
          </div>
        </div>

        <div className="user">
            {loginStatus ? null : <button className="auth login" onClick={handleLoginModal} id="login">
              Login
            </button>}
            {loginStatus ? null : <button className="auth register" onClick={handleLoginModal} id="register">
              Sign Up Now
            </button>}
            {loginStatus ? 
            
            <div className="userButtons">
                <button className="userButton" aria-label='Popular'>
                  <img className="userIcon popular" src={require("../../resources/images/popular.PNG")} />
                </button>
                <button className="userButton" aria-label='All'>
                  <img className="userIcon all" src={require("../../resources/images/all.PNG")} />
                </button>
                <button className="userButton" aria-label='Live'>
                  <img className="userIcon live" src={require("../../resources/images/live.PNG")} />
                </button>

                <div className="vertical-line"></div>

                <button className="userButton" aria-label='Chat'>
                  <img className="userIcon chat" src={require("../../resources/images/chat.PNG")} />
                </button>
                <button className="userButton noti" aria-label='Notifications' onClick={handleNotifications}>
                  <img className="userIcon notifications noti" src={require("../../resources/images/bell.PNG")} />
                  <div className="notification noti" style={{ display: notificationNum >= 1 ? "flex" : "none" }}>
                    {notificationNum}
                  </div>
                </button>
                <button className="userButton lastBtn" aria-label='Create' onClick={navToSubmit}>
                  <img className="userIcon create" src={require("../../resources/images/add.PNG")} />
                </button>
                <button className="auth shopAvatar" type="button">
                  <Star className="star1" />
                  <Star className="star2" />
                  <Star className="star3" />
                  Shop Avatars
                </button>
            </div> : null}
  
            <div className="userInfo" onClick={handleDropdown}>
              <div className={loginStatus ? "link loggedInLink" : "link"} id="link" style={{ border: dropdownIsOpen ? "1px solid #EDEFF1" : "1px solid transparent" }} onMouseEnter={handleHoverLink} onMouseLeave={handleHoverLink}>
                  {loginStatus ? null : <img src={require("../../resources/images/user.png")} className="userImg" />}
                  {loginStatus ? <div className="avatarContainer">
                    <img className="avatar" src={require(`../../resources/images/avatar${userName === "Nikola Tesla" ? "tesla.PNG" : randomIntToString + ".PNG"}`)} />
                    <div className="navbarUserInfo">
                      <h4>{userName}</h4>
                      <div className="karmaContainer">
                        <img className="karma" src={require("../../resources/images/karma.PNG")} />
                        <p>1 karma</p>
                      </div>
                    </div>
                  </div> : null}
                  <img src={require("../../resources/images/expand.png")} className="expand" />
              </div>
              <div className={loginStatus ? "dropdownMenu dropdownMenuLogin" : "dropdownMenu"} style={{ display: dropdownIsOpen ? "block" : "none", right: loginStatus ? "12px" : "20px" }} id="dropdownMenu">
                {loginStatus ? <div className="dropdownItem dropdownProfile">
                  <img className="avatarBig" src={require(`../../resources/images/avatar${userName === "Nikola Tesla" ? "tesla.PNG" : randomIntToString + ".PNG"}`)} />
                  <div className="profile">
                    <h3 className="username">{userName}</h3>
                    <button className="toProfile auth shopAvatar">
                      <img className="toProfileImg" src={require("../../resources/images/profile.png")} />
                      Profile
                    </button>
                  </div>
                </div> : null}

                <div className="dropdownItem coins">
                  <img className="icon coin" src={require("../../resources/images/coin.png")} />
                  <h3>Coins</h3>
                </div>

                <div className="dropdownItem premium">
                  <img className="icon premium" src={require("../../resources/images/premium.png")} />
                  <h3>Premium</h3>
                </div>

                <div className="dropdownItem talk">
                  <img className="icon talk" src={require("../../resources/images/talk.png")} />
                  <h3>TALK</h3>
                </div>

                <div className="dropdownItem recent">
                  <img className="icon recent" src={require("../../resources/images/recent.png")} />
                  <h3>Recently visited</h3>
                </div>

                <div className="dropdownItem erkunden" id="erkunden" onClick={handleExpand}>
                  <img className="icon erkunden" src={require("../../resources/images/erkunden.png")} />
                  <h3>Discover</h3>
                  <img className={ dropdownState.erkunden ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="gaming" onClick={handleExpand}>
                  <h3>Gaming</h3>
                  <img className={ dropdownState.gaming ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested apexlegends" style={{ display: dropdownState.gaming ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Apex Legends</h3>
                </div>

                <div className="dropdownItem nested genshinimpact" style={{ display: dropdownState.gaming ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Genshin Impact</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Minecraft</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Pokimane</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Halo Infinite</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Call of Duty: Warzone</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Path of Exile</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Hollow Knight</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Escape from Tarkov</h3>
                </div>

                <div className="dropdownItem nested lastChild" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Watch Dogs: Legion</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="sports" onClick={handleExpand}>
                  <h3>Sports</h3>
                  <img className={ dropdownState.sports ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested sports" style={{ display: dropdownState.sports ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>NFL</h3>
                </div>

                <div className="dropdownItem nested nba" style={{ display: dropdownState.sports ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>NBA</h3>
                </div>

                <div className="dropdownItem nested sports" style={{ display: dropdownState.sports ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Atlanta Hawks</h3>
                </div>

                <div className="dropdownItem nested sports" style={{ display: dropdownState.sports ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Los Angeles Lakers</h3>
                </div>

                <div className="dropdownItem nested sports" style={{ display: dropdownState.sports ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Boston Celtics</h3>
                </div>

                <div className="dropdownItem nested sports" style={{ display: dropdownState.sports ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Arsenal F.C.</h3>
                </div>

                <div className="dropdownItem nested sports" style={{ display: dropdownState.sports ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Philadelphia 76ers</h3>
                </div>

                <div className="dropdownItem nested sports" style={{ display: dropdownState.sports ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Premier League</h3>
                </div>

                <div className="dropdownItem nested lastChild sports" style={{ display: dropdownState.sports ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>UFC</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="television" onClick={handleExpand}>
                  <h3>Television</h3>
                  <img className={ dropdownState.television ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested movies" style={{ display: dropdownState.television ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Game of Thrones</h3>
                </div>

                <div className="dropdownItem nested movies" style={{ display: dropdownState.television ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Breaking Bad</h3>
                </div>

                <div className="dropdownItem nested movies" style={{ display: dropdownState.television ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Rick &#38; Morty</h3>
                </div>

                <div className="dropdownItem nested movies" style={{ display: dropdownState.television ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>The Walking Dead</h3>
                </div>

                <div className="dropdownItem nested movies" style={{ display: dropdownState.television ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>House of Cards</h3>
                </div>

                <div className="dropdownItem nested movies" style={{ display: dropdownState.television ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Prison Break</h3>
                </div>

                <div className="dropdownItem nested movies" style={{ display: dropdownState.television ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Sherlock</h3>
                </div>

                <div className="dropdownItem nested movies" style={{ display: dropdownState.television ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Suits</h3>
                </div>

                <div className="dropdownItem nested lastChild movies" style={{ display: dropdownState.television ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Dark</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="celebrity" onClick={handleExpand}>
                  <h3>Celebrity</h3>
                  <img className={ dropdownState.celebrity ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested celebrity" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Tom Hiddleston</h3>
                </div>

                <div className="dropdownItem nested celebrity" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Benedict Cumberbatch</h3>
                </div>

                <div className="dropdownItem nested celebrity" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Mark Ruffalo</h3>
                </div>

                <div className="dropdownItem nested celebrity" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Robert Downey Jr.</h3>
                </div>

                <div className="dropdownItem nested celebrity" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Tom Holland</h3>
                </div>

                <div className="dropdownItem nested celebrity" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Zendaya</h3>
                </div>

                <div className="dropdownItem nested celebrity" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Chris Hemsworth</h3>
                </div>

                <div className="dropdownItem nested celebrity" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Scarlett Johansson</h3>
                </div>

                <div className="dropdownItem nested lastChild celebrity" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Samuel L. Jackson</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="business" onClick={handleExpand}>
                  <h3>Business</h3>
                  <img className={ dropdownState.business ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested finance" style={{ display: dropdownState.business ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Berkshire Hathaway</h3>
                </div>

                <div className="dropdownItem nested finance" style={{ display: dropdownState.business ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Tesla</h3>
                </div>

                <div className="dropdownItem nested finance" style={{ display: dropdownState.business ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>SpaceX</h3>
                </div>

                <div className="dropdownItem nested finance" style={{ display: dropdownState.business ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Best Buy</h3>
                </div>

                <div className="dropdownItem nested finance" style={{ display: dropdownState.business ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Walgreens</h3>
                </div>

                <div className="dropdownItem nested finance" style={{ display: dropdownState.business ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Nvidia</h3>
                </div>

                <div className="dropdownItem nested finance" style={{ display: dropdownState.business ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Alphabet</h3>
                </div>

                <div className="dropdownItem nested finance" style={{ display: dropdownState.business ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Apple</h3>
                </div>

                <div className="dropdownItem nested lastChild finance" style={{ display: dropdownState.business ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>GameStop</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="crypto" onClick={handleExpand}>
                  <h3>Crypto</h3>
                  <img className={ dropdownState.crypto ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested crypto" style={{ display: dropdownState.crypto ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Cardano</h3>
                </div>

                <div className="dropdownItem nested crypto" style={{ display: dropdownState.crypto ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Dogecoin</h3>
                </div>

                <div className="dropdownItem nested crypto" style={{ display: dropdownState.crypto ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Algorand</h3>
                </div>

                <div className="dropdownItem nested crypto" style={{ display: dropdownState.crypto ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Bitcoin</h3>
                </div>

                <div className="dropdownItem nested crypto" style={{ display: dropdownState.crypto ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Ethereum</h3>
                </div>

                <div className="dropdownItem nested crypto" style={{ display: dropdownState.crypto ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Litecoin</h3>
                </div>

                <div className="dropdownItem nested crypto" style={{ display: dropdownState.crypto ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Bitcoin Cash</h3>
                </div>

                <div className="dropdownItem nested crypto" style={{ display: dropdownState.crypto ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>Ripple</h3>
                </div>

                <div className="dropdownItem nested lastChild crypto" style={{ display: dropdownState.crypto ? "flex" : "none" }} onClick={handleNavigate}>
                  <h3>XRP</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="mehr" onClick={handleExpand}>
                  <h3>More</h3>
                  <img className={ dropdownState.mehr ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.mehr ? "flex" : "none" }}>
                  <h3>Animals and Pets</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.mehr ? "flex" : "none" }}>
                  <h3>Anime</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.mehr ? "flex" : "none" }}>
                  <h3>Philosophy</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.mehr ? "flex" : "none" }}>
                  <h3>Fashion</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.mehr ? "flex" : "none" }}>
                  <h3>Hobbies</h3>
                </div>

                <div className="dropdownItem nested lastChild" style={{ display: dropdownState.mehr ? "flex" : "none" }}>
                  <h3>Music</h3>
                </div>

                <div className="line" style={{ display: dropdownState.erkunden ? "block" : "none" }}></div>

                <div className="dropdownItem einstellungen">
                  <img className="icon einstellungen" src={require("../../resources/images/einstellungen.png")} />
                  <h3>Settings</h3>
                </div>

                <div className="dropdownItem">
                  <img className="icon" src={require("../../resources/images/werbung.png")} />
                  <h3>Advertise on Reddit</h3>
                </div>

                <div className="dropdownItem hilfecenter">
                  <img className="icon hilfecenter" src={require("../../resources/images/hilfecenter.png")} />
                  <h3>Help Center</h3>
                </div>

                <div className="dropdownItem weitereinfos" id="weitereinfos" onClick={handleExpand}>
                  <img className="icon weitereinfos" src={require("../../resources/images/weitereinfos.png")} />
                  <h3>More Infos</h3>
                  <img className={ dropdownState.weitereinfos ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Reddit iOS</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Reddit Android</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Rereddit</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Our Best Communities</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Communities</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>About Reddit</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Blog</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Careers</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Press</h3>
                </div>

                <div className="line" style={{ display: dropdownState.weitereinfos ? "block" : "none" }}></div>

                <div className="dropdownItem richtlinien" id="richtlinien" onClick={handleExpand}>
                  <img className="icon richtlinien" src={require("../../resources/images/richtlinien.png")} />
                  <h3>Terms &#38; Conditions</h3>
                  <img className={ dropdownState.richtlinien ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.richtlinien ? "flex" : "none" }}>
                  <h3>User Agreement</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.richtlinien ? "flex" : "none" }}>
                  <h3>Privacy Policy</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.richtlinien ? "flex" : "none" }}>
                  <h3>Content Policy</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.richtlinien ? "flex" : "none" }}>
                  <h3>Moderation Guidelines</h3>
                </div>

                <div className="line" style={{ display: dropdownState.richtlinien ? "block" : "none" }}></div>

                <div className="dropdownItem registrieren" onClick={loginStatus ? handleLogin : handleLoginModal} id={loginStatus ? "logout" : "register"}>
                  <img className="icon registrieren noPointerEvents" src={require(`../../resources/images/${loginStatus ? "logout.png" : "registrieren.png"}`)} />
                  <h3 className="noPointerEvents">{loginStatus ? "Log Out" : "Sign Up & Login"}</h3>
                </div>

                <div className="dropdownItem" id="credits">
                  <h6>© 2022 Reddit, Inc. All rights reserved.</h6>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}
