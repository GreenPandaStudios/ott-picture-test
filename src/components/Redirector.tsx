import { useAppSelector } from "../store";
import { selectPage } from "../reducers/redirectorReducer";
import { useLocation, Navigate  } from "react-router";
import React, { ReactNode, FC } from 'react'

type Props = { children: ReactNode }

//Used to redirect to new pages from global state
export const Redirector : FC<Props> = (props) => {
    
  const curPage = useLocation().pathname;   // Current URL in browser
  const page = useAppSelector(selectPage);     // Current URL in Redux store
  //console.log(page, curPage);
  // If the URLs match, we render the protected elements (JSX passed as a prop to this component)
  // If the URLs do not match, we render a redirect message to the valid url
  return page !== curPage ? <Navigate to={page} /> : <>{props.children}</>;
}
