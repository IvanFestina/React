import React from 'react';
import './App.css';
import Accordion from "./Components/Accordion/Accordion";
import {Rating} from "./Components/Rating/Rating";

function App() {
    console.log("App rendering")
    return (
        <div>
            <PageTitle title={"This is APP component"}/>
            <PageTitle title={"My friends"}/>
            <Accordion titleValue={"Menu"} collapsed={true}/>
            <Accordion titleValue={"Users"} collapsed={false}/>
            <Rating value={1}/>
            <Rating value={5}/>
        </div>
    );
}

type PageTitlePropsType = { title: string}

function PageTitle(props: PageTitlePropsType) {
    console.log("PageTitle rendering")
    return <h1>{props.title}</h1>
}

export default App;

