import React, {FC, ReactNode} from 'react';

export const Layout: FC<PropsType> = ({children}) => {
    return (
        <div>
            <div>{children}</div>
        </div>
    );
};

type PropsType = {
    children: ReactNode
}