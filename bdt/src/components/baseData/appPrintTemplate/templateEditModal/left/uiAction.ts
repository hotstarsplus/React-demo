import { ILeftPart, LeftPart } from ".";

export class LeftUiAction {
    
    public props:ILeftPart;

    public self:LeftPart;

    public constructor(props:ILeftPart,self:LeftPart){
        this.props = props;
        this.self = self;
        
    }

   

}