
function Test1(props){
    return <div onClick={()=>{
        console.log(props.history);
        props.history.push({
            pathname:'/asset/readable/new'
        })
    }}>qwqw</div>
}

export default Test1;