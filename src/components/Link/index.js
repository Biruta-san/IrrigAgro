import React from "react";
import {Link as NextLink} from "@chakra-ui/next-js";

const Link = (props) =>{
    return(
        <NextLink href={props.href}>{props.children}</NextLink>
    );
}

export default Link;