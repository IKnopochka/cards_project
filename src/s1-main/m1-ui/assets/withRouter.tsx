import React, {ComponentType} from "react";
import {Params, useParams} from "react-router-dom";



export function withRouter<T>(Component: ComponentType<T & { params: Params }>) {

    function ComponentWithRouterProp(props: T) {
        return (
            <Component
                {...props}
                params={useParams()}
            />
        );
    }

    return ComponentWithRouterProp;
}


// http://localhost:3000/cards_project#/new-password#access_token=ya29.5HxuYol1Io8JLeGePDznbfkkwu_PC4uodKwG8_1clFYAn9AgdOV1WGpOTNQP3s76HAsn7Y4zWw&token_type=Bearer&expires_in=3600'
