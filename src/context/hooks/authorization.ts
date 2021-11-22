import { AuthorizationContext } from "context/AuthorizationProvider";
import { useContext } from "react";

const useAuthorization = () => useContext(AuthorizationContext)

export { useAuthorization }
