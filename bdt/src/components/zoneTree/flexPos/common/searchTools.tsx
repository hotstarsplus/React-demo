import * as React from 'react';

export class SearchTools extends React.Component<any> {

    public render() {

        return (
            <div className={"SearchTools"}>
                {this.props.children}
            </div>
        )
    }
}