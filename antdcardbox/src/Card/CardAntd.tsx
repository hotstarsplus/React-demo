import { Card } from "antd";
import React,{Component} from "react";
import './card.css';


class CardAntd extends Component<any,any>{
    constructor(props:any){
        super(props);

        this.onClickhref = this.onClickhref.bind(this);
    }

    onClickhref(){

    }

    render(){
        // 因为都是从外界传来的值，组件内部不需要给予变化，用prop来做就好
        const {hrefa} = this.props;
        const {cardTitle} = this.props;
        const {cardExplain} = this.props;
        return(
            <div className="cafloat caflex">
                    <a href={hrefa} target='_blank' rel="noreferrer">
                    <Card>
                    <Card.Grid className="gridStyle">
                    <div title={cardTitle} className="cardTitleStyle">
                    {cardTitle}
                    </div>
                    <div title={cardExplain} className="cardEStyle">
                    {cardExplain}
                    </div>
                    </Card.Grid>
                    </Card>
                    </a>              
            </div>
        );
    }
}

// CardAntd.defaultPros = {

// };

export default CardAntd;