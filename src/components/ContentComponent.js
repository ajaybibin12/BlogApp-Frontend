export const ContentComponent = ({contentString})=>{

    return(

        <div dangerouslySetInnerHTML={{__html: contentString}} ></div>

    )

}