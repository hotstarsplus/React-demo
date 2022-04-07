import React from "react";



interface ITitleTemplateProps {
    title: React.ReactNode;
}

class TitleTemplate extends React.PureComponent<ITitleTemplateProps>{

    public constructor(props: any) {
        super(props);
    }

    public render() {
        
        return <React.Fragment>
            <div style={{ margin: "8px", marginLeft: "0px" }}>
                <div>
                    { this.props.title }
                </div>
                <div style={{ margin: "8px 0px", paddingLeft: "8%" }}>
                    { this.props.children }
                </div>
            </div>
        </React.Fragment>

    }
}

export { TitleTemplate };
