import { TouchableOpacity } from "react-native";

export default function Icon({icon,width,height,color,action,style}){
    return (
        <>
             <TouchableOpacity onPress={action}>
            {icon(width, height, color)}
        </TouchableOpacity>
        </>
    )
}