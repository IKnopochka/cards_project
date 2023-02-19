import React, {FC, ReactNode} from 'react';

export const Layout: FC<PropsType> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

type PropsType = {
    children: ReactNode
}