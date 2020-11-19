import React from "react";
import { Link, withRouter, useLocation } from "react-router-dom";
import Button from "./components/Button";
import Input from "./components/Input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Nav({
  isLoggedIn,
  openRedirectDialogModalWindow,
  setSearchValue,
  history,
}) {
  const pushHistory = (searchValue) => {
    history.push({
      pathname: "/search",
      search: `?q=${searchValue}`,
    });
  };
  const queryParams = useQuery();
  const searchQuery = queryParams.get("q");
  return (
    <nav className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
      <div className="md:flex items-center justify-start space-x-8 md:flex-1 lg:w-0">
        <ul className="flex">
          <li className="mr-6">
            <a href="/">Explore</a>
          </li>
          <li className="mr-6">
            <a className="hover:opacity-100 opacity-50" href="/featured">
              Featured
            </a>
          </li>
        </ul>
      </div>
      <div className="md:flex space-x-2 justify-between items-center">
        <Link to="/" className="flex space-x-2 justify-between items-center">
          <picture>
            <source
              srcSet="/icons/light-icon.svg"
              media="(prefers-color-scheme: dark)"
            />
            <source
              srcSet="/icons/dark-icon.svg"
              media="(prefers-color-scheme: light)"
            />
            <img src="/icons/light-icon.svg" alt="Tide" className="h-10" />
          </picture>
          <h1 className="text-lg">Tide</h1>
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
        <Input
          name="sound-search"
          placeholder="Search sound..."
          defaultValue={searchQuery}
          onChange={(e) =>
            pushHistory(e.target.value) && setSearchValue(e.target.value)
          }
        />
        {!isLoggedIn && (
          <Button onClick={openRedirectDialogModalWindow}>Login</Button>
        )}
      </div>
    </nav>
  );
}
export default withRouter(Nav);
