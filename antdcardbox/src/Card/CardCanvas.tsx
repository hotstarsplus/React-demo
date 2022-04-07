import React,{Component} from "react";
import TitleCard from "../CardTitile/TitleCard";
import './card.css';
import CardAntd from "./CardAntd";

    // let chandao = "http://192.168.4.62/zentao/user-login-L3plbnRhby8=.html";
    let zte = "http://192.168.4.61:9999/zte/";
    let Commontitle = "http://192.168.4.61:9999/cloudFrameWork/common/";
    let BDT ="http://192.168.4.61:9999/bdt/";
    let csstitle = "http://192.168.4.61:9999/CCS/";
    
    const cardinita = {
            navtitle: '示例',
            cardantd:[
                        {
                        hrefa: zte,
                        cardtitle: 'zte 类库',
                        cardexpl: 'ZenTao Extend 禅道扩展'
                        },
                     ]
                    }
        

        
    const cardinitb = {
                navtitle: '通用类库',
                cardantd:[
                            {
                            hrefa: Commontitle,
                            cardtitle: 'Common 类库',
                            cardexpl: '.Net Standard 2.0通用底层类库"'
                                },
    
                            {
                                hrefa: Commontitle,
                                cardtitle: 'Common 类库',
                                cardexpl: '.Net Standard 2.0通用底层类库"'
                                },
    
                            {
                                hrefa: Commontitle,
                                cardtitle: 'Common 类库',
                                cardexpl: ".Net Standard 2.0通用底层类库,.Net Standard 2.0通用底层类库'"
                                },
    
                            {
                                hrefa: Commontitle,
                                cardtitle: 'Common 类库',
                                cardexpl: '.Net Standard 2.0通用底层类库"'
                                },  
                                {
                                    hrefa: Commontitle,
                                    cardtitle: 'Common 类库',
                                    cardexpl: '.Net Standard 2.0通用底层类库"'
                                    },
        
                                {
                                    hrefa: Commontitle,
                                    cardtitle: 'Common 类库',
                                    cardexpl: '.Net Standard 2.0通用底层类库"'
                                    },
        
                                {
                                    hrefa: Commontitle,
                                    cardtitle: 'Common 类库',
                                    cardexpl: '.Net Standard 2.0通用底层类库"'
                                    },  
        
    
                         ]
                      }
       
        
    const  cardinitc = {
            navtitle: 'WorkCloud 文档',
            cardantd:[
                        {
                        hrefa: BDT,
                        cardtitle: 'BDT 类库',
                        cardexpl: '对于BDT 类库的说明'
                            },

                        {
                            hrefa: csstitle,
                            cardtitle: 'css 类库',
                            cardexpl: 'CCS 是工作平台的收费应用'
                            },
                     ]
                  }

        
    const carditem = [cardinita,cardinitb,cardinitc];

class CardCanvas extends Component<any,any>{
    render(){
        
        return(
            <div className="canvas ">
                <div className="navStyle"><h1>开发Api文档导航</h1></div>
                {carditem.map((item:any,index:number)=>(
                    <div className="clearfix">
                        <TitleCard titleCard={item.navtitle}></TitleCard>

                        <div className="cfloat cflex">
                            {item.cardantd.map((abc:any)=>
                                <CardAntd hrefa={abc.hrefa} cardTitle={abc.cardtitle} cardExplain={abc.cardexpl} ></CardAntd>
                            )}
                        </div>
                    </div>
                    
                ))}

            </div>
            
        );
    }
}
export default CardCanvas;