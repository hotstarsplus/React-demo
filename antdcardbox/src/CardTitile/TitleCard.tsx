import React,{Component} from "react";
import '../Card/card.css';

class TitleCard extends Component<any,any>{
    render(){
        const {titleCard} = this.props;
        return(
            <div className="titleCardStyle">
                {titleCard}
            </div>
        );
    }
}
export default TitleCard;