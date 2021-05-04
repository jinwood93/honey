import{REG_EMAIL} from "../types/actiontypes"

export const registeremail=(inputemail)=>{
    return {
        type:REG_EMAIL,
       inputemail
       
    }
}